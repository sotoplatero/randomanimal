// /src/routes/sitemap.xml/+server.js
import * as sitemap from 'super-sitemap';

export const GET = async () => {
  return await sitemap.response({
    origin: 'https://randomanimal.site',
    paramValues: {
      "/taxonomy/[taxo]": ['mammalia', 'aves', 'reptilia', 'amphibia', 'actinopterygii', 'mollusca', 'arachnida', 'insecta']
    }
  });
};