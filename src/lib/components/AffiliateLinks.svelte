<script lang="ts">
  import { affiliates } from '$lib/affiliates';
  import { fade } from 'svelte/transition';

//   const rotateAffiliate = () => currentAffiliateIndex = Math.floor(Math.random() * affiliates.length);

  let currentAffiliateIndex = Math.floor(Math.random() * affiliates.length);

//   setInterval(rotateAffiliate, 10000); // Rotate every 10 seconds
</script>

<div class="p-4 bg-gray-100 rounded-lg shadow my-8 relative">
    <div class="absolute top-1 right-2 text-xs uppercase text-gray-400">Affiliate Link</div>
  <a 
    href={`/go/${affiliates[currentAffiliateIndex].id}`} 
    target="_blank" 
    rel="noopener noreferrer sponsored" 
    class="text-blue-600 hover:underline flex items-center"
    data-umami-event="affiliate"
  >
    <span class="text-2xl mr-2 animate-bell">🎁</span>
    {affiliates[currentAffiliateIndex].name}
  </a>
</div>

<style>
  @keyframes bell {
    0%, 50%, 100% {
      transform: rotate(0deg);
    }
    10%, 30% {
      transform: rotate(-10deg);
    }
    20%, 40% {
      transform: rotate(10deg);
    }
  }

  .animate-bell {
    display: inline-block;
    animation: bell 2s infinite;
  }
</style>
