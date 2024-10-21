<script lang="ts">
  import { page } from '$app/stores';

  export let title: string;
  export let description: string;
  export let type: string = 'website';
  export let image: string = '/og-image.jpg'; // Asegúrate de tener esta imagen en tu carpeta static
</script>

<svelte:head>
  <title>{title} | Random Animal Viewer</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={`https://yourdomain.com${$page.url.pathname}`} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={`https://yourdomain.com${image}`} />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content={`https://yourdomain.com${$page.url.pathname}`} />
  <meta property="twitter:title" content={title} />
  <meta property="twitter:description" content={description} />
  <meta property="twitter:image" content={`https://yourdomain.com${image}`} />
</svelte:head>
