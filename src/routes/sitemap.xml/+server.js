// /src/routes/sitemap.xml/+server.js
import * as sitemap from 'super-sitemap';

export const GET = async () => {
  return await sitemap.response({
    origin: 'https://randomanimal.site',
    paramValues: {
      "/taxonomy/[taxo]": ['Mammalia', 'Aves', 'Reptilia', 'Amphibia', 'Actinopterygii', 'Mollusca', 'Arachnida', 'Insecta']
    }
  });
};