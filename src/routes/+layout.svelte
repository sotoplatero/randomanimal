<script>
  import "../app.css";
</script>

<div class="flex flex-col min-h-screen">
  <div class="w-full max-w-screen-md mx-auto flex-grow py-6">
    <div class="container mx-auto px-4">
      <nav class="mb-8 flex items-center justify-between">
        <div class="flex items-center">
          <a href="/" class="text-xl flex items-center font-bold" title="Random Animal Viewer">
            <span class="text-3xl">🦁</span> RandomAnimal
          </a>
        </div>
      </nav>
      
      <main>
        <slot />
      </main>
    </div>
  </div>

  <footer class="bg-gray-100 mt-8 py-6 text-center">
    <div class="w-full max-w-screen-sm mx-auto px-4">
      <h3 class="text-lg font-semibold mb-4">Random Animal Viewer</h3>
      <p class="text-sm text-gray-600 mb-4">Discover and learn about various animal species from around the world.</p>
      <ul class="flex justify-center space-x-4 mb-4">
        <li><a href="/" class="text-blue-500 hover:text-blue-700">Home</a></li>
        <li><a href="/about" class="text-blue-500 hover:text-blue-700">About</a></li>
        <li><a href="/contact" class="text-blue-500 hover:text-blue-700">Contact</a></li>
      </ul>
      <hr class="my-4">
      <div class="text-xs text-gray-500">
        © 2023 Random Animal Viewer. All rights reserved.
      </div>
    </div>
  </footer>
</div>
