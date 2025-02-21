<script lang="ts">
  import AnimalDisplay from '$lib/components/AnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import RegionDisplay from '$lib/components/RegionDisplay.svelte';
  import { iconicTaxa } from '$lib/iconicTaxa';

</script>

<SEO 
  title="Random Animal Generator"
  description="Discover random animals from various taxonomies and regions. Learn about different species with our interactive animal viewer."
/>

<h1 class="text-3xl font-bold mb-4 text-center">Random Animal Generator</h1>

<AnimalDisplay />

<p class="text-center mt-4">
  Generate a Random Animal Instantly! Explore fascinating species from the animal kingdom, with interesting facts and captivating images at your fingertips.
</p>

<Taxonomy {iconicTaxa} />

