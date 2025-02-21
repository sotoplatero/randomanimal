<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';
    import { fetchAnimals, type Animal } from '$lib/fetchanimals';
  
    export let taxoName: string = 'animal';
  
    let animal: Animal | null = null;
    let loading: boolean = false;
    let toastMessage: string | null = null;
    let lastRequestTime: number = 0;
    let animalCache: Animal[] = [];
    const minRequestInterval: number = 1000;
    const CACHE_SIZE = 5;
    let previousTaxoName: string = 'animal';
  
    let confetti: any;
  
    $: if (taxoName !== previousTaxoName) {
      previousTaxoName = taxoName;
      animal = null;
      animalCache = [];
      if (browser) {
        loadAnimals();
      }
    }
  
    onMount(async () => {
      if (browser) {
        confetti = (await import('canvas-confetti')).default;
        await loadAnimals();
        showNextAnimal(); // Display the first animal after loading
      }
    });
  
    function showToast(message: string) {
      toastMessage = message;
      setTimeout(() => {
        toastMessage = null;
      }, 3000);
    }
  
    async function loadAnimals() {
      try {
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
  
        if (timeSinceLastRequest < minRequestInterval) {
          await new Promise((resolve) => setTimeout(resolve, minRequestInterval - timeSinceLastRequest));
        }
  
        const newAnimals = await fetchAnimals(taxoName);
        lastRequestTime = Date.now();
  
        const uniqueAnimals = newAnimals.filter(
          (newAnimal) => !animalCache.some((cachedAnimal) => cachedAnimal.id === newAnimal.id)
        );
  
        for (const newAnimal of uniqueAnimals) {
          const img = new Image();
          img.src = newAnimal.taxon.default_photo.medium_url;
          await new Promise((resolve) => (img.onload = resolve));
        }
  
        animalCache = [...animalCache, ...uniqueAnimals];
        console.log('Updated cache:', animalCache);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        console.error('Error:', errorMessage);
        showToast(errorMessage);
      }
    }
  
    function showNextAnimal() {
      if (animalCache.length === 0) {
        loading = true;
        loadAnimals().then(() => {
          if (animalCache.length > 0) {
            animal = animalCache.shift()!;
            loading = false;
          }
        });
      } else {
        animal = animalCache.shift()!;
  
        // if (browser && confetti) {
        //   confetti({
        //     particleCount: 100,
        //     spread: 70,
        //     origin: { y: 0.6 },
        //   });
        // }
  
        if (animalCache.length < 3) {
          loadAnimals();
        }
      }
    }
  </script>
  
  <div class="max-full mx-auto bg-white rounded-lg overflow-hidden">
      <div class="">
        <button 
          on:click={showNextAnimal} 
          class="aspect-square overflow-hidden relative rounded-lg w-full" 
          data-umami-event="random"
          disabled={loading}
        >
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
      
      <!-- <div class="mt-2">
        <button 
          on:click={showNextAnimal}
          class="btn btn-primary btn-lg w-full text-white capitalize"
          disabled={loading}
          data-umami-event="random"
        >
          <svg class="size-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
          </svg>
          <span>{loading ? 'Loading...' : `Random ${taxoName}`}</span>
        </button>
      </div> -->
    </div>
  
  <!-- {#if toastMessage}
      <div 
        class="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg"
        transition:fade
      >
        {toastMessage}
      </div>
  {/if} -->
  