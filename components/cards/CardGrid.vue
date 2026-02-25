<script setup>
defineProps({
  cards: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="card-grid">
    <li v-for="card in cards" :key="card.slug" class="card-grid__item">
      <NuxtLink :to="`/cards/${card.slug}`" class="card-grid__title">
        {{ card.title }}
      </NuxtLink>
      <p class="card-grid__meta">
        Set: {{ card.set }} | Cost: {{ card.cost }} | Faction: {{ card.faction.join(', ') }}
      </p>
      <p class="card-grid__text">{{ card.text || 'No description yet.' }}</p>
    </li>
  </ul>
</template>

<style scoped>
.card-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 1rem;
}

.card-grid__item {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1rem;
  background: rgba(15, 17, 21, 0.45);
}

.card-grid__title {
  font-size: 1.1rem;
  font-weight: 700;
}

.card-grid__meta {
  margin: 0.4rem 0 0.2rem;
  color: var(--sand-200);
  font-size: 0.9rem;
}

.card-grid__text {
  margin: 0.2rem 0 0;
}
</style>
