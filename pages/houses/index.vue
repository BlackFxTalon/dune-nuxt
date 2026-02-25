<script setup lang="ts">
const { data: houses, pending, error } = await useAsyncData('houses:list', () => $fetch('/api/houses'))
</script>

<template>
  <div>
    <h1>Houses</h1>
    <p v-if="pending">Loading houses...</p>
    <p v-else-if="error">Failed to load houses.</p>
    <ul v-else>
      <li v-for="house in houses" :key="house.slug">
        <NuxtLink :to="`/houses/${house.slug}`">{{ house.title }}</NuxtLink>
        <span> ({{ house.set }}) </span>
      </li>
    </ul>
  </div>
</template>
