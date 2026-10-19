import Link from "next/link";
import { Logo, MarcaEstudio } from "./Marca";
import { Icone } from "./Icones";
import { PREVIA, site } from "@/data/site.config";
import type { Categoria } from "@/lib/tipos";

/**
 * O rodapé marinho em colunas: a marca, o catálogo, o atendimento e a
 * loja. No celular cada coluna vira uma sanfona (details, sem JS). A
 * faixa de baixo leva o ©, a assinatura do estúdio e, enquanto for
 * prévia, o crédito das fotos (as genéricas vêm de bancos com licença
 * Creative Commons e pedem atribuição).
 */
function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <>
      <details className="rodape-sanfona border-t border-white/10 sm:hidden">
        <summary className="romana flex cursor-pointer list-none items-center justify-between py-4 text-[1.125rem] text-branco [&::-webkit-details-marker]:hidden">
          {titulo}
          <Icone nome="seta" className="rodape-seta h-4 w-4 text-marfim-fraco" />
        </summary>
        <div className="pb-5">{children}</div>
      </details>
      <div className="hidden sm:block">
        <h2 className="romana text-[1.125rem] text-branco">{titulo}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </>
  );
}

export function Rodape({
  linkWhats,
  instagram,
  categorias = [],
  horario,
  creditos = 0,
}: {
  linkWhats: string;
  instagram: string;
  categorias?: Categoria[];
  horario?: string;
  /* quantas fotos genéricas estão em uso, para o crédito da prévia */
  creditos?: number;
}) {
  return (
    <footer className="escuro mt-16 lg:mt-20">
      <span className="raia block" aria-hidden="true" />
      <div className="miolo grid gap-0 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8 lg:py-16">
        <div className="pb-8 sm:pb-0">
          <Link href="/" aria-label="Fantoche, página inicial" className="inline-flex text-[2rem] text-branco">
            <Logo />
          </Link>
          <p className="mt-4 max-w-[32ch] text-[0.9375rem] text-marfim-fraco">{site.posicionamento}. Loja física no Jardim Morada do Sol.</p>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--raia btn--pequeno mt-5">
            <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
            (19) 99535-7103
          </a>
        </div>

        <Bloco titulo="Catálogo">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li>
              <Link href="/catalogo" className="font-semibold text-branco hover:text-raia">
                Tudo
              </Link>
            </li>
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo/${c.slug}`} className="text-marfim-fraco hover:text-branco">
                  {c.nome}
                </Link>
              </li>
            ))}
          </ul>
        </Bloco>

        <Bloco titulo="Atendimento">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li>
              <a href={linkWhats} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-semibold text-branco hover:text-raia">
                <Icone nome="whats" className="h-4 w-4 text-raia" />
                Pedido pelo WhatsApp
              </a>
            </li>
            <li className="text-marfim-fraco">Retire na loja ou receba em casa; a loja combina no pedido.</li>
            <li className="text-marfim-fraco">Parcele em até 3x sem juros.</li>
            {horario ? <li className="text-marfim-fraco">{horario}</li> : null}
          </ul>
        </Bloco>

        <Bloco titulo="A loja">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li className="text-marfim-fraco">{site.endereco}</li>
            <li>
              <a href={site.maps} target="_blank" rel="noreferrer" className="text-branco hover:text-raia">
                Como chegar
              </a>
            </li>
            {instagram ? (
              <li>
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="text-branco hover:text-raia">
                  @{instagram}
                </a>
              </li>
            ) : null}
          </ul>
        </Bloco>
      </div>

      <div className="border-t border-white/10 bg-marinho-2">
        <div className="miolo flex flex-col items-center gap-4 py-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="max-w-[70ch] text-[0.8125rem] text-marfim-fraco">
            © {new Date().getFullYear()} Fantoche, Indaiatuba. {PREVIA ? "Prévia da vitrine, ainda não é a loja." : ""}
            {creditos > 0 ? (
              <>
                {" "}
                Nesta prévia, {creditos} fotos são ilustrativas, de bancos com licença Creative Commons;{" "}
                <Link href="/creditos" className="underline underline-offset-4 hover:text-branco">
                  créditos aqui
                </Link>
                . Na loja publicada entram as fotos dos produtos de verdade.
              </>
            ) : null}
          </p>
          <a href="https://rafaelrazeira.com.br/vitrine-digital" target="_blank" rel="noreferrer" aria-label="Vitrine feita por Rafael Razeira Estúdio" className="flex shrink-0 items-center gap-3 text-marfim-fraco transition-colors hover:text-branco">
            <span className="text-[0.75rem]">vitrine por</span>
            <MarcaEstudio altura={36} />
          </a>
        </div>
      </div>
    </footer>
  );
}
