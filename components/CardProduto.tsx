import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icones";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import { linkPeca } from "@/lib/whatsapp";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão de produto: foto quadrada (as fotos vêm de fontes diferentes,
 * e o quadrado iguala todas), a boia amarela do preço no canto quando há
 * preço, a categoria em etiqueta, o nome em duas linhas reservadas, a
 * linha dos tamanhos e o botão "Pedir no WhatsApp" preso no pé, com a
 * mensagem já montada. Sem preço, o card diz "consulte": é a loja que
 * passa o valor na conversa.
 */
export function CardProduto({
  produto,
  categoria,
  prioridade = false,
  tamanhos = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw",
}: {
  produto: Produto;
  categoria?: Categoria | null;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigenteNumero = produto.preco_promocional ?? produto.preco;
  const vigente = precoBRL(vigenteNumero);
  const href = `/produto/${produto.slug}`;
  const pedir = linkPeca(produto, { preco: vigenteNumero ?? null });

  return (
    <article className="cartao group flex h-full flex-col">
      <Link href={href} className="foto block aspect-square rounded-b-none" aria-label={produto.nome}>
        {vigente ? (
          <span className="placa-etiqueta absolute left-3 top-3 z-[1] !flex items-baseline gap-2">
            <span className="preco text-[1rem]">{vigente}</span>
            {promo && cheio ? <span className="text-[0.75rem] font-normal normal-case tracking-normal line-through opacity-70">{cheio}</span> : null}
          </span>
        ) : null}
        {capa ? (
          <Image src={capa.url} alt={capa.alt ?? produto.nome} fill sizes={tamanhos} placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} priority={prioridade} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <p className="etiqueta min-h-[1em]">{categoria?.nome ?? ""}</p>
        <h3 className="titulo-cartao mt-1 line-clamp-2 min-h-[2.7em] text-tinta">
          <Link href={href} className="hover:text-agua">
            {produto.nome}
          </Link>
        </h3>
        <p className="mt-1 min-h-[1.25rem] truncate text-[0.8125rem] text-tinta-fraca">
          {produto.tamanhos.length ? (
            <>
              {produto.tamanhos.slice(0, 4).join(", ")}
              {produto.tamanhos.length > 4 ? <span className="font-semibold text-agua"> +{produto.tamanhos.length - 4}</span> : null}
            </>
          ) : vigente ? (
            "Em até 3x sem juros"
          ) : (
            "Consulte o valor no WhatsApp"
          )}
        </p>

        <div className="mt-auto pt-3">
          <a href={pedir} target="_blank" rel="noreferrer" className="btn btn--agua btn--pequeno w-full">
            <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
            Pedir no WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
