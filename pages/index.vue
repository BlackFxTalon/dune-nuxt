<script setup lang="ts">
import HomeHero from '~/components/sections/HomeHero.vue'
import PostGrid from '~/components/sections/PostGrid.vue'

const latestPosts = [
  {
    title: 'Welcome to the Dune Imperium fan site',
    description: 'Project launch news and what to expect next.',
    to: '/news/welcome'
  },
  {
    title: 'Strategy basics for early turns',
    description: 'Guide to early tempo and card economy.',
    to: '/articles/strategy-basics'
  }
]
</script>

<template>
  <div>
    <HomeHero
      title="Dune Imperium"
      subtitle="News, cards, leaders, ratings, and practical strategy references."
    />
    <PostGrid heading="Latest News" :items="latestPosts" />
  </div>
</template>
