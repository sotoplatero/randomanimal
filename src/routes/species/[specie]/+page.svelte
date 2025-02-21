<script lang="ts">
    import { page } from '$app/stores';
    import EnhancedAnimalDisplay from '$lib/components/EnhancedAnimalDisplay.svelte';
    import Species from '$lib/components/Species.svelte';
    import { commonSpecies } from '$lib/iconicTaxa';

    $: specie = $page.params.specie;
    $: specieData = commonSpecies.find(s => s.title.toLowerCase() === specie.toLowerCase());
</script>

<div class="container mx-auto px-4 py-8">
    {#if specieData}
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-2">
                <span class="text-4xl mr-2">{specieData.emoji}</span>
                {specieData.title}
            </h1>
            <p class="text-gray-600 italic">{specieData.name}</p>
        </div>

        <EnhancedAnimalDisplay taxoName={specieData.name} />
    {:else}
        <div class="text-center text-red-600">
            <p>Species not found</p>
        </div>
    {/if}
</div>

<section class="mt-12"> 
    <h2 class="text-2xl font-bold mb-4 text-center">Random Animal by Species</h2>
    <Species />
</section>
