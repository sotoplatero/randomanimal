<script lang="ts">
  import AnimalDisplay from '$lib/components/AnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import RegionDisplay from '$lib/components/RegionDisplay.svelte';
  import { iconicTaxa } from '$lib/iconicTaxa';


</script>

<SEO 
  title="Random Animal Viewer"
  description="Discover random animals from various taxonomies and regions. Learn about different species with our interactive animal viewer."
/>

<h1 class="text-3xl font-bold mb-4 text-center">Welcome to Animal Explorer</h1>

<AnimalDisplay />

<Taxonomy {iconicTaxa} />

