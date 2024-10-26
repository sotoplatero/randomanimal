<script lang="ts">
  import { page } from '$app/stores';
  import AnimalDisplay from '$lib/components/AnimalDisplay.svelte';
  import { regions } from '$lib/regions';
  import { onMount } from 'svelte';

  let region: string;
  let placeId: string;

  onMount(() => {
    region = $page.params.region;
    const selectedRegion = regions.find(r => r.name.toLowerCase().replace(' ', '-') === region);
    placeId = selectedRegion ? selectedRegion.id : '';
  });
</script>

<svelte:head>
  <title>Animals in {region}</title>
</svelte:head>

<h1 class="text-3xl font-bold mb-4">Animals in {region}</h1>

<AnimalDisplay region={placeId} />
