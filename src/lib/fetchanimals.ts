// src/lib/api/fetchAnimals.ts
import { iconicTaxa, commonSpecies } from './iconicTaxa';

const API_URL = 'https://api.inaturalist.org/v1/observations';
const PER_PAGE = 3;

export interface Animal {
    taxon: {
        name: string;
        preferred_common_name: string;
        wikipedia_url: string;
        wikipedia_summary: string;
        extinct: boolean;
        threatened: boolean;
        endemic: boolean;
        native: boolean;
        introduced: boolean;
        rank: string;
        default_photo: {
            medium_url: string;
        };
    };
}

interface ApiResponse {
    total_results: number;
    results: any[];
}

// Construye los parámetros de la URL para la API
function buildApiParams(taxoName?: string, page: number = 1): URLSearchParams {
    const params = new URLSearchParams({
        per_page: PER_PAGE.toString(),
        page: page.toString(),
        photos: 'true',
        quality_grade: 'research',
        _: new Date().getTime().toString()
    });

    if (taxoName) {
        // Primero verificamos si es una especie común
        const speciesEntry = commonSpecies.find(s => s.name === taxoName);
        
        if (speciesEntry) {
            // Si es una especie específica, usamos su taxon_id
            params.append('taxon_id', speciesEntry.taxon_id.toString());
            // console.log('taxoName', params.getAll());
        } else if (taxoName === 'animal') {
            // Si es 'animal', incluimos todas las taxonomías
            iconicTaxa.forEach(taxon => {
                params.append('iconic_taxa[]', taxon.name);
            });
        } else {
            // Si es una taxonomía específica
            const validTaxon = iconicTaxa.find(t => t.name.toLowerCase() === taxoName.toLowerCase());
            if (!validTaxon) {
                throw new Error(`Taxonomía inválida: ${taxoName}`);
            }
            params.append('iconic_taxa[]', validTaxon.name);
        }
    }

    return params;
}

// Obtiene una página aleatoria basada en el total de resultados
function getRandomPage(totalResults: number): number {
    // La API tiene un límite de 10,000 resultados
    const maxResults = Math.min(totalResults, 10000);
    const maxPage = Math.floor(maxResults / PER_PAGE);
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
        taxon: {
            default_photo: result.taxon.default_photo,
            preferred_common_name: result.taxon.preferred_common_name,
            name: result.taxon.name,
            wikipedia_url: result.taxon.wikipedia_url,
            wikipedia_summary: result.taxon.wikipedia_summary,
            rank: result.taxon.rank,
            extinct: result.taxon.extinct,
            endemic: result.taxon.endemic,
            threatened: result.taxon.threatened,
            native: result.taxon.native,
            introduced: result.taxon.introduced
        }
    }));
}

// Función principal para obtener animales
export async function fetchAnimals(taxoName?: string): Promise<Animal[]> {
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
        const randomParams = buildApiParams(taxoName, randomPage);
        console.log(`${API_URL}?${randomParams}`);
        const randomResponse = await fetch(`${API_URL}?${randomParams}`);
        
        if (!randomResponse.ok) {
            throw new Error(`HTTP error! status: ${randomResponse.status}`);
        }

        const randomData: ApiResponse = await randomResponse.json();
        console.log('randomData', randomData);
        // Enriquecer los resultados con detalles adicionales
        // const enrichedResults = await Promise.all(
        //     randomData.results.map(async (result: any) => {
        //         if (result.taxon?.id) {
        //             try {
        //                 const taxonResponse = await fetch(`https://api.inaturalist.org/v1/taxa/${result.taxon.id}`);
        //                 if (taxonResponse.ok) {
        //                     const taxonData = await taxonResponse.json();
        //                     if (taxonData.results?.[0]) {
        //                         result.taxon = {
        //                             ...result.taxon,
        //                             ...taxonData.results[0]
        //                         };
        //                     }
        //                 }
        //             } catch (error) {
        //                 console.error('Error fetching taxon details:', error);
        //             }
        //         }
        //         return result;
        //     })
        // );

        // // Filtrar y aleatorizar los resultados
        // return filterValidResults(enrichedResults)
        //     .sort(() => Math.random() - 0.5);
        return randomData.results;

    } catch (error) {
        console.error('Error fetching animals:', error);
        throw error;
    }
}
