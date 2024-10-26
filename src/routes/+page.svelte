<script lang="ts">
  import AnimalDisplay from '$lib/components/AnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import { iconicTaxa } from '$lib/iconicTaxa';


</script>

<SEO 
  title="Random Animal Viewer"
  description="Discover random animals from various taxonomies. Learn about different species with our interactive animal viewer."
/>

<h1 class="text-3xl font-bold mb-8 text-center">Random Animal Generator</h1>

<AnimalDisplay />

<p class="text-center mt-8">
  Generate Random Animals Instantly with Our Fun and Interactive Random Animal Generator! Discover unique wildlife facts and images at the click of a button.
</p>

<Taxonomy {iconicTaxa} />


