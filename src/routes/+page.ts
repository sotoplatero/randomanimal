import type { PageLoad } from './$types';

interface Animal {
  id: number;
  taxon: {
    name: string;
    preferred_common_name: string;
    default_photo: {
      medium_url: string;
    };
  };
}

export const load: PageLoad = async () => {
  try {
    const timestamp = new Date().getTime();
    const response = await fetch(`https://api.inaturalist.org/v1/observations?per_page=2&order=desc&has[]=photos&_=${timestamp}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch initial animals');
    }

    const data = await response.json();
    const animals: Animal[] = data.results;

    return {
      initialAnimals: animals
    };
  } catch (error) {
    console.error('Error loading initial animals:', error);
    return {
      initialAnimals: []
    };
  }
}; 