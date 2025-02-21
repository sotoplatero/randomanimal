<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchAnimals, type Animal } from '$lib/fetchanimals';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';

    export let taxoName: string | undefined = undefined;
    $: console.log('taxoName', taxoName);
    
    let animal: Animal | null = null;
    let loading: boolean = false;
    let animalCache: Animal[] = [];
    let currentTaxo: string | undefined = undefined;

    // Cuando cambia la taxonomía, reiniciamos todo
    $: if (browser && taxoName !== currentTaxo) {
        currentTaxo = taxoName;
        animalCache = [];
        loading = false;
        loadNextAnimal();
    }

    onMount(async () => {
        if (browser) {
            currentTaxo = taxoName;
            await loadNextAnimal();
        }
    });

    async function loadNextAnimal() {
        if (loading) return;

        try {
            // Solo activamos loading si no hay animales disponibles
            if (animalCache.length === 0) {
                loading = true;
                const animals = await fetchAnimals(currentTaxo || 'animal');
                if (currentTaxo === taxoName) { // Solo actualizar si no ha cambiado la taxonomía
                    animalCache = animals;
                }
            }

            if (animalCache.length > 0) {
                animal = animalCache.pop() || null;
                // Si quedan 2 animales, cargamos más de forma asíncrona
                if (animalCache.length === 2) {
                    console.log('cargando más animales');
                    fetchAnimals(currentTaxo || 'animal').then(animals => {
                        if (currentTaxo === taxoName) {
                            animalCache = animals;
                        }
                    }).catch(error => {
                        console.error('Error fetching animals:', error);
                    });
                }
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            loading = false;
        }
    }
</script>

<div class="flex flex-col items-center gap-4">
    <div class="w-full bg-base-200 rounded-xl p-6 shadow-lg">
        {#if loading && !animal}
            <div class="flex justify-center items-center h-64">
                <div class="loading loading-spinner loading-lg"></div>
            </div>
        {:else if animal}
            <div class="space-y-4" transition:fade>
                <div class="aspect-video rounded-lg overflow-hidden bg-gray-200">
                    <img 
                        src={animal.taxon.default_photo.medium_url} 
                        alt={animal.taxon.preferred_common_name || animal.taxon.name}
                        class="w-full h-full object-cover"
                    />
                </div>

                <button 
                    class="btn btn-primary w-full mt-4"
                    on:click={loadNextAnimal}
                    disabled={loading}
                >
                    Next {taxoName || 'Animal'}
                </button>

                <div class="space-y-2">
                    <h2 class="text-2xl font-bold text-center">
                        {animal.taxon.preferred_common_name || animal.taxon.name}
                    </h2>
                    <p class="text-sm italic text-center">{animal.taxon.name}</p>

                    {#if animal.taxon.rank || animal.taxon.extinct || animal.taxon.threatened}
                        <div class="flex flex-wrap gap-2 justify-center mt-2">
                            {#if animal.taxon.rank}
                                <span class="badge badge-info">{animal.taxon.rank}</span>
                            {/if}
                            {#if animal.taxon.extinct}
                                <span class="badge badge-error">Extinct</span>
                            {/if}
                            {#if animal.taxon.threatened}
                                <span class="badge badge-warning">Threatened</span>
                            {/if}
                            {#if animal.taxon.endemic}
                                <span class="badge badge-success">Endemic</span>
                            {/if}
                        </div>
                    {/if}

                    {#if animal.taxon.wikipedia_summary}
                        <p class="text-gray-700 mt-4">{@html animal.taxon.wikipedia_summary}</p>
                    {/if}

                    {#if animal.taxon.wikipedia_url}
                        <div class="text-center mt-4">
                            <a 
                                href={animal.taxon.wikipedia_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                class="text-blue-500 hover:text-blue-700 underline"
                            >
                                Learn More on Wikipedia
                            </a>
                        </div>
                    {/if}
                </div>
            </div>
        {:else}
            <div class="flex justify-center items-center h-64">
                <p class="text-gray-500">No animal data available</p>
            </div>
        {/if}
    </div>
</div>
