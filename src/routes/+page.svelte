<script lang="ts">
  import EnhancedAnimalDisplay from '$lib/components/EnhancedAnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import Species from '$lib/components/Species.svelte';
  import { iconicTaxa } from '$lib/iconicTaxa';
</script>

<SEO 
  title="Enhanced Random Animal Viewer"
  description="Discover random animals, dogs, and cats! Explore fascinating species with our interactive animal viewer featuring various breeds and species."
/>

<div class="container mx-auto px-4 py-8">
  <h1 class="text-4xl font-bold text-center mb-4">Enhanced Animal Generator</h1>
  <p class="text-center text-gray-600 mb-8">
    Generate Random Animals, Dogs, and Cats Instantly! Explore fascinating species and breeds with interesting facts and captivating images at your fingertips.
  </p>

  <EnhancedAnimalDisplay />

  <section class="mt-12"> 
    <h2 class="text-2xl font-bold mb-4 text-center">Random Animal by Taxonomy</h2>
    <Taxonomy {iconicTaxa} />
  </section>

  <section class="mt-12"> 
    <h2 class="text-2xl font-bold mb-4 text-center">Random Animal by Species</h2>
    <Species />
  </section>
</div>
