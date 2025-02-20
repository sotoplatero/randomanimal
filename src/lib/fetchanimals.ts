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
            let queryParams = new URLSearchParams({
                per_page: '10',
                order: 'desc',
                order_by: 'id',
                photos: 'true',
                licensed: 'true',
                quality_grade: 'research',
                _: timestamp.toString()
            });

            if (taxoName === 'animal') {
                // Para animales aleatorios, usamos iconic_taxa
                const randomTaxon = iconicTaxa[Math.floor(Math.random() * iconicTaxa.length)].name;
                queryParams.append('iconic_taxa', randomTaxon);
            } else {
                // Para taxonomías específicas, usamos taxon_name
                queryParams.append('taxon_name', taxoName);
            }

            // Fetch observations with the specified parameters
            const url = `https://api.inaturalist.org/v1/observations?${queryParams.toString()}`;
            const response = await fetch(url);
            
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                // Obtener detalles adicionales para cada taxón
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

                // Aleatorizar el orden de los resultados
                return enrichedResults
                    .sort(() => Math.random() - 0.5)
                    .filter((result: any) => result.taxon?.default_photo?.medium_url);
            }

            attempts++;
        } catch (error) {
            console.error('Error fetching animals:', error);
            if (attempts === maxRetries - 1) {
                throw error;
            }
            attempts++;
        }
    }

    throw new Error(`Failed to find animals after ${maxRetries} attempts`);
}
