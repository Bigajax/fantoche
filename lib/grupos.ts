/**
 * As portas que juntam categorias. A Fantoche tem cinco categorias
 * diretas (natação, esportes, lazer, roupas, acessórios), nenhuma
 * agrupada: o mapa fica vazio até precisar.
 */
export const GRUPOS: Record<string, { nome: string; categorias: string[] }> = {};

export function categoriasDoGrupo(slug: string): string[] | null {
  return GRUPOS[slug]?.categorias ?? null;
}
