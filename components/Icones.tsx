/**
 * Ícones de linha da loja, um traço só: os óculos de natação, a bola,
 * o sol sobre a água, a camiseta, a garrafa, a estrela das novidades,
 * a loja, o caminhão. Herdam a cor do texto; o tamanho vem da className.
 */
export type NomeIcone =
  | "novidade"
  | "natacao"
  | "esportes"
  | "lazer"
  | "roupas"
  | "acessorios"
  | "loja"
  | "lupa"
  | "whats"
  | "caminhao"
  | "conversa"
  | "etiqueta"
  | "cartao"
  | "pino"
  | "check"
  | "seta"
  | "seta-esq"
  | "fechar";

const TRACOS: Record<Exclude<NomeIcone, "whats">, React.ReactNode> = {
  novidade: <path d="M12 3.4l2.5 5.6 6.1.6-4.6 4.1 1.4 6L12 16.6l-5.4 3.1 1.4-6-4.6-4.1 6.1-.6z" />,
  /* os óculos de natação: duas lentes, a ponte, a tira */
  natacao: (
    <>
      <path d="M3.5 12.5a3.5 3 0 1 0 7 0 3.5 3 0 1 0-7 0z" />
      <path d="M13.5 12.5a3.5 3 0 1 0 7 0 3.5 3 0 1 0-7 0z" />
      <path d="M10.5 12.5h3" />
      <path d="M3.6 11.5C4.5 8.5 7 7.5 9.5 8.2M20.4 11.5c-.9-3-3.4-4-5.9-3.3" />
    </>
  ),
  /* a bola: círculo com os gomos */
  esportes: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 3.5c-2 2.6-3 5.4-3 8.5s1 5.9 3 8.5M12 3.5c2 2.6 3 5.4 3 8.5s-1 5.9-3 8.5M3.6 10.5c2.7-1 5.5-1.5 8.4-1.5s5.7.5 8.4 1.5M3.6 13.5c2.7 1 5.5 1.5 8.4 1.5s5.7-.5 8.4-1.5" />
    </>
  ),
  /* o sol sobre a água */
  lazer: (
    <>
      <path d="M6.5 14a5.5 5.5 0 1 1 11 0" />
      <path d="M12 3.5v2M4.2 7.2l1.4 1.4M19.8 7.2l-1.4 1.4M2.5 14h2M19.5 14h2" />
      <path d="M2.5 18c1.6 0 1.6 1.5 3.2 1.5s1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3.2-1.5 1.6 1.5 3.2 1.5 1.6-1.5 3.2-1.5" />
    </>
  ),
  roupas: (
    <>
      <path d="M8.6 3.8c.5 1.5 1.8 2.4 3.4 2.4s2.9-.9 3.4-2.4l5 2.2 1.1 4.3-3.3 1.1v9.1H5.8v-9.1L2.5 10.3l1.1-4.3z" />
      <path d="M9.6 3.8h4.8" />
    </>
  ),
  /* a garrafa esportiva */
  acessorios: (
    <>
      <path d="M9.5 3h5v2.5h-5z" />
      <path d="M9 5.5h6l1 3v10.5a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V8.5z" />
      <path d="M8 13h8" />
    </>
  ),
  loja: (
    <>
      <path d="M3.5 9.5 5 4.5h14l1.5 5" />
      <path d="M3.5 9.5a2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0" />
      <path d="M5 11.5v8h14v-8" />
      <path d="M10 19.5v-4.5h4v4.5" />
    </>
  ),
  lupa: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  caminhao: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5h4l3 3.5v2.5h-7z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  conversa: (
    <>
      <path d="M4 5.5h16v10H9l-4 3.5z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  etiqueta: (
    <>
      <path d="M3.5 12.5v-8h8l9 9-8 8z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </>
  ),
  cartao: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19M6.5 14.5h4" />
    </>
  ),
  pino: (
    <>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  seta: <path d="M9.5 6l6 6-6 6" />,
  "seta-esq": <path d="M14.5 6l-6 6 6 6" />,
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
};

export function Icone({ nome, className = "h-6 w-6", peso = 1.5 }: { nome: NomeIcone; className?: string; peso?: number }) {
  if (nome === "whats") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth={peso} strokeLinecap="round" strokeLinejoin="round">
      {TRACOS[nome]}
    </svg>
  );
}
