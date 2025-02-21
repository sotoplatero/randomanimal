const commonSpecies = [
    { name: 'Felis catus', emoji: '🐱', title: 'Cats' },
    { name: 'Canis lupus familiaris', emoji: '🐶', title: 'Dogs' },
    { name: 'Equidae', emoji: '🐎', title: 'Horses' },
    { name: 'Ursidae', emoji: '🐻', title: 'Bears' },
    { name: 'Elephantidae', emoji: '🐘', title: 'Elephants' },
    { name: 'Giraffa reticulata', emoji: '🦒', title: 'Giraffes' },
    { name: 'Pan troglodytes', emoji: '🦧', title: 'Apes' },
    { name: 'Oryctolagus cuniculus', emoji: '🐰', title: 'Rabbits' },
    { name: 'Mesocricetus auratus', emoji: '🐹', title: 'Hamsters' }
];

async function getTaxonId(scientificName) {
    try {
        const params = new URLSearchParams({
            q: scientificName,
            per_page: '1',
            is_active: 'true'
        });
        
        const response = await fetch(`https://api.inaturalist.org/v1/taxa?${params}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return {
            name: scientificName,
            id: data.results[0]?.id || null,
            matched_name: data.results[0]?.matched_term || null
        };
    } catch (error) {
        console.error(`Error getting taxon_id for ${scientificName}:`, error);
        return {
            name: scientificName,
            id: null,
            error: error.message
        };
    }
}

async function getAllTaxonIds() {
    const results = [];
    
    for (const species of commonSpecies) {
        console.log(`Buscando ID para ${species.name}...`);
        const result = await getTaxonId(species.name);
        results.push({
            ...species,
            taxon_id: result.id,
            matched_name: result.matched_name
        });
        // Esperar un segundo entre solicitudes para no sobrecargar la API
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    console.log('\nResultados:');
    console.log(JSON.stringify(results, null, 2));
}

getAllTaxonIds();
