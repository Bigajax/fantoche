"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Marca";
import { Icone } from "./Icones";
import type { Aba } from "@/lib/menu";
import type { Categoria } from "@/lib/tipos";

/**
 * Três linhas: o aviso marinho (frases do painel separadas por "|", que
 * se revezam), a linha da marca em branco (a boia e o nome à esquerda,
 * a busca no meio, o WhatsApp amarelo à direita) e a fila de portas no
 * azul da água, com ícone, nome e a contagem. No desktop, passar o
 * mouse numa porta abre a aba dela por baixo, com os atalhos; o clique
 * abre a página. O botão Menu abre uma gaveta pela direita. No celular:
 * menu à esquerda, marca no meio, WhatsApp à direita, a busca larga
 * logo abaixo, a linha da cidade, e a fila de portas rolando de lado.
 */
export function Cabecalho({ linkWhats, aviso, menu }: { categorias?: Categoria[]; linkWhats: string; aviso?: string; menu: Aba[] }) {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const router = useRouter();
  const caminho = usePathname();
  const base = (aviso ?? "").split("|").map((f) => f.trim()).filter(Boolean);
  const frases = base.length ? Array.from({ length: 4 }, (_, i) => base[i % base.length]) : [];

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fechar);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = termo.trim();
    setAberto(false);
    router.push(q ? `/catalogo?busca=${encodeURIComponent(q)}` : "/catalogo");
  }

  const atual = (href: string) => href.startsWith("/catalogo/") && caminho.startsWith(href.split("?")[0]);

  const busca = (id: string, placeholder: string) => (
    <label className="busca-cabecalho">
      <span className="sr-only">Buscar por produto</span>
      <input id={id} value={termo} onChange={(e) => setTermo(e.target.value)} placeholder={placeholder} />
      <button type="submit" aria-label="Buscar">
        <Icone nome="lupa" className="h-5 w-5" peso={2} />
      </button>
    </label>
  );

  return (
    <header className="relative z-50 [overflow-x:clip]">
      {frases.length ? (
        <p className="escuro aviso hidden text-[0.8125rem] font-semibold lg:block" aria-live="off">
          {frases.map((f, i) => (
            <span key={i} className="aviso-item" style={{ "--i": i } as React.CSSProperties}>
              {f}
            </span>
          ))}
        </p>
      ) : null}

      <div className="bg-branco text-marinho">
        <div className="miolo flex h-[4.25rem] items-center justify-between gap-3 lg:grid lg:h-[5.5rem] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
          <button type="button" onClick={() => setAberto(true)} aria-expanded={aberto} aria-controls="menu-categorias" aria-label="Abrir o menu" className="flex h-10 w-10 items-center justify-center lg:hidden">
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span className="block h-[2px] w-6 bg-marinho" />
              <span className="block h-[2px] w-6 bg-marinho" />
              <span className="block h-[2px] w-6 bg-marinho" />
            </span>
          </button>

          <Link href="/" aria-label="Fantoche, página inicial" className="flex shrink-0 text-[1.75rem] text-marinho lg:text-[2.25rem]">
            <Logo />
          </Link>

          <form onSubmit={buscar} role="search" className="mx-auto hidden w-full max-w-[32rem] lg:block">
            {busca("busca-topo", "O que você procura? Óculos, bola, boia...")}
          </form>

          <div className="flex items-center gap-2 lg:gap-4">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--raia btn--pequeno hidden lg:inline-flex">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Pedir no WhatsApp
            </a>
            <a href={linkWhats} target="_blank" rel="noreferrer" aria-label="Pedir no WhatsApp" className="flex h-10 w-10 items-center justify-center text-agua lg:hidden">
              <Icone nome="whats" className="h-7 w-7" />
            </a>
            <button type="button" onClick={() => setAberto((v) => !v)} aria-expanded={aberto} aria-controls="menu-categorias" className="romana hidden items-center gap-2 text-[1.0625rem] text-marinho hover:text-agua lg:flex">
              <span aria-hidden="true" className="flex flex-col gap-[4px]">
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-5 bg-current" />
              </span>
              Menu
            </button>
          </div>
        </div>

        <form onSubmit={buscar} role="search" className="miolo pb-3 lg:hidden">
          {busca("busca-celular", "O que você procura?")}
        </form>
      </div>

      {/* no celular, a linha da cidade entre a busca e as portas */}
      <Link href="/#loja" className="escuro flex items-center gap-2 px-[var(--sangria)] py-2.5 text-[0.8125rem] text-branco lg:hidden">
        <Icone nome="pino" className="h-4 w-4 shrink-0 text-raia" peso={1.8} />
        <span className="min-w-0 flex-1 truncate">
          <span className="font-semibold">Indaiatuba, SP</span>
          <span className="text-marfim-fraco"> · retire na loja ou receba em casa</span>
        </span>
        <Icone nome="seta" className="h-4 w-4 shrink-0 text-marfim-fraco" peso={2} />
      </Link>

      <nav aria-label="Portas da loja" className="agua">
        <ul className="miolo faixa-scroll flex overflow-x-auto lg:overflow-visible">
          {menu.map((aba, i) => {
            const ultima = i === menu.length - 1;
            const rotulo = (
              <>
                <Icone nome={aba.icone} className="h-7 w-7 shrink-0 lg:h-8 lg:w-8" peso={1.4} />
                <span className="flex flex-col items-center leading-tight lg:items-start">
                  <span>{aba.nome}</span>
                  {aba.nota ? <span className="porta-nota">{aba.nota}</span> : null}
                </span>
                {aba.total ? <span className="porta-numero">{aba.total}</span> : null}
              </>
            );
            return (
              <li key={aba.chave} className={`porta ${i > 0 ? "lg:border-l lg:border-white/15" : ""} ${ultima ? "lg:ml-auto lg:border-r lg:border-white/15" : ""}`}>
                {aba.externa ? (
                  <a href={aba.href} target="_blank" rel="noreferrer" className="porta-link">
                    {rotulo}
                  </a>
                ) : (
                  <Link href={aba.href} className="porta-link" aria-current={atual(aba.href) ? "page" : undefined}>
                    {rotulo}
                  </Link>
                )}

                <div className={`porta-aba ${i >= menu.length / 2 ? "porta-aba--direita" : ""}`} aria-label={`${aba.nome}: atalhos`}>
                  {aba.titulo ? <p className="etiqueta mb-3">{aba.titulo}</p> : null}
                  <ul className={`grid gap-x-8 gap-y-1 ${aba.colunas === 4 ? "grid-cols-4" : aba.colunas === 3 ? "grid-cols-3" : aba.colunas === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {aba.itens.map((item) => {
                      const conteudo = (
                        <>
                          {item.icone ? <Icone nome={item.icone} className="h-6 w-6 shrink-0 text-agua" peso={1.4} /> : null}
                          <span className="min-w-0">
                            <span className="block text-[0.9375rem] text-tinta group-hover:text-agua">{item.nome}</span>
                            {item.nota && item.icone ? <span className="block text-[0.75rem] text-tinta-fraca">{item.nota}</span> : null}
                          </span>
                          {item.nota && !item.icone ? <span className="ml-auto text-[0.75rem] font-semibold text-tinta-fraca">{item.nota}</span> : null}
                        </>
                      );
                      return (
                        <li key={item.nome + item.href}>
                          {item.externa ? (
                            <a href={item.href} target="_blank" rel="noreferrer" className="porta-item group">
                              {conteudo}
                            </a>
                          ) : (
                            <Link href={item.href} className="porta-item group">
                              {conteudo}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {aberto ? (
        <>
          <button type="button" aria-label="Fechar o menu" onClick={() => setAberto(false)} className="gaveta-veu" />
          <nav id="menu-categorias" aria-label="Menu" className="escuro gaveta">
            <div className="flex items-center justify-between px-5 pt-5">
              <span className="text-[1.5rem] text-branco">
                <Logo />
              </span>
              <button type="button" onClick={() => setAberto(false)} aria-label="Fechar o menu" className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-branco hover:border-raia hover:text-raia">
                <Icone nome="fechar" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={buscar} role="search" className="px-5 pt-4">
              {busca("busca-gaveta", "O que você procura?")}
            </form>

            <ul className="mt-3 flex-1 overflow-y-auto px-3 pb-4">
              {menu.map((aba) => {
                const conteudo = (
                  <>
                    <Icone nome={aba.icone} className="h-7 w-7 shrink-0 text-raia" peso={1.4} />
                    <span className="romana text-[1.25rem] text-branco">{aba.nome}</span>
                    {aba.total ? <span className="ml-auto text-[0.8125rem] font-semibold text-marfim-fraco">{aba.total}</span> : null}
                  </>
                );
                return (
                  <li key={aba.chave} className="border-b border-white/10 last:border-b-0">
                    {aba.externa ? (
                      <a href={aba.href} target="_blank" rel="noreferrer" onClick={() => setAberto(false)} className="gaveta-porta">
                        {conteudo}
                      </a>
                    ) : (
                      <Link href={aba.href} onClick={() => setAberto(false)} className="gaveta-porta">
                        {conteudo}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-white/10 px-5 py-5">
              <a href={linkWhats} target="_blank" rel="noreferrer" onClick={() => setAberto(false)} className="btn btn--raia w-full">
                <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
                Pedir no WhatsApp
              </a>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
