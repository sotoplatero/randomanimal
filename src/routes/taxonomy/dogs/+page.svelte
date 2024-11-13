<script lang="ts">
  import { page } from '$app/stores';
  import RandomDog from '$lib/components/RandomDog.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import { getTaxonEmoji } from '$lib/utils/taxonUtils';
  import { iconicTaxa } from '$lib/iconicTaxa';
  import AffiliateLinks from '$lib/components/AffiliateLinks.svelte';
  $: taxoEmoji = iconicTaxa.find(t => t.name.toLowerCase() === 'dogs')?.emoji || '🐶';

</script>

<SEO 
  title={`Random Dog Generator`}
  description={`${taxoEmoji} Discover random dogs. Learn about different dog breeds with our interactive dog viewer.`}
/>

<h1 class="text-lg md:text-2xl font-bold mb-4 flex items-center justify-center capitalize">
  <span class="text-2xl md:text-3xl mr-2">{taxoEmoji}</span>
  <span>Random Dog</span>
</h1>

<RandomDog />

<AffiliateLinks />

<p class="text-center mt-8">
  Generate a Random Dog Instantly! Explore fascinating species from the Dog category, with interesting facts and captivating images at your fingertips.
</p>

<Taxonomy iconicTaxa={iconicTaxa} />
