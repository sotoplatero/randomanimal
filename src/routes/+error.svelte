<script>
    import { page } from '$app/stores';
</script>

<div class="flex h-[calc(100vh-9rem)] flex-col items-center justify-center gap-4 text-center px-4">
    <div class="text-6xl">
        🦝
    </div>
    <h1 class="text-4xl font-bold">
        {$page.status}: {$page.error?.message}
    </h1>
    <p class="text-xl">Sorry, something went wrong.</p>
        <a
        href="/"
        class="rounded-lg bg-primary px-4 py-2 text-primary-content hover:bg-primary-focus"
    >
        Back to home
    </a>
</div> 