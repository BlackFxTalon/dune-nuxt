<script setup lang="ts">
const route = useRoute()
const slug = String(route.params.slug || '')

const { data: house } = await useAsyncData(`house:${slug}`, () => $fetch(`/api/houses/${slug}`))

if (!house.value) {
  throw createError({ statusCode: 404, statusMessage: 'House not found' })
}
</script>

<template>
  <article>
    <h1>{{ house?.title }}</h1>
    <p>Set: {{ house?.set }}</p>
    <p>{{ house?.motto }}</p>
    <p>{{ house?.summary }}</p>
  </article>
</template>
