import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";

/**
 * As garantias: quatro placas brancas penduradas na borda do hero azul,
 * cada uma um link para onde a promessa se cumpre. O ícone senta num
 * círculo azul-claro que acende de amarelo no hover. Só o que a loja
 * cumpre de fato, lido do site atual dela: retirada na loja, parcelamento
 * em 3x, frete grátis em vários produtos, pedido pelo WhatsApp.
 */
const ITENS: { icone: NomeIcone; titulo: string; texto: string; href: string; externa?: boolean }[] = [
  { icone: "conversa", titulo: "Pedido pelo WhatsApp", texto: "sem cadastro, sem carrinho", href: "", externa: true },
  { icone: "loja", titulo: "Retire na loja", texto: "Jardim Morada do Sol, Indaiatuba", href: "/#loja" },
  { icone: "cartao", titulo: "Parcele em até 3x", texto: "sem juros, toda a loja", href: "/catalogo" },
  { icone: "caminhao", titulo: "Frete grátis", texto: "em vários produtos, combinado no pedido", href: "/#loja" },
];

export function Garantias({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-label="Como a loja funciona" className="miolo relative z-10 lg:-mt-8">
      <ul className="garantias sangra faixa-scroll lg:mx-0">
        {ITENS.map((i) => {
          const href = i.href || linkWhats;
          const conteudo = (
            <>
              <span className="garantia-icone">
                <Icone nome={i.icone} className="h-7 w-7" peso={1.4} />
              </span>
              <span className="min-w-0">
                <span className="garantia-titulo">{i.titulo}</span>
                <span className="block text-[0.8125rem] leading-snug text-tinta-fraca">{i.texto}</span>
              </span>
            </>
          );
          return (
            <li key={i.titulo}>
              {i.externa ? (
                <a href={href} target="_blank" rel="noreferrer" className="garantia">
                  {conteudo}
                </a>
              ) : (
                <Link href={href} className="garantia">
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
