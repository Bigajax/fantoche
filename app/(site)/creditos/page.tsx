import type { Metadata } from "next";
import fs from "node:fs";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Créditos das fotos",
  robots: { index: false, follow: false },
};

type Credito = { titulo: string; autor: string; licenca: string; fonte: string; origem?: string };

/**
 * Enquanto a vitrine é prévia, as fotos genéricas vêm de bancos com
 * licença Creative Commons, e as licenças BY pedem atribuição: aqui
 * está, foto por foto, com autor, licença e a página de origem. Na loja
 * publicada, com as fotos dos produtos de verdade, esta página sai.
 */
export default function PaginaCreditos() {
  const creditos: Record<string, Credito> = fs.existsSync("data/creditos.json") ? JSON.parse(fs.readFileSync("data/creditos.json", "utf8")) : {};
  const lista = Object.entries(creditos).filter(([, c]) => c.licenca !== "foto da loja");

  return (
    <div className="miolo pb-20 pt-8 lg:pt-12">
      <p className="etiqueta">Prévia</p>
      <h1 className="secao mt-2">Créditos das fotos</h1>
      <span className="raia raia--curta mt-4" aria-hidden="true" />
      <p className="falada mt-4 max-w-[60ch] text-[1.0625rem] text-tinta-fraca">
        As fotos abaixo são ilustrativas, de bancos com licença Creative Commons, e aparecem nesta prévia até a loja mandar as fotos dos produtos de verdade.
      </p>
      <ul className="mt-8 divide-y divide-linha border-y border-linha">
        {lista.map(([slug, c]) => (
          <li key={slug} className="grid gap-1 py-3 text-[0.9375rem] sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_8rem] sm:items-baseline sm:gap-4">
            <Link href={`/produto/${slug}`} className="font-semibold text-tinta hover:text-agua">
              {slug.replace(/-/g, " ")}
            </Link>
            <span className="text-tinta-fraca">
              <a href={c.fonte} target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-agua">
                {c.titulo}
              </a>
              , por {c.autor}
            </span>
            <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.06em] text-tinta-fraca">{c.licenca}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
