import { iconicTaxa } from '$lib/iconicTaxa';
export function getTaxonEmoji(taxonName: string): string {
  const taxon = iconicTaxa.find(t => t.name.toLowerCase() === taxonName);
  return taxon ? taxon.emoji : '🦁';
}
