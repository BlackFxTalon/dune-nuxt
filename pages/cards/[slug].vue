<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || '')

const { data: card, error } = await useAsyncData(`card:${slug}`, () => $fetch(`/api/cards/${slug}`))

if (!card.value) {
  throw createError({ statusCode: 404, statusMessage: 'Card not found' })
}
</script>

<template>
  <article>
    <h1>{{ card?.title }}</h1>
    <p>Set: {{ card?.set }}</p>
    <p>Cost: {{ card?.cost }}</p>
    <p>Faction: {{ card?.faction?.join(', ') }}</p>
    <p>{{ card?.text }}</p>
    <p v-if="error">Unable to load card details.</p>
  </article>
</template>
