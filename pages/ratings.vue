<script setup>
import RatingsTable from '~/components/ratings/RatingsTable.vue'
import RatingsTabs from '~/components/ratings/RatingsTabs.vue'

const mode = ref('imperium')
const { data, pending, error } = await useRatings(mode)
</script>

<template>
  <section>
    <h1>Ratings</h1>
    <RatingsTabs v-model="mode" />
    <p v-if="pending">Loading ratings...</p>
    <p v-else-if="error">Failed to load ratings.</p>
    <RatingsTable v-else :rows="data?.entries || []" />
  </section>
</template>
