<script>
  export let iconicTaxa
</script>
<h2 class="text-xl font-semibold mt-8 mb-4 text-center">View by Taxonomy</h2>
<div class="grid grid-cols-2 gap-4">
  {#each iconicTaxa as { name, emoji }}
    <a href="/taxonomy/{name.toLowerCase()}" class="btn sm:btn-lg">
      <span class="text-lg sm:text-2xl">{emoji}</span>
      <span cl>{name}</span>
    </a>
  {/each}
</div>   