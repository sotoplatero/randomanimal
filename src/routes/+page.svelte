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
  <h1 class="text-4xl font-bold text-center mb-4">Random Animal Generator</h1>
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

<!-- Ideas y Consejos para Usar el Random Animal Generator -->
<section class="mt-12">
  <h2 class="text-2xl font-bold mb-4 text-center">Ideas & Tips for Using the Random Animal Generator</h2>
  <p class="text-center text-gray-600 mb-6">
    Discover creative ways to make the most out of our Random Animal Generator!
  </p>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-lg font-semibold">🔍 Learn New Animal Facts</h3>
      <p>Use the generator to explore unique species and expand your knowledge of wildlife.</p>
    </div>
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-lg font-semibold">📚 Educational Tool</h3>
      <p>Teachers and parents can use it as a fun way to introduce kids to biodiversity and nature.</p>
    </div>
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-lg font-semibold">🎨 Get Inspired for Art</h3>
      <p>Artists and designers can use random animals as creative inspiration for their projects.</p>
    </div>
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-lg font-semibold">🎮 Create a Challenge</h3>
      <p>Try to draw the animal before seeing its image, then compare it to the real one!</p>
    </div>
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-lg font-semibold">🧩 Animal Trivia Game</h3>
      <p>Test your knowledge by guessing an animal’s habitat, diet, or classification before revealing details.</p>
    </div>
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-lg font-semibold">🌍 Support Wildlife Conservation</h3>
      <p>Learn about endangered species and find ways to contribute to their conservation efforts.</p>
    </div>
  </div>
</section>

<!-- FAQ Section - Expanded -->
<section class="mt-12">
  <h2 class="text-2xl font-bold mb-4 text-center">Frequently Asked Questions</h2>
  <div class="space-y-4">
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">How does the Random Animal Generator work?</summary>
      <p class="mt-2">Our tool selects a random animal from a database of thousands of species and provides images and key information.</p>
    </details>
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">Can I filter animals by type?</summary>
      <p class="mt-2">Yes! Use the taxonomy filters to view specific categories like mammals, reptiles, birds, amphibians, and more.</p>
    </details>
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">Where do the animal images and data come from?</summary>
      <p class="mt-2">We use the iNaturalist API to source high-quality images and reliable animal data from global contributors.</p>
    </details>
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">Is the animal selection truly random?</summary>
      <p class="mt-2">Yes! Every time you generate an animal, our system picks one randomly from our extensive database without repetition bias.</p>
    </details>
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">Can I save or share the animals I discover?</summary>
      <p class="mt-2">Yes! Each generated animal has a unique link that you can copy and share with friends.</p>
    </details>
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">Can I suggest new animals to be added?</summary>
      <p class="mt-2">We are always updating our database! If you have an animal suggestion, feel free to contact us.</p>
    </details>
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">Does this generator include extinct or mythical animals?</summary>
      <p class="mt-2">Currently, we only feature real, living species. However, we may add an extinct species category in the future.</p>
    </details>
    <details class="p-4 border rounded-lg shadow">
      <summary class="font-semibold cursor-pointer">Can I use this tool for educational purposes?</summary>
      <p class="mt-2">Absolutely! Many educators and students use this generator to learn about animals in an interactive way.</p>
    </details>
  </div>
</section>
