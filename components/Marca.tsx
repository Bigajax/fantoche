/**
 * A marca da Fantoche, desenhada em tipo: o nome em condensada caixa
 * alta e, na frente, a boia: um anel amarelo com o miolo azul da água,
 * o mesmo círculo que vira a raia. O letreiro herda a cor do texto; a
 * boia mantém as cores da marca em qualquer chão.
 */
export function Boia({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="18" fill="#ffc53d" />
      <circle cx="20" cy="20" r="9" fill="#0a84c7" />
      <path d="M20 2v9M20 29v9M2 20h9M29 20h9" stroke="#0b2d4f" strokeWidth="3" strokeLinecap="round" opacity=".55" />
    </svg>
  );
}

export function Logo({ className = "", comBoia = true }: { className?: string; comBoia?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-[0.3em] ${className}`}>
      {comBoia ? <Boia className="h-[1em] w-[1em] shrink-0" /> : null}
      <span className="romana leading-none">Fantoche</span>
    </span>
  );
}

/* a assinatura do estúdio, em máscara, pintada pela cor do texto */
export function MarcaEstudio({ altura, className = "" }: { altura: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label="Rafael Razeira Estúdio"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * (956 / 519)),
        WebkitMaskImage: "url(/marca/rafael-razeira.png)",
        maskImage: "url(/marca/rafael-razeira.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
