// src/lib/api/fetchAnimals.ts
import { iconicTaxa } from '$lib/iconicTaxa';

const API_URL = 'https://api.inaturalist.org/v1/observations';
const PER_PAGE = 10;

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

interface ApiResponse {
    total_results: number;
    results: any[];
}

// Construye los parámetros de la URL para la API
function buildApiParams(taxoName?: string, page: number = 1, perPage: number = 10): URLSearchParams {
    const params = new URLSearchParams({
        per_page: perPage.toString(),
        page: page.toString(),
        photos: 'true',
        licensed: 'true',
        quality_grade: 'research',
        _: new Date().getTime().toString()
    });

    // Si se proporciona un taxón específico, lo agregamos a los parámetros
    if (taxoName) {
        if (taxoName === 'animal') {
            // Incluir todas las taxonomías de iconicTaxa
            iconicTaxa.forEach(taxon => {
                params.append('iconic_taxa[]', taxon.name);
            });
        } else {
            // Verificar si la taxonomía proporcionada está en iconicTaxa
            const validTaxon = iconicTaxa.find(t => t.name.toLowerCase() === taxoName);
            if (!validTaxon) {
                throw new Error(`Taxonomía inválida: ${taxoName}. Debe ser una de: ${iconicTaxa.map(t => t.name).join(', ')}`);
            }
            params.append('iconic_taxa[]', taxoName);
        }
    }

    return params;
}

// Obtiene una página aleatoria basada en el total de resultados
function getRandomPage(totalResults: number): number {
    // La API tiene un límite de 10,000 resultados
    const maxResults = Math.min(totalResults, 10000);
    const resultsPerPage = 3;
    const maxPage = Math.floor(maxResults / resultsPerPage);
    return Math.floor(Math.random() * maxPage) + 1;
}

// Filtra los resultados para asegurar que tengan toda la información necesaria
function filterValidResults(results: any[]): Animal[] {
    return results.filter(result => 
        result.taxon &&
        result.taxon.default_photo?.medium_url &&
        result.taxon.name &&
        !result.taxon.extinct
    ).map(result => ({
        id: result.id,
        taxon: {
            default_photo: result.taxon.default_photo,
            preferred_common_name: result.taxon.preferred_common_name,
            name: result.taxon.name,
            wikipedia_url: result.taxon.wikipedia_url,
            wikipedia_summary: result.taxon.wikipedia_summary,
            rank: result.taxon.rank,
            extinct: result.taxon.extinct,
            ancestor_ids: result.taxon.ancestor_ids,
            endemic: result.taxon.endemic,
            threatened: result.taxon.threatened,
            native: result.taxon.native,
            introduced: result.taxon.introduced
        }
    }));
}

// Función principal para obtener animales
export async function fetchAnimals(taxoName: string = 'animal', maxRetries: number = 3): Promise<Animal[]> {
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            // Primera llamada para obtener el total de resultados
            const initialParams = buildApiParams(taxoName);
            const initialResponse = await fetch(`${API_URL}?${initialParams}`);
            
            if (initialResponse.status === 429) {
                throw new Error('Rate limit exceeded. Please try again later.');
            }

            if (!initialResponse.ok) {
                throw new Error(`HTTP error! status: ${initialResponse.status}`);
            }

            const initialData: ApiResponse = await initialResponse.json();

            if (!initialData.total_results) {
                throw new Error('No se encontraron resultados');
            }

            // Obtener una página aleatoria
            const randomPage = getRandomPage(initialData.total_results);
            const randomParams = buildApiParams(taxoName, randomPage, 3);
            const randomResponse = await fetch(`${API_URL}?${randomParams}`);
            
            if (!randomResponse.ok) {
                throw new Error(`HTTP error! status: ${randomResponse.status}`);
            }

            const randomData: ApiResponse = await randomResponse.json();

            // Filtrar y devolver los resultados válidos
            const enrichedResults = await Promise.all(
                randomData.results.map(async (result: any) => {
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
            return filterValidResults(enrichedResults)
                .sort(() => Math.random() - 0.5);

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
