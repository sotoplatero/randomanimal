<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { iconicTaxa } from '$lib/utils/taxonUtils';
  import confetti from 'canvas-confetti';

  export let taxoName: string = 'animal';
  export let specificTaxon: string | null = null;

  let animal: any = null;
  let newAnimal: any = null;
  let loading: boolean = true;
  let toastMessage: string | null = null;
  let lastRequestTime: number = 0;
  const minRequestInterval: number = 1000; // 1 segundo entre solicitudes

  function showToast(message: string) {
    toastMessage = message;
    setTimeout(() => {
      toastMessage = null;
    }, 3000);
  }

  async function fetchRandomAnimal() {
    try {
      loading = true;
      console.log('Fetching new animal...');

      // Implementar retraso para evitar solicitudes demasiado frecuentes
      const now = Date.now();
      const timeSinceLastRequest = now - lastRequestTime;
      if (timeSinceLastRequest < minRequestInterval) {
        await new Promise(resolve => setTimeout(resolve, minRequestInterval - timeSinceLastRequest));
      }

      const taxon = specificTaxon || iconicTaxa[Math.floor(Math.random() * iconicTaxa.length)].name;
      const timestamp = new Date().getTime();
      
      // Primero, obtenemos el ID máximo para el taxón
      let maxIdUrl = `https://api.inaturalist.org/v1/observations?per_page=1&order=desc&order_by=id&iconic_taxa=${taxon}&_=${timestamp}`;
      const maxIdResponse = await fetch(maxIdUrl);
      const maxIdData = await maxIdResponse.json();
      
      if (!maxIdData.results || maxIdData.results.length === 0) {
        throw new Error('No animals found for this taxon');
      }
      
      const maxId = maxIdData.results[0].id;
      const randomId = Math.floor(Math.random() * maxId);
      
      // Ahora, obtenemos un animal aleatorio usando id_above
      let url = `https://api.inaturalist.org/v1/observations?per_page=1&order=asc&order_by=id&id_above=${randomId}&iconic_taxa=${taxon}&has[]=photos&_=${timestamp}`;
      console.log(url);

      const response = await fetch(url);
      lastRequestTime = Date.now();

      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.results && data.results.length > 0) {
        newAnimal = data.results[0];
        if (newAnimal.id !== animal?.id) {
          // Preload the new image
          const img = new Image();
          img.src = newAnimal.taxon.default_photo.medium_url;
          img.onload = () => {
            animal = newAnimal;
            console.log('New animal fetched:', animal);
            // Trigger confetti effect
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            loading = false;
          };
        } else {
          console.log('Same animal fetched, retrying...');
          await fetchRandomAnimal();
        }
      } else {
        throw new Error('No animals found');
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
      console.error('Error:', errorMessage);
      showToast(errorMessage);
      loading = false;
    }
  }

  onMount(fetchRandomAnimal);
</script>

<div class="max-full mx-auto bg-white rounded-lg overflow-hidden">
  <div class="">
    <button on:click={fetchRandomAnimal} class="aspect-[4/3] overflow-hidden relative rounded-lg w-full">
      {#if animal}
          <img 
          in:fade={{ duration: 600 }}
            src={animal.taxon.default_photo.medium_url} 
            alt={animal.taxon.preferred_common_name || animal.taxon.name || 'Random animal'} 
            class="object-cover w-full h-full cursor-pointer"
            tabindex="0"
            role="button"
            aria-label="Get another animal"
          >
          <h3 class="absolute bottom-0 left-0 right-0 text-2xl sm:text-3xl font-semibold py-2 sm:py-3 px-8 bg-black text-white bg-opacity-75 text-center flex items-center justify-center leading-tight">
            <span>{animal.taxon?.preferred_common_name || animal.taxon?.name || 'Unknown species'}</span>
          </h3>
      {:else}
        <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
          <p class="text-gray-600">Loading initial animal...</p>
        </div>
      {/if}
    </button>
  </div>
  
  <div class="mt-2">
    <button 
      on:click={fetchRandomAnimal}
      class="btn btn-primary btn-lg w-full text-white capitalize"
      disabled={loading}
    >
      <svg class="size-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
      </svg>
      <span>{loading ? 'Loading...' : `Random ${taxoName}`}</span>
    </button>
  </div>
</div>

{#if toastMessage}
  <div 
    class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg"
    transition:fade
  >
    {toastMessage}
  </div>
{/if}
