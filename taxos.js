// Asegúrate de tener Node.js 18+ para soporte nativo de fetch

import fetch from 'node-fetch';

const popularTaxonomies = [
  'Mammalia',
  'Aves',
  'Reptilia',
  'Amphibia',
  'Actinopterygii',
  'Insecta',
  'Arachnida',
  'Crustacea',
  'Echinodermata',
  'Cnidaria',
  'Nematoda',
  'Annelida'
];

const getTaxonomyId = async (taxonomy) => {
  try {
    // Endpoint de la API de GBIF para obtener el ID de la taxonomía
    const url = `https://api.gbif.org/v1/species/match?name=${taxonomy}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Error al obtener datos para ${taxonomy}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data.usageKey || null;
  } catch (error) {
    console.error(`Hubo un problema con la solicitud para ${taxonomy}:`, error);
    return null;
  }
};

const getPopularTaxonomies = async () => {
  const taxonomyIds = [];

  for (const taxonomy of popularTaxonomies) {
    const id = await getTaxonomyId(taxonomy);
    if (id) {
      taxonomyIds.push({ name: taxonomy, id });
    } else {
      taxonomyIds.push({ name: taxonomy, id: 'No encontrado' });
    }
  }

  console.log(taxonomyIds);
};

getPopularTaxonomies();
