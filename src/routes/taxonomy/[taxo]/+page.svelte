<script lang="ts">
  import { page } from '$app/stores';
  import AnimalDisplay from '$lib/components/AnimalDisplay.svelte';
  import SEO from '$lib/components/SEO.svelte';
  import Taxonomy from '$lib/components/Taxonomy.svelte';
  import { getTaxonEmoji } from '$lib/utils/taxonUtils';
  import { iconicTaxa } from '$lib/iconicTaxa';

  $: taxo = $page.params.taxo;
  $: taxoEmoji = getTaxonEmoji(taxo);

  const descriptions = (taxo: string) => [
    `Generate a Random ${taxo} Animal Instantly! Explore fascinating species from the ${taxo} category, with interesting facts and captivating images at your fingertips.`,
    `Discover Random ${taxo} Animals with Our Generator! Dive into unique wildlife from the ${taxo} category and uncover fun animal facts and stunning visuals.`,
    `Explore Random ${taxo} Animals Now! Use our generator to learn about different species within the ${taxo} group, complete with engaging facts and vivid images.`
  ][Math.floor(Math.random() * 3)];
</script>

<SEO 
  title={`${taxoEmoji} Random ${taxo} Animal`}
  description={`Discover random animals from the ${taxo} taxonomy. Learn about different ${taxo} species with our interactive animal viewer.`}
/>

<h1 class="text-lg md:text-2xl font-bold mb-4 flex items-center justify-center capitalize">
  <span class="mr-2">{taxoEmoji}</span>
  <span >Random {taxo} Animal Generator</span>
</h1>

{#key $page.params.taxo}
  <AnimalDisplay taxoName={taxo} specificTaxon={taxo} />
{/key}

<p class="text-center mt-8">
  {descriptions(taxo)}
</p>

<Taxonomy iconicTaxa={iconicTaxa} />
