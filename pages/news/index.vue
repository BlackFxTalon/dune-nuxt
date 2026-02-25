<script setup lang="ts">
import PostGrid from '~/components/sections/PostGrid.vue'

const newsItems = [
  {
    title: 'Welcome to the Dune Imperium fan site',
    description: 'Project launch news and roadmap highlights.',
    to: '/news/welcome'
  }
]
</script>

<template>
  <div>
    <h1>News</h1>
    <PostGrid heading="Latest updates" :items="newsItems" />
  </div>
</template>
