export const iconicTaxa = [
  { name: 'Mammalia', emoji: '🐘' },
  { name: 'Aves', emoji: '🦜' },
  { name: 'Reptilia', emoji: '🐊' },
  { name: 'Amphibia', emoji: '🐸' },
  { name: 'Actinopterygii', emoji: '🐠' },
  { name: 'Mollusca', emoji: '🐌' },
  { name: 'Arachnida', emoji: '🕷️' },
  { name: 'Insecta', emoji: '🦋' }
];

export function getTaxonEmoji(taxonName: string): string {
  const taxon = iconicTaxa.find(t => t.name === taxonName);
  return taxon ? taxon.emoji : '🦁';
}
