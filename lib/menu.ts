import type { Produto } from "./tipos";
import { site } from "@/data/site.config";

/**
 * O menu das portas, montado do catálogo: cada porta do cabeçalho abre
 * uma aba ao passar o mouse, e o que está na aba vem dos produtos
 * (os atalhos só aparecem se acham algo), da loja (endereço) e do
 * WhatsApp. Assim a aba nunca promete o que a vitrine não tem.
 */
export type NomeIconeMenu = "novidade" | "natacao" | "esportes" | "lazer" | "roupas" | "acessorios" | "loja" | "etiqueta" | "pino" | "conversa";

export type ItemMenu = {
  nome: string;
  href: string;
  icone?: NomeIconeMenu;
  nota?: string;
  externa?: boolean;
};

export type Aba = {
  chave: string;
  nome: string;
  href: string;
  icone: NomeIconeMenu;
  externa?: boolean;
  titulo?: string;
  itens: ItemMenu[];
  colunas: 1 | 2 | 3 | 4;
  /* o número ao lado do nome na fila de portas */
  total?: number;
  /* a linha miúda embaixo do nome, só na porta da loja */
  nota?: string;
};

const PORTAS: { slug: string; nome: string; tudo: string; icone: NomeIconeMenu; linha: string; atalhos: string[] }[] = [
  { slug: "natacao", nome: "Natação", tudo: "Toda a natação", icone: "natacao", linha: "óculos, touca, maiô, prancha, nadadeira", atalhos: ["Óculos", "Touca", "Maiô", "Prancha", "Nadadeira", "Boia"] },
  { slug: "esportes", nome: "Esportes", tudo: "Todos os esportes", icone: "esportes", linha: "bolas, raquetes, luvas, cones", atalhos: ["Bola", "Raquete", "Luvas", "Cones", "Corda", "Caneleira"] },
  { slug: "lazer", nome: "Lazer", tudo: "Todo o lazer", icone: "lazer", linha: "piscina, boia, skate, patins, frescobol", atalhos: ["Piscina", "Boia", "Skate", "Patins", "Frescobol", "Frisbee"] },
  { slug: "roupas", nome: "Roupas", tudo: "Todas as roupas", icone: "roupas", linha: "camiseta dry-fit, boné, shorts, legging", atalhos: ["Camiseta", "Boné", "Shorts", "Legging", "Moletom"] },
  { slug: "acessorios", nome: "Acessórios", tudo: "Todos os acessórios", icone: "acessorios", linha: "garrafa, toalha, mochila, tapete, relógio", atalhos: ["Garrafa", "Toalha", "Mochila", "Tapete", "Relógio", "Elástico"] },
];

export function montarMenu(produtos: Produto[], linkWhats: string): Aba[] {
  const ativos = produtos.filter((p) => p.ativo);
  const conta = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).length;
  const busca = (cat: string, termo: string) => `/catalogo/${cat}?busca=${encodeURIComponent(termo)}`;
  const existe = (cat: string, termo: string) => ativos.some((p) => p.categoria_slug === cat && p.nome.toLowerCase().includes(termo.toLowerCase()));

  return [
    ...PORTAS.map((porta): Aba => {
      const total = conta(porta.slug);
      return {
        chave: porta.slug,
        nome: porta.nome,
        href: `/catalogo/${porta.slug}`,
        icone: porta.icone,
        total,
        titulo: `${total} ${total === 1 ? "produto" : "produtos"}: ${porta.linha}`,
        colunas: 2,
        itens: [
          ...porta.atalhos.filter((t) => existe(porta.slug, t)).map((t) => ({ nome: t, href: busca(porta.slug, t) })),
          { nome: porta.tudo, href: `/catalogo/${porta.slug}`, icone: porta.icone },
        ],
      };
    }),
    {
      chave: "loja",
      nome: "A loja",
      href: "/#loja",
      icone: "loja",
      nota: "Indaiatuba, SP",
      colunas: 1,
      itens: [
        { nome: "Endereço e como chegar", href: "/#loja", icone: "pino", nota: site.endereco.split(",").slice(0, 2).join(",") },
        { nome: "Falar no WhatsApp", href: linkWhats, icone: "conversa", nota: "pedido, tamanho e entrega", externa: true },
        { nome: "Chegou agora", href: "/#destaques", icone: "novidade", nota: "a seleção da loja" },
      ],
    },
  ];
}
