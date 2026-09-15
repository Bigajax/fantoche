/**
 * COLHER FOTOS — fotos genéricas para a prévia da Fantoche
 *
 * A loja tem três produtos no site e nenhuma foto do resto. Para a
 * prévia, cada item de `data/fonte.json` traz um termo de busca em
 * inglês (`busca`) e este script pega uma foto com licença de uso
 * comercial na Openverse (Flickr e Wikimedia), ou baixa a `url` direta
 * quando o item tem foto de verdade. Escolhe a maior foto com proporção
 * de produto e guarda o crédito (autor, licença, fonte) em
 * `data/creditos.json`: as licenças CC BY pedem atribuição, e a vitrine
 * mostra isso no rodapé enquanto for prévia.
 *
 * Sem chave: a Openverse anônima aceita ~100 buscas por dia, e são 46.
 * Fotos que já existem em `_fonte/fantoche` não são baixadas de novo;
 * para trocar uma, apague o arquivo e rode de novo (ou --refazer slug).
 *
 *   node scripts/colher-fotos.mjs [--so slug] [--refazer slug]
 */
import fs from "node:fs";
import path from "node:path";

const fonte = JSON.parse(fs.readFileSync("data/fonte.json", "utf8"));
const pasta = fonte.origem;
fs.mkdirSync(pasta, { recursive: true });
const CREDITOS = "data/creditos.json";
const creditos = fs.existsSync(CREDITOS) ? JSON.parse(fs.readFileSync(CREDITOS, "utf8")) : {};
const args = process.argv.slice(2);
const so = args.includes("--so") ? args[args.indexOf("--so") + 1] : null;
const refazer = args.includes("--refazer") ? args[args.indexOf("--refazer") + 1] : null;

const UA = "fantoche-previa/1.0 (vitrine de amostra; Rafael Razeira Estudio)";
const slugDe = (t) =>
  t
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 70);

async function baixar(url, destino) {
  const r = await fetch(url, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
}

/* as melhores fotos da busca, em ordem: grande, quase quadrada ou deitada, de fonte boa */
function ordenar(resultados) {
  const nota = (r) => {
    const prop = r.width / r.height;
    let n = Math.min(r.width, 2000);
    if (prop < 0.6 || prop > 1.9) n *= 0.4;
    if (r.license === "cc0" || r.license === "pdm") n *= 1.15;
    if (r.license.includes("nd")) n *= 0.7;
    if (/wikimedia/.test(r.source)) n *= 1.05;
    if (r.width < 700) n *= 0.3;
    return n;
  };
  return [...resultados].filter((r) => r.width && r.height).sort((a, b) => nota(b) - nota(a));
}

/* baixa a primeira candidata que responder; o Wikimedia devolve 429 quando
   se baixa em sequência, então há uma pausa e uma segunda tentativa */
async function baixarPrimeira(candidatas, destino) {
  for (const c of candidatas.slice(0, 4)) {
    for (let tentativa = 0; tentativa < 2; tentativa++) {
      try {
        await baixar(c.url, destino);
        return c;
      } catch (e) {
        if (!/^429/.test(e.message)) break;
        await new Promise((r) => setTimeout(r, 4000));
      }
    }
  }
  return null;
}

async function buscar(termo) {
  const u = new URL("https://api.openverse.org/v1/images/");
  u.searchParams.set("q", termo);
  u.searchParams.set("license_type", "commercial");
  u.searchParams.set("page_size", "20");
  u.searchParams.set("mature", "false");
  const r = await fetch(u, { headers: { "user-agent": UA, accept: "application/json" } });
  if (r.status === 429) throw new Error("Openverse: limite de buscas do dia (anônimo). Tente amanhã ou com chave.");
  if (!r.ok) throw new Error(`Openverse ${r.status} para "${termo}"`);
  return (await r.json()).results ?? [];
}

/* o Wikimedia Commons direto: sem chave e sem limite diário; só JPEG, para
   não vir clipart com fundo transparente; a miniatura de 1600 px basta */
async function buscarCommons(termo) {
  const u = new URL("https://commons.wikimedia.org/w/api.php");
  u.searchParams.set("action", "query");
  u.searchParams.set("generator", "search");
  u.searchParams.set("gsrsearch", `${termo} filemime:image/jpeg`);
  u.searchParams.set("gsrnamespace", "6");
  u.searchParams.set("gsrlimit", "20");
  u.searchParams.set("prop", "imageinfo");
  u.searchParams.set("iiprop", "url|size|extmetadata|mime");
  u.searchParams.set("iiurlwidth", "1600");
  u.searchParams.set("format", "json");
  const r = await fetch(u, { headers: { "user-agent": UA } });
  if (!r.ok) throw new Error(`Commons ${r.status} para "${termo}"`);
  const paginas = Object.values((await r.json()).query?.pages ?? {});
  return paginas
    .map((p) => {
      const i = p.imageinfo?.[0];
      if (!i || i.mime !== "image/jpeg") return null;
      const m = i.extmetadata ?? {};
      const licenca = (m.LicenseShortName?.value ?? "").toLowerCase();
      if (/nc|nd/.test(licenca) && !/cc0|public domain/.test(licenca)) return null;
      return {
        url: i.thumburl ?? i.url,
        width: i.thumbwidth ?? i.width,
        height: i.thumbheight ?? i.height,
        title: p.title.replace(/^File:/, ""),
        creator: (m.Artist?.value ?? "").replace(/<[^>]+>/g, "").trim() || null,
        license: licenca.replace(/^cc /, "").replace(/ /g, "-"),
        license_version: "",
        foreign_landing_url: i.descriptionurl,
        source: "wikimedia",
      };
    })
    .filter(Boolean);
}

const refazerLista = refazer ? refazer.split(",") : [];
let feitas = 0;
for (const item of fonte.itens) {
  const slug = slugDe(item.nome);
  if (so && slug !== so) continue;
  const destino = path.join(pasta, `${slug}.jpg`);
  if (fs.existsSync(destino) && !refazerLista.includes(slug)) continue;

  try {
    if (item.url) {
      await baixar(item.url, destino);
      creditos[slug] = { titulo: item.nome, autor: "Coroa Celenterado", licenca: "foto da loja", fonte: item.url };
      console.log(`✓ ${slug} (foto da loja)`);
    } else {
      const resultados = item.fonte === "commons" ? await buscarCommons(item.busca ?? item.nome) : await buscar(item.busca ?? item.nome);
      const escolhida = await baixarPrimeira(ordenar(resultados), destino);
      if (!escolhida) {
        console.log(`✗ ${slug}: nada para "${item.busca}"`);
        continue;
      }
      creditos[slug] = {
        titulo: escolhida.title,
        autor: escolhida.creator ?? "autor não informado",
        licenca: `${escolhida.license.toUpperCase()} ${escolhida.license_version ?? ""}`.trim(),
        fonte: escolhida.foreign_landing_url ?? escolhida.url,
        origem: escolhida.source,
      };
      console.log(`✓ ${slug} ← ${escolhida.source} ${escolhida.width}x${escolhida.height} ${escolhida.license}`);
    }
    feitas++;
    fs.writeFileSync(CREDITOS, `${JSON.stringify(creditos, null, 2)}\n`);
    await new Promise((r) => setTimeout(r, 400));
  } catch (e) {
    console.log(`✗ ${slug}: ${e.message}`);
    if (/limite/.test(e.message)) break;
  }
}
console.log(`${feitas} fotos novas em ${pasta}; créditos em ${CREDITOS}`);
