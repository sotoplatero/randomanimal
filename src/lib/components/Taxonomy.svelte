<script>
  export let iconicTaxa
  let taxos = iconicTaxa.sort((a, b) => a.name.localeCompare(b.name));
</script>
<h2 class="text-xl font-semibold mt-8 mb-4 text-center">View by Taxonomy</h2>
<div class="grid grid-cols-2 gap-4">
  {#each taxos as { name, emoji }}
    <a href="/taxonomy/{name.toLowerCase()}" class="btn sm:btn-lg flex items-center justify-between !px-3">
      <div>
        <span class="text-lg sm:text-xl mr-1">{emoji}</span>
        <span class="text-sm sm:text-base">{name}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </a>
  {/each}
</div>   