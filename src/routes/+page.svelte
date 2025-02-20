<script lang="ts">
  import EnhancedAnimalDisplay from '$lib/components/EnhancedAnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import RegionDisplay from '$lib/components/RegionDisplay.svelte';
  import { iconicTaxa } from '$lib/iconicTaxa';

</script>

<SEO 
  title="Enhanced Random Animal Viewer"
  description="Discover random animals, dogs, and cats! Explore fascinating species with our interactive animal viewer featuring various breeds and species."
/>

<h1 class="text-3xl font-bold mb-4 text-center">Enhanced Animal Generator</h1>

<EnhancedAnimalDisplay />

<p class="text-center mt-4">
  Generate Random Animals, Dogs, and Cats Instantly! Explore fascinating species and breeds with interesting facts and captivating images at your fingertips.
</p>

<Taxonomy {iconicTaxa} />
