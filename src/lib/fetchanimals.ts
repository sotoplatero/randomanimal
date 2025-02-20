// src/lib/api/fetchAnimals.ts
import { iconicTaxa } from '$lib/iconicTaxa';

export interface Animal {
    id: number;
    taxon: {
        default_photo: { medium_url: string };
        preferred_common_name?: string;
        name: string;
        wikipedia_url?: string;
        wikipedia_summary?: string;
        rank?: string;
        extinct?: boolean;
        ancestor_ids?: number[];
        endemic?: boolean;
        threatened?: boolean;
        native?: boolean;
        introduced?: boolean;
    };
}

/**
 * Fetches a list of random animals from iNaturalist API based on the provided taxon name.
 * @param taxoName - The taxonomic name or category to search for
 * @param maxRetries - Maximum number of retries if no animals are found
 * @returns A list of animals with unique IDs and associated images.
 */
export async function fetchAnimals(taxoName: string = 'animal', maxRetries: number = 3): Promise<Animal[]> {
    const timestamp = new Date().getTime();
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            let queryParam: string;
            
            if (taxoName === 'animal') {
                // Para animales aleatorios, usamos iconic_taxa
                const randomTaxon = iconicTaxa[Math.floor(Math.random() * iconicTaxa.length)].name;
                queryParam = `iconic_taxa=${randomTaxon}`;
            } else {
                // Para cualquier taxonomía específica
                queryParam = `iconic_taxa=${taxoName}`;
            }

            // Fetch max ID to get a random range of animals
            const maxIdUrl = `https://api.inaturalist.org/v1/observations?per_page=1&order=desc&order_by=id&${queryParam}&_=${timestamp}`;
            const maxIdResponse = await fetch(maxIdUrl);
            
            if (!maxIdResponse.ok) {
                throw new Error(`HTTP error! status: ${maxIdResponse.status}`);
            }

            const maxIdData = await maxIdResponse.json();

            if (!maxIdData.results || maxIdData.results.length === 0) {
                throw new Error('No animals found for this taxon');
            }

            const maxId = maxIdData.results[0].id;
            const randomId = Math.floor(Math.random() * maxId);

            // Fetch a random selection of animals with quality parameters
            const url = new URL('https://api.inaturalist.org/v1/observations');
            const params = new URLSearchParams({
                per_page: '10',                    // Más resultados para más variedad
                order: 'asc',
                order_by: 'id',
                id_above: randomId.toString(),
                quality_grade: 'research',        // Solo observaciones verificadas
                photos: 'true',                   // Debe tener fotos
                licensed: 'true',                 // Solo fotos con licencia
                _: timestamp.toString()
            });
            url.search = params.toString() + '&' + queryParam;

            const response = await fetch(url.toString());

            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.results && data.results.length > 0) {
                // Para cada resultado, obtener información adicional del taxón
                const enrichedResults = await Promise.all(
                    data.results.map(async (result: any) => {
                        if (result.taxon?.id) {
                            try {
                                const taxonResponse = await fetch(
                                    `https://api.inaturalist.org/v1/taxa/${result.taxon.id}`
                                );
                                if (taxonResponse.ok) {
                                    const taxonData = await taxonResponse.json();
                                    if (taxonData.results?.[0]) {
                                        result.taxon = {
                                            ...result.taxon,
                                            ...taxonData.results[0]
                                        };
                                    }
                                }
                            } catch (error) {
                                console.error('Error fetching taxon details:', error);
                            }
                        }
                        return result;
                    })
                );
                return enrichedResults;
            }

            attempts++;
        } catch (error) {
            if (attempts === maxRetries - 1) {
                console.error('Error fetching animals:', error);
                throw error;
            }
            attempts++;
        }
    }

    throw new Error(`Failed to find animals after ${maxRetries} attempts`);
}
