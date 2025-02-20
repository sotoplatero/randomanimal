<script lang="ts">
  import { page } from '$app/stores';
  import EnhancedAnimalDisplay from '$lib/components/EnhancedAnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import { getTaxonEmoji } from '$lib/utils/taxonUtils';
  import { iconicTaxa } from '$lib/iconicTaxa';
  $: taxo = $page.params.taxo;
  $: taxoEmoji = getTaxonEmoji(taxo);

</script>

<SEO 
  title={`Random ${taxo} Animal Generator`}
  description={`${taxoEmoji} Discover random animals from the ${taxo} taxonomy. Learn about different ${taxo} species with our interactive animal viewer.`}
/>

<h1 class="text-lg md:text-2xl font-bold mb-4 flex items-center justify-center capitalize">
  <span class="text-2xl md:text-3xl mr-2">{taxoEmoji}</span>
  <span>Random {taxo} Animal</span>
</h1>

<EnhancedAnimalDisplay taxoName={taxo} />

<p class="text-center mt-4">
  Generate a Random {taxo} Animal Instantly! Explore fascinating species from the {taxo} category, with interesting facts and captivating images at your fingertips.
</p>

<Taxonomy iconicTaxa={iconicTaxa} />
