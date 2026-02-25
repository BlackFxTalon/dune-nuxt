<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || '')

const { data: leader } = await useAsyncData(`leader:${slug}`, () => $fetch(`/api/leaders/${slug}`))

if (!leader.value) {
  throw createError({ statusCode: 404, statusMessage: 'Leader not found' })
}
</script>

<template>
  <article>
    <h1>{{ leader?.title }}</h1>
    <p>Set: {{ leader?.set }}</p>
    <p>Difficulty: {{ leader?.difficulty }}</p>
    <p>Faction: {{ leader?.faction?.join(', ') }}</p>
    <p>{{ leader?.ability || 'Ability description coming soon.' }}</p>
  </article>
</template>
