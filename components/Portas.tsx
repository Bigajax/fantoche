import Image from "next/image";
import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";
import type { Produto } from "@/lib/tipos";

export type Porta = {
  nome: string;
  href: string;
  icone: NomeIcone;
  peca?: Produto | null;
  total: number;
  linha: string;
};

/**
 * As cinco portas da loja, como azulejos: a foto da estrela da categoria
 * ocupa o azulejo, e por cima, no pé, uma faixa azul com o ícone, o nome
 * em condensada e quantos produtos tem. No hover a foto cresce e a faixa
 * vira amarela. No celular rolam de lado, dois por tela.
 */
export function Portas({ portas }: { portas: Porta[] }) {
  return (
    <section aria-labelledby="titulo-portas" className="miolo pt-12 lg:pt-16">
      <div className="regua">
        <div>
          <h2 id="titulo-portas" className="secao">
            Escolha a sua porta
          </h2>
          <span className="raia raia--curta mt-3" aria-hidden="true" />
        </div>
        <Link href="/catalogo" className="btn btn--texto shrink-0">
          Ver tudo
        </Link>
      </div>
      <ul className="faixa-scroll sangra mt-5 flex gap-3 overflow-x-auto pb-2 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:px-0">
        {portas.map((p) => {
          const capa = p.peca?.imagens[0];
          return (
            <li key={p.nome} className="w-[46vw] shrink-0 sm:w-[14rem] lg:w-auto">
              <Link href={p.href} className="azulejo group">
                <span className="foto block aspect-[4/5] rounded-none">
                  {capa ? (
                    <Image src={capa.url} alt="" fill sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 18vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  ) : null}
                </span>
                <span className="azulejo-faixa">
                  <Icone nome={p.icone} className="h-7 w-7 shrink-0" peso={1.5} />
                  <span className="min-w-0">
                    <span className="romana block text-[1.25rem] leading-none">{p.nome}</span>
                    <span className="block text-[0.75rem] opacity-80">
                      {p.total} {p.total === 1 ? "produto" : "produtos"}
                    </span>
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
