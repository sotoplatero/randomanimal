<script lang="ts">
    import { commonSpecies } from '$lib/iconicTaxa';
    import { goto } from '$app/navigation';

    function handleSpeciesClick(specie: string) {
        goto(`/species/${specie.toLowerCase()}`);
    }
</script>

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {#each commonSpecies as specie}
        <button
            class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50"
            on:click={() => handleSpeciesClick(specie.title)}
        >
            <span class="text-4xl" role="img" aria-label={specie.title}>
                {specie.emoji}
            </span>
            <span class="text-lg font-medium text-center">
                {specie.title}
            </span>
            <span class="text-sm text-gray-500 italic text-center">
                {specie.name}
            </span>
        </button>
    {/each}
</div>
