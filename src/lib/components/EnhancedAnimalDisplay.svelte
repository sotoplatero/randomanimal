<script lang="ts">
    import { onMount } from 'svelte';
    import { fetchAnimals, type Animal } from '$lib/fetchanimals';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';

    export let taxoName: string | undefined = undefined;

    let animal: Animal | null = null;
    let loading: boolean = false;
    let animalCache: Animal[] = [];
    const CACHE_SIZE = 5;

    onMount(async () => {
        if (browser) {
            await loadNextAnimal();
        }
    });

    async function loadNextAnimal() {
        if (loading) return;
        loading = true;

        try {
            if (animalCache.length === 0) {
                const animals = await fetchAnimals(taxoName || 'animal');
                animalCache = animals;
            }

            if (animalCache.length > 0) {
                animal = animalCache.pop() || null;
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            loading = false;
        }
    }
</script>

<div class="flex flex-col items-center gap-4 p-4">
    <div class="w-full max-w-2xl bg-base-200 rounded-xl p-6 shadow-lg">
        {#if loading}
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
                        <p class="text-gray-700 mt-4">{animal.taxon.wikipedia_summary}</p>
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
