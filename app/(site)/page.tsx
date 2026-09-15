import { FaixaWhats } from "@/components/FaixaWhats";
import { Garantias } from "@/components/Garantias";
import { Hero } from "@/components/Hero";
import { Loja } from "@/components/Loja";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { Vitrines } from "@/components/Vitrines";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao, site } from "@/data/site.config";

/* a ordem e a cara das portas na home */
const PORTAS = [
  { slug: "natacao", nome: "Natação", icone: "natacao", linha: "Óculos, touca, maiô, prancha e nadadeira." },
  { slug: "esportes", nome: "Esportes", icone: "esportes", linha: "Bolas, raquetes, luvas e cones." },
  { slug: "lazer", nome: "Lazer", icone: "lazer", linha: "Piscina, boia, skate, patins e frescobol." },
  { slug: "roupas", nome: "Roupas", icone: "roupas", linha: "Camiseta dry-fit, boné, shorts e legging." },
  { slug: "acessorios", nome: "Acessórios", icone: "acessorios", linha: "Garrafa, toalha, mochila, tapete e relógio." },
] as const;

/**
 * A home: o hero azul com a estrela da vez, as garantias penduradas nele,
 * as cinco portas em azulejo, o que chegou agora, duas vitrines grandes
 * (natação e lazer, o coração da loja), as prateleiras por porta, a loja
 * física e a faixa do WhatsApp. Tudo montado do catálogo.
 */
export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const ativas = categorias.filter((c) => c.ativo);
  const porSlug = new Map(ativas.map((c) => [c.slug, c]));
  const da = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).sort((a, b) => a.ordem - b.ordem);

  const destaques = hero
    .map((h) => ativos.find((p) => p.slug === h.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 8);
  const estrelaDe = (slug: string) => destaques.find((p) => p.categoria_slug === slug) ?? da(slug)[0] ?? null;
  const peca = (slug: string) => ativos.find((p) => p.slug === slug) ?? null;

  /* as prateleiras mostram primeiro o que NÃO está no "Chegou agora", para a home não repetir foto */
  const inedito = (lista: typeof ativos) => [...lista.filter((p) => !destaques.includes(p)), ...lista.filter((p) => destaques.includes(p))];
  const prateleiras = PORTAS.map((p) => ({ ...p, produtos: inedito(da(p.slug)) }));

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} estrelas={destaques} linkWhats={whats} totais={{ produtos: ativos.length, categorias: ativas.length }} />

      <Garantias linkWhats={whats} />

      <Portas portas={PORTAS.map((p) => ({ nome: p.nome, href: `/catalogo/${p.slug}`, icone: p.icone, peca: estrelaDe(p.slug), total: da(p.slug).length, linha: p.linha }))} />

      <Prateleira id="destaques" titulo="Chegou agora" href="/catalogo" verTudo="Ver o catálogo" produtos={destaques} categorias={porSlug} prioridade total={ativos.length} nomeDaPorta="produtos" />

      <Vitrines
        vitrines={[
          { titulo: "Natação", texto: "Do óculos à nadadeira: o que a piscina pede, para adulto e criança.", href: "/catalogo/natacao", peca: peca("maio-de-natacao") ?? estrelaDe("natacao"), acao: "Ver natação" },
          { titulo: "Lazer", texto: "Piscina inflável, boia, skate, patins: o fim de semana inteiro.", href: "/catalogo/lazer", peca: peca("piscina-inflavel") ?? estrelaDe("lazer"), acao: "Ver lazer" },
        ].filter((v): v is typeof v & { peca: NonNullable<typeof v.peca> } => Boolean(v.peca))}
      />

      {prateleiras.map((p) => (
        <Prateleira key={p.slug} id={`prateleira-${p.slug}`} titulo={p.nome} subtitulo={p.linha} href={`/catalogo/${p.slug}`} verTudo={`Ver ${p.slug === "roupas" ? "as" : p.slug === "natacao" ? "a natação" : "os"} ${p.slug === "natacao" ? "" : p.produtos.length}`.trim()} produtos={p.produtos} categorias={porSlug} nomeDaPorta={p.nome.toLowerCase()} feminino={p.slug === "roupas"} />
      ))}

      <Loja linkWhats={whats} horario={config.horario} />

      <FaixaWhats linkWhats={whats} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportingGoodsStore",
            name: "Fantoche",
            telephone: "+55 19 99535-7103",
            url: site.url,
            address: { "@type": "PostalAddress", streetAddress: "Seraphin Gilberto Candello, 1025, CS 3", addressLocality: "Indaiatuba", addressRegion: "SP", postalCode: "13348-334", addressCountry: "BR" },
          }),
        }}
      />
    </>
  );
}
