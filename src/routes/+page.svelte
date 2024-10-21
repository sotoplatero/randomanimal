<script lang="ts">
  import AnimalDisplay from '$lib/components/AnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';

  const iconicTaxa = [
    { name: 'Mammalia', emoji: '🐘' },
    { name: 'Aves', emoji: '🦜' },
    { name: 'Reptilia', emoji: '🐊' },
    { name: 'Amphibia', emoji: '🐸' },
    { name: 'Actinopterygii', emoji: '🐠' },
    { name: 'Mollusca', emoji: '🐌' },
    { name: 'Arachnida', emoji: '🕷️' },
    { name: 'Insecta', emoji: '🦋' }
  ];
</script>

<SEO 
  title="Random Animal Viewer"
  description="Discover random animals from various taxonomies. Learn about different species with our interactive animal viewer."
/>

<h1 class="text-3xl font-bold mb-4">Random Animal</h1>

<AnimalDisplay />

<h2 class="text-xl font-semibold mt-8 mb-4">View by Taxonomy</h2>
<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
  {#each iconicTaxa as { name, emoji }}
    <a href="/taxonomy/{name}" class="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded text-center flex items-center justify-center">
      <span class="mr-2">{emoji}</span>
      <span>{name}</span>
    </a>
  {/each}
</div>
