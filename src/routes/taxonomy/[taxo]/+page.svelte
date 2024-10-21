<script lang="ts">
  import { page } from '$app/stores';
  import AnimalDisplay from '$lib/components/AnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import { getTaxonEmoji } from '$lib/utils/taxonUtils';

  $: taxo = $page.params.taxo;
  $: taxoEmoji = getTaxonEmoji(taxo);
</script>

<SEO 
  title={`${taxoEmoji} Random ${taxo} Animal`}
  description={`Discover random animals from the ${taxo} taxonomy. Learn about different ${taxo} species with our interactive animal viewer.`}
/>

<h1 class="text-2xl font-bold mb-4 flex items-center justify-center">
  <span class="mr-2">{taxoEmoji}</span>
  <span>Random {taxo} Animal</span>
</h1>

<AnimalDisplay taxoName={taxo} specificTaxon={taxo} />
