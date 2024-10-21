<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="About Random Animal Viewer"
  description="Learn about Random Animal Viewer and how we use iNaturalist data to showcase diverse animal species from around the world."
/>

<h1 class="text-3xl font-bold mb-6">About Random Animal Viewer</h1>

<div class="space-y-4">
  <p>
    Random Animal Viewer is an educational tool that showcases the incredible diversity of animal life on our planet. Our mission is to inspire curiosity and foster a deeper appreciation for the natural world.
  </p>

  <h2 class="text-2xl font-semibold mt-6 mb-3">How It Works</h2>
  <p>
    We utilize the extensive database of iNaturalist, a joint initiative by the California Academy of Sciences and the National Geographic Society. iNaturalist is a citizen science project and online social network of naturalists, citizen scientists, and biologists built on the concept of mapping and sharing observations of biodiversity across the globe.
  </p>

  <h2 class="text-2xl font-semibold mt-6 mb-3">Our Use of iNaturalist Data</h2>
  <p>
    Random Animal Viewer accesses the iNaturalist API to retrieve random animal observations. This allows us to present a wide variety of species, complete with images and scientific information. By leveraging this vast collection of data, we can offer users a glimpse into the incredible biodiversity that exists in various ecosystems around the world.
  </p>

  <h2 class="text-2xl font-semibold mt-6 mb-3">Acknowledgments</h2>
  <p>
    We are grateful to iNaturalist and its community of observers for making this data available. Their tireless efforts in documenting and sharing observations contribute significantly to our understanding of global biodiversity.
  </p>

  <p>
    To learn more about iNaturalist or to contribute your own observations, visit <a href="https://www.inaturalist.org" class="text-blue-500 hover:text-blue-700">www.inaturalist.org</a>.
  </p>
</div>
