<script setup lang="ts">
import PostGrid from '~/components/sections/PostGrid.vue'

const articleItems = [
  {
    title: 'Strategy basics for early turns',
    description: 'How to open stronger and stay flexible.',
    to: '/articles/strategy-basics'
  }
]
</script>

<template>
  <div>
    <h1>Articles</h1>
    <PostGrid heading="Guides and analysis" :items="articleItems" />
  </div>
</template>
