<script setup>
defineOptions({
  name: 'AppErrorPage'
})

defineProps({
  error: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section>
    <h1>Something went wrong</h1>
    <p v-if="error?.statusCode">Error {{ error.statusCode }}</p>
    <p>{{ error?.statusMessage || 'Unexpected error' }}</p>
    <NuxtLink to="/">Back to home</NuxtLink>
  </section>
</template>
