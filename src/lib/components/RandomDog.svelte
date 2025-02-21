<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';
  
    export let taxoName: string = 'dogs';
  
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
        await fetchDogs(); // Cargar el primer conjunto de perros
        showNextAnimal();  // Mostrar el primer perro cargado
      }
    });
  
    function showToast(message: string) {
      toastMessage = message;
      setTimeout(() => {
        toastMessage = null;
      }, 3000);
    }
  
    async function fetchDogs() {
      try {
        console.log('Fetching new dogs...');
  
        const now = Date.now();
        const timeSinceLastRequest = now - lastRequestTime;
        if (timeSinceLastRequest < minRequestInterval) {
          await new Promise(resolve => setTimeout(resolve, minRequestInterval - timeSinceLastRequest));
        }
  
        const response = await fetch('https://dog.ceo/api/breeds/image/random/2');
        lastRequestTime = Date.now();
  
        if (response.status === 429) {
          throw new Error('Rate limit exceeded. Please try again later.');
        }
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('API response:', data);
  
        if (data.message && data.message.length > 0) {
          // Preload images and add to cache
          const newDogs = data.message.map((imageUrl: string) => ({
            imageUrl,
            name: 'Dog'
          }));
  
          for (const dog of newDogs) {
            const img = new Image();
            img.src = dog.imageUrl;
            await new Promise((resolve) => {
              img.onload = resolve;
            });
          }
  
          animalCache = [...animalCache, ...newDogs].slice(-CACHE_SIZE);
          console.log('Updated cache:', animalCache);
  
          // Asignar el primer animal de animalCache a animal para mostrarlo inmediatamente
          if (!animal && animalCache.length > 0) {
            animal = animalCache.shift()!;
          }
        } else {
          throw new Error('No dogs found');
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        console.error('Error:', errorMessage);
        showToast(errorMessage);
      }
    }
  
    async function showNextAnimal() {
      if (animalCache.length === 0) {
        loading = true;
        await fetchDogs();
      }
  
      if (animalCache.length > 0) {
        const nextAnimal = animalCache.shift();
        animal = nextAnimal;
        
        // Show confetti effect if in browser
        // if (browser && confetti) {
        //   confetti({
        //     particleCount: 100,
        //     spread: 70,
        //     origin: { y: 0.6 }
        //   });
        // }
      }
  
      loading = false;
      
      // Fetch more dogs if cache is getting low
      if (animalCache.length < CACHE_SIZE) {
        fetchDogs();
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
            aria-label="Get another dog"
          >
        {:else}
          <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p class="text-gray-600">Loading initial dog...</p>
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
        <span>{loading ? 'Loading...' : 'Random Dog'}</span>
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
  