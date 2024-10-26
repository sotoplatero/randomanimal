<script lang="ts">
  import { onMount } from 'svelte';
  import { taxonKeys } from '$lib/taxos';

  export let taxoName: string | undefined = undefined;
  export let countryCode: string | undefined = undefined;

  let animal: any = null;
  let loading: boolean = true;
  let error: string | null = null;

  async function fetchRandomAnimal() {
    try {
      loading = true;
      error = null;

      const baseUrl = 'https://api.gbif.org/v1/occurrence/search';
      let taxonKey: string;
      let selectedTaxon: typeof taxonKeys[0];

      if (taxoName) {
        selectedTaxon = taxonKeys.find(taxon => taxon.name.toLowerCase() === taxoName.toLowerCase());
      }

      if (!selectedTaxon) {
        // Si no se especifica taxoName o no se encuentra, selecciona uno aleatorio
        selectedTaxon = taxonKeys[Math.floor(Math.random() * taxonKeys.length)];
      }

      taxonKey = selectedTaxon.id.toString();
      taxoName = selectedTaxon.name; // Actualiza taxoName para reflejar el taxón seleccionado

      const params = new URLSearchParams({
        limit: '1',
        offset: Math.floor(Math.random() * 1000).toString(),
        mediaType: 'StillImage',
        taxonKey: taxonKey,
      });

      if (countryCode) {
        params.append('country', countryCode);
      }

      const url = `${baseUrl}?${params.toString()}`;
      console.log('Fetching from GBIF:', url);

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('GBIF response:', data);

      if (data.results && data.results.length > 0) {
        animal = data.results[0];
        console.log('New animal fetched:', animal);
      } else {
        throw new Error('No animals found');
      }
    } catch (e) {
      error = e instanceof Error ? e.message : 'An unknown error occurred';
      console.error('Error:', error);
    } finally {
      loading = false;
    }
  }

  onMount(fetchRandomAnimal);
</script>

<div class="max-full mx-auto bg-white rounded-lg overflow-hidden">
  <div class="">
    <div class="aspect-[4/3] overflow-hidden relative rounded-lg">
      {#if loading}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
          <p class="text-gray-600">Loading...</p>
        </div>
      {:else if error}
        <div class="absolute inset-0 flex items-center justify-center bg-red-100">
          <p class="text-red-500">Error: {error}</p>
        </div>
      {:else if animal}
        <h3 class="absolute bottom-0 left-0 right-0 text-2xl md:text-4xl font-semibold py-4 px-8 bg-white bg-opacity-75 text-center flex items-center justify-center">
          <span>{animal.species || animal.genus || 'Unknown species'}</span>
        </h3>
        {#if animal.media && animal.media.length > 0}
          <img 
            src={animal.media[0].identifier} 
            alt={animal.species || animal.genus || 'Random animal'} 
            class="object-cover w-full h-full cursor-pointer"
            on:click={fetchRandomAnimal}
            on:keydown={(e) => e.key === 'Enter' && fetchRandomAnimal()}
            tabindex="0"
            role="button"
            aria-label="Get another animal"
          >
        {:else}
          <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p class="text-gray-600">No image available</p>
          </div>
        {/if}
      {:else}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
          <p class="text-gray-600">No animal data found</p>
        </div>
      {/if}
    </div>
  </div>
  
  <div class="mt-2">
    <button 
      on:click={fetchRandomAnimal}
      class="btn btn-primary btn-lg w-full text-white"
      disabled={loading}
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
      <span>{loading ? 'Loading...' : `Get another`}</span>
    </button>
  </div>
</div>
