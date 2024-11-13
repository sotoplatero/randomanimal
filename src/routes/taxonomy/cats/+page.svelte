<script lang="ts">
  import RandomCat from '$lib/components/RandomCat.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import { iconicTaxa } from '$lib/iconicTaxa';
  import AffiliateLinks from '$lib/components/AffiliateLinks.svelte';

  $: taxoEmoji = iconicTaxa.find(t => t.name.toLowerCase() === 'cats')?.emoji || '🦁';

</script>

<SEO 
  title={`Random Cat Generator`}
  description={`${taxoEmoji} Discover random cats. Learn about different cat breeds with our interactive cat viewer.`}
/>

<h1 class="text-lg md:text-2xl font-bold mb-4 flex items-center justify-center capitalize">
  <span class="text-2xl md:text-3xl mr-2">{taxoEmoji}</span>
  <span>Random Cat</span>
</h1>

<RandomCat />

<AffiliateLinks />

<p class="text-center mt-8">
  Generate a Random Cat Instantly! Explore fascinating species from the Cat category, with interesting facts and captivating images at your fingertips.
</p>

<Taxonomy iconicTaxa={iconicTaxa} />
