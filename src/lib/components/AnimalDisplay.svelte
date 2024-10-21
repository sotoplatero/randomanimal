<script>
  import { onMount } from 'svelte';
  import { iconicTaxa } from '$lib/utils/taxonUtils';

  export let taxoName = 'animal';
  export let specificTaxon = null;

  let animal = null;
  let loading = true;
  let error = null;
  let currentId = null;

  async function fetchRandomAnimal() {
    try {
      loading = true;
      console.log('Fetching new animal...');
      let newAnimal;
      do {
        const randomOffset = Math.floor(Math.random() * 1000);
        const taxon = specificTaxon || iconicTaxa[Math.floor(Math.random() * iconicTaxa.length)].name;
        const response = await fetch(`https://api.inaturalist.org/v1/observations?per_page=1&order=desc&order_by=created_at&has[]=photos&offset=${randomOffset}&iconic_taxa=${taxon}`);
        const data = await response.json();
        console.log(data);
        if (data.results && data.results.length > 0) {
          newAnimal = data.results[0];
          console.log('New animal fetched:', newAnimal);
        } else {
          throw new Error('No animals found');
        }
      } while (newAnimal.id === currentId);
      
      animal = newAnimal;
      currentId = animal.id;
      console.log('Animal updated:', animal.id);
    } catch (e) {
      error = e.message || 'An unknown error occurred';
      console.error('Error:', error);
    } finally {
      loading = false;
    }
  }

  onMount(fetchRandomAnimal);
</script>

<div class="max-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
  <div class="p-4">
    <div class="aspect-square overflow-hidden relative rounded-lg">
      {#if loading}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
          <p class="text-gray-600">Loading...</p>
        </div>
      {:else if error}
        <div class="absolute inset-0 flex items-center justify-center bg-red-100">
          <p class="text-red-500">Error: {error}</p>
        </div>
      {:else if animal}
        <h3 class="absolute top-0 left-0 right-0 text-xl font-semibold p-2 bg-white bg-opacity-75 text-center flex items-center justify-center">
          <span>{animal.taxon?.preferred_common_name || animal.taxon?.name || 'Unknown species'}</span>
        </h3>
        <img 
          src={animal.taxon.default_photo.medium_url} 
          alt={animal.taxon.preferred_common_name || animal.taxon.name || 'Random animal'} 
          class="object-cover w-full h-full cursor-pointer"
          on:click={() => { fetchRandomAnimal(); }}
          on:keydown={(e) => e.key === 'Enter' && fetchRandomAnimal()}
          tabindex="0"
          role="button"
          aria-label="Get another animal"
        >
      {:else}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
          <p class="text-gray-600">No animal image found</p>
        </div>
      {/if}
    </div>
  </div>
  
  <div class="px-4 py-3 bg-gray-100">
    <button 
      on:click={() => { fetchRandomAnimal(); }}
      class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
      disabled={loading}
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
      <span>{loading ? 'Loading...' : `Get another ${taxoName}`}</span>
    </button>
  </div>
</div>
