import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icones";
import type { Produto } from "@/lib/tipos";

/**
 * A abertura, no azul da água: à esquerda a manchete em condensada
 * grande (a frase do painel), a raia atravessando embaixo dela, a linha
 * de apoio e os dois botões (amarelo para o catálogo, contorno para o
 * WhatsApp). À direita, a estrela da vez numa foto grande de cantos
 * redondos, com a boia amarela do preço no canto e o nome dela embaixo.
 * No celular a foto vem primeiro, quadrada, e o texto senta embaixo.
 */
export function Hero({ frase, estrelas, linkWhats, totais }: { frase: string; estrelas: Produto[]; linkWhats: string; totais: { produtos: number; categorias: number } }) {
  const principal = estrelas.find((p) => p.categoria_slug === "natacao") ?? estrelas[0];
  const capa = principal?.imagens[0];
  const preco = principal?.preco_promocional ?? principal?.preco ?? null;

  return (
    <section aria-labelledby="titulo-hero" className="agua relative overflow-hidden">
      {/* o azulejo: uma grade fininha de linhas claras, como o fundo da piscina */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:3rem_3rem]" />

      <div className="miolo relative grid gap-8 py-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:py-16">
        <div className="order-2 lg:order-1">
          <p className="etiqueta text-raia">Artigos esportivos em Indaiatuba</p>
          <h1 id="titulo-hero" className="manchete mt-3 max-w-[14ch] text-[clamp(2.75rem,9vw,4rem)] text-branco lg:text-[clamp(3.25rem,5.6vw,5.5rem)]">
            {frase}
          </h1>
          <span className="raia mt-5 block w-40" aria-hidden="true" />
          <p className="falada mt-5 max-w-[40ch] text-[1.0625rem] text-white/85 lg:text-[1.125rem]">
            {totais.produtos} produtos em {totais.categorias} portas: natação, esportes, lazer, roupas e acessórios. Escolhe aqui, pede no WhatsApp, retira na loja ou recebe em casa.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/catalogo" className="btn btn--raia">
              Ver o catálogo
            </Link>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--placa-fio">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Chamar no WhatsApp
            </a>
          </div>
        </div>

        {principal && capa ? (
          <Link href={`/produto/${principal.slug}`} className="group order-1 block lg:order-2">
            <span className="foto block aspect-square rounded-[var(--raio)] shadow-[0_30px_60px_-30px_rgba(3,30,54,0.7)] sm:aspect-[4/3] lg:aspect-square">
              <Image src={capa.url} alt={capa.alt ?? principal.nome} fill priority sizes="(max-width: 1024px) 100vw, 46vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
              {preco !== null ? (
                <span className="placa-etiqueta absolute left-4 top-4 z-[1] text-[1rem]">R$ {preco.toFixed(2).replace(".", ",")}</span>
              ) : (
                <span className="placa-etiqueta absolute left-4 top-4 z-[1]">Chegou agora</span>
              )}
            </span>
            <span className="mt-3 flex items-center justify-between gap-3 text-[0.9375rem] text-white/85">
              <span>
                Na foto: <span className="font-semibold text-branco group-hover:underline group-hover:decoration-raia group-hover:underline-offset-4">{principal.nome}</span>
              </span>
              <Icone nome="seta" className="h-5 w-5 shrink-0 text-raia" peso={2} />
            </span>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
