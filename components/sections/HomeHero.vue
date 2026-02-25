<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <section class="home-hero">
    <p class="home-hero__eyebrow">Fan-Made Reference</p>
    <h1 class="home-hero__title">{{ title }}</h1>
    <p class="home-hero__subtitle">{{ subtitle }}</p>
  </section>
</template>

<style scoped>
.home-hero {
  padding: 2rem 0 1rem;
}

.home-hero__eyebrow {
  margin: 0;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--sand-200);
  font-size: 0.75rem;
}

.home-hero__title {
  margin: 0.5rem 0;
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
}

.home-hero__subtitle {
  margin: 0;
  max-width: 64ch;
  color: var(--sand-200);
}
</style>
