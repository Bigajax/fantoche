import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { montarMenu } from "@/lib/menu";
import { linkGeral } from "@/lib/whatsapp";
import { site } from "@/data/site.config";
import fs from "node:fs";

export default async function LayoutSite({ children }: { children: React.ReactNode }) {
  const [{ categorias, produtos }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);
  const whats = linkGeral(config.whatsapp);
  const ativas = categorias.filter((c) => c.ativo);
  const menu = montarMenu(produtos, whats);
  /* quantas fotos genéricas estão em uso: o rodapé credita enquanto for prévia */
  const creditos = fs.existsSync("data/creditos.json") ? Object.values(JSON.parse(fs.readFileSync("data/creditos.json", "utf8")) as { licenca: string }[]).filter((c) => c.licenca !== "foto da loja").length : 0;

  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-[var(--raio-mini)] focus:bg-ouro focus:px-4 focus:py-3 focus:text-veludo"
      >
        Ir para o conteúdo
      </a>
      <Cabecalho categorias={ativas} linkWhats={whats} aviso={config.aviso_topo} menu={menu} />
      <main id="conteudo" className="flex-1">
        {children}
      </main>
      <Rodape linkWhats={whats} instagram={config.instagram || site.instagram} categorias={ativas} horario={config.horario} creditos={creditos} />
    </div>
  );
}
