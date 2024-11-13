// src/lib/api/fetchAnimals.ts
import { PUBLIC_DOG_API_KEY } from '$env/static/public';
// src/lib/api/fetchAnimals.ts
// src/lib/api/fetchAnimals.ts

import { iconicTaxa } from '$lib/iconicTaxa';

export interface Animal {
  id: number;
  taxon: {
    default_photo: { medium_url: string };
    preferred_common_name?: string;
    name: string;
  };
}

/**
 * Fetches a list of random animals from iNaturalist API based on the provided taxon name.
 * @param taxoName - The taxonomic name or category to search for (e.g., "animal" or specific taxa).
 * @returns A list of animals with unique IDs and associated images.
 */
export async function fetchAnimals(taxoName: string): Promise<Animal[]> {
  try {
    const taxon = taxoName === 'animal'
      ? iconicTaxa[Math.floor(Math.random() * iconicTaxa.length)].name
      : taxoName;
    const timestamp = new Date().getTime();

    // Fetch max ID to get a random range of animals
    const maxIdUrl = `https://api.inaturalist.org/v1/observations?per_page=1&order=desc&order_by=id&iconic_taxa=${taxon}&_=${timestamp}`;
    const maxIdResponse = await fetch(maxIdUrl);
    const maxIdData = await maxIdResponse.json();

    if (!maxIdData.results || maxIdData.results.length === 0) {
      throw new Error('No animals found for this taxon');
    }

    const maxId = maxIdData.results[0].id;
    const randomId = Math.floor(Math.random() * maxId);

    // Fetch a random selection of animals starting from a random ID
    const url = `https://api.inaturalist.org/v1/observations?per_page=2&order=asc&order_by=id&id_above=${randomId}&iconic_taxa=${taxon}&has[]=photos&_=${timestamp}`;
    const response = await fetch(url);

    if (response.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    console.error('Error in fetchAnimals:', errorMessage);
    throw new Error(errorMessage);
  }
}
