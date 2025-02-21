<script lang="ts">
    import { page } from '$app/stores';
    import EnhancedAnimalDisplay from '$lib/components/EnhancedAnimalDisplay.svelte';
    import Species from '$lib/components/Species.svelte';
    import { commonSpecies } from '$lib/iconicTaxa';

    $: specie = $page.params.specie;
    $: specieData = commonSpecies.find(s => s.title.toLowerCase() === specie.toLowerCase());
    $: taxoName = specieData?.name;
</script>

<div class="container mx-auto px-4 py-8">
    <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2">
            {#if specieData}
                <span class="mr-2">{specieData.emoji}</span>
                {specieData.title}
            {:else}
                Unknown Species
            {/if}
        </h1>
    </div>

    {#if taxoName}
        <EnhancedAnimalDisplay taxoName={taxoName} />
    {:else}
        <div class="text-center text-gray-500">
            Species not found
        </div>
    {/if}
</div>

<section class="mt-12"> 
    <h2 class="text-2xl font-bold mb-4 text-center">Random Animal by Species</h2>
    <Species />
</section>

