<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Contact Random Animal"
  description="Contact Random Animal to learn more about our services and how we can help you."
/>
<section class="hero">

  <div class="hero-content flex-col text-center">
    <div class="max-w-md">
      <h2 class="text-5xl font-bold">Get in Touch</h2>
      <p class="py-6">
        Fill out the form below and we'll get back to you as soon as possible.
      </p>
    </div>

  <form class="card flex-shrink-0 w-full max-w-lg bg-base-100" action="https://api.web3forms.com/submit" method="POST">
    <div class="card-body">
      <input type="hidden" name="access_key" value="0918522e-5af2-4c6f-b173-e00aea51b53c" />
      <input type="hidden" name="subject" value="New Contact Form Submission from Web3Forms" />
      <input type="hidden" name="from_name" value="RandomAnimal" />
      <!-- More customization options available in the docs: https://docs.web3forms.com -->

      <div class="form-control">
        <label class="label" for="name">
          <span class="label-text">Name</span>
        </label>
        <input id="name" name="name" type="text" placeholder="Your name" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label" for="email">
          <span class="label-text">Email</span>
        </label>
        <input id="email" name="email" type="email" placeholder="Your email" class="input input-bordered" />
      </div>

      <div class="form-control">
        <label class="label" for="message">
          <span class="label-text">Message</span>
        </label>
        <textarea id="message" name="message" class="textarea textarea-bordered h-24" placeholder="Your message"></textarea>
      </div>

      <div class="form-control mt-6">
        <button class="btn btn-primary" type="submit">Send Message</button>
      </div>
    </div>
    </form>
  </div>
</section>
