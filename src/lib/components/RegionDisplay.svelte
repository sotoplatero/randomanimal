<script lang="ts">
  import { regions } from '$lib/regions';
</script>

<h2 class="text-xl font-semibold mt-8 mb-4 text-center">Explore by Region</h2>
<div class="grid grid-cols-2 gap-4">
  {#each regions as { name, emoji }}
    <a href="/country/{name.toLowerCase().replace(' ', '-')}" class="btn btn-lg">
      <span class="text-2xl mr-2">{emoji}</span>
      <span>{name}</span>
    </a>
  {/each}
</div>
