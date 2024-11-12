<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';
  
    export let taxoName: string = 'dog'; // 'dog' or 'animal'
  
    let animal: { imageUrl: string, name: string } | null = null;
    let loading: boolean = false;
    let toastMessage: string | null = null;
    let lastRequestTime: number = 0;
    let animalCache: { imageUrl: string, name: string }[] = [];
    const minRequestInterval: number = 1000;
    const CACHE_SIZE = 2;
  
    let confetti: any;
  
    onMount(async () => {
      if (browser) {
        confetti = (await import('canvas-confetti')).default;
        // Load the initial set of animals
        fetchAnimals();
      }
    });
  
    function showToast(message: string) {
      toastMessage = message;
      setTimeout(() => {
        toastMessage = null;
      }, 3000);
    }
  
    async function fetchAnimals() {
      try {
        console.log('Fetching new animals...');
  
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < minRequestInterval) {
          await new Promise(resolve => setTimeout(resolve, minRequestInterval - timeSinceLastRequest));
        }
  
        let newAnimals = [];
  
        if (taxoName === 'dog') {
          // Fetch from Dog API
          const response = await fetch('https://dog.ceo/api/breeds/image/random/2');
          if (response.ok) {
            const data = await response.json();
            newAnimals = data.message.map((imageUrl: string) => ({
              imageUrl,
              name: 'Dog'
            }));
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        } else {
          // Fetch from iNaturalist API for other animals
          const timestamp = new Date().getTime();
          const response = await fetch(
            `https://api.inaturalist.org/v1/observations?per_page=2&order=asc&order_by=id&iconic_taxa=${taxoName}&has[]=photos&_=${timestamp}`
          );
  
          if (response.ok) {
            const data = await response.json();
            newAnimals = data.results.map((item: any) => ({
              imageUrl: item.taxon.default_photo.medium_url,
              name: item.taxon.preferred_common_name || item.taxon.name || 'Unknown species'
            }));
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }
  
        lastRequestTime = Date.now();
  
        // Preload images and update cache
        for (const animal of newAnimals) {
          const img = new Image();
          img.src = animal.imageUrl;
          await new Promise((resolve) => img.onload = resolve);
        }
  
        animalCache = [...animalCache, ...newAnimals].slice(-CACHE_SIZE);
        console.log('Updated cache:', animalCache);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        console.error('Error:', errorMessage);
        showToast(errorMessage);
      }
    }
  
    async function showNextAnimal() {
      if (animalCache.length === 0) {
        loading = true;
        await fetchAnimals();
      }
  
      if (animalCache.length > 0) {
        const nextAnimal = animalCache.shift();
        animal = nextAnimal;
        
        // Show confetti effect if in browser
        if (browser && confetti) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      }
  
      loading = false;
      
      // Fetch more animals if cache is getting low
      if (animalCache.length < CACHE_SIZE) {
        fetchAnimals();
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
              src={animal.imageUrl} 
              alt={animal.name} 
              class="object-cover w-full h-full cursor-pointer"
              tabindex="0"
              role="button"
              aria-label="Get another animal"
            >
            <h3 class="absolute bottom-0 left-0 right-0 text-2xl sm:text-3xl font-semibold py-2 sm:py-3 px-8 bg-black text-white bg-opacity-75 text-center flex items-center justify-center leading-tight">
              <span>{animal.name}</span>
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
        on:click={showNextAnimal}
        class="btn btn-primary btn-lg w-full text-white capitalize"
        disabled={loading}
        data-umami-event="random"
      >
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
  