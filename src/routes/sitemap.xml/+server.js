// /src/routes/sitemap.xml/+server.js
import * as sitemap from 'super-sitemap';
import { commonSpecies, iconicTaxa } from '$lib/iconicTaxa';

export const GET = async () => {
  return await sitemap.response({
    origin: 'https://randomanimal.site',
    paramValues: {
      "/taxonomy/[taxo]": iconicTaxa.map(t => t.name.toLowerCase()),
      "/species/[specie]": commonSpecies.map(s => s.title.toLowerCase()),
    }
  });
};