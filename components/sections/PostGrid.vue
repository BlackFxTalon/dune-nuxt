<script setup>
defineProps({
  heading: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section class="post-grid">
    <h2 class="post-grid__heading">{{ heading }}</h2>
    <ul class="post-grid__list">
      <li v-for="item in items" :key="item.to" class="post-grid__item">
        <NuxtLink :to="item.to" class="post-grid__title">
          {{ item.title }}
        </NuxtLink>
        <p class="post-grid__description">{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.post-grid {
  padding: 1rem 0;
}

.post-grid__heading {
  margin: 0 0 1rem;
  font-size: 1.35rem;
}

.post-grid__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.post-grid__item {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1rem;
  background: rgba(15, 17, 21, 0.55);
}

.post-grid__title {
  color: var(--sand-50);
  font-size: 1.05rem;
  font-weight: 700;
}

.post-grid__description {
  margin: 0.5rem 0 0;
  color: var(--sand-200);
}
</style>
