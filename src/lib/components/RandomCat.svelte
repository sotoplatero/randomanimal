<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { browser } from '$app/environment';
  
    let catImage: { url: string } | null = null;
    let loading: boolean = false;
    let toastMessage: string | null = null;
    const CACHE_SIZE = 2;
    let catCache: { url: string }[] = [];
  
    const CAT_API_KEY = 'TU_API_KEY_AQUI'; // Reemplaza con tu API key de The Cat API
  
    onMount(() => {
      showNextCat(); // Mostrar la primera imagen al montar el componente
    });
  
    function showToast(message: string) {
      toastMessage = message;
      setTimeout(() => {
        toastMessage = null;
      }, 3000);
    }
  
    async function fetchCat() {
      try {
        loading = true;
  
        const response = await fetch('https://api.thecatapi.com/v1/images/search', {
          headers: { 'x-api-key': CAT_API_KEY }
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
  
        if (data && data.length > 0) {
          // Agregar la imagen obtenida al caché
          const newCat = { url: data[0].url };
  
          // Preload the image
          const img = new Image();
          img.src = newCat.url;
          await new Promise((resolve) => {
            img.onload = resolve;
          });
  
          catCache = [...catCache, newCat].slice(-CACHE_SIZE); // Mantener el tamaño máximo del caché
        } else {
          throw new Error('No cats found');
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred';
        console.error('Error:', errorMessage);
        showToast(errorMessage);
      } finally {
        loading = false;
      }
    }
  
    async function showNextCat() {
      if (catCache.length === 0) {
        // Si el caché está vacío, obtenemos nuevas imágenes
        await fetchCat();
      }
      
      // Mostrar la siguiente imagen del caché
      if (catCache.length > 0) {
        catImage = catCache.shift()!; // Elimina la imagen del caché y la asigna a catImage
  
        // Si el caché se queda bajo, anticipar la carga de más imágenes
        if (catCache.length < CACHE_SIZE) {
          fetchCat();
        }
      }
    }
  </script>
  
  <div class="max-full mx-auto bg-white rounded-lg overflow-hidden">
    <div class="">
      <button 
        on:click={showNextCat} 
        class="aspect-square overflow-hidden relative rounded-lg w-full" 
        disabled={loading}
      >
        {#if catImage}
          <img 
            in:fade={{ duration: 600 }}
            src={catImage.url} 
            alt="Random cat" 
            class="object-cover w-full h-full cursor-pointer"
            tabindex="0"
            role="button"
            aria-label="Get another cat"
          >
        {:else}
          <div class="absolute inset-0 flex items-center justify-center bg-gray-200">
            <p class="text-gray-600">Loading initial cat...</p>
          </div>
        {/if}
      </button>
    </div>
    
    <div class="mt-2">
      <button 
        on:click={showNextCat}
        class="btn btn-primary btn-lg w-full text-white capitalize"
        disabled={loading}
      >
        <span>{loading ? 'Loading...' : 'Random Cat'}</span>
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
  