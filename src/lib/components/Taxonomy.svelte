<script lang="ts">
  import { goto } from '$app/navigation';
  export let iconicTaxa

  let taxos = iconicTaxa.sort((a, b) => a.name.localeCompare(b.name));

  function handleTaxoClick(taxo: string) {
    goto(`/taxonomy/${taxo.toLowerCase()}`);
  }
</script>

<!-- <h2 class="text-xl font-semibold mt-8 mb-4 text-center">View by Taxonomy</h2> -->
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
  {#each taxos as taxo}
    <button
      class="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col items-center justify-center space-y-2 hover:bg-gray-50"
      on:click={() => handleTaxoClick(taxo.name)}
    >
      <span class="text-4xl" role="img" aria-label={taxo.name}>
        {taxo.emoji}
      </span>
      <span class="text-lg font-medium text-center">
        {taxo.name}
      </span>
    </button>
  {/each}
</div>