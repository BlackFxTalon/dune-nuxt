<script setup>
defineProps({
  rows: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <table class="ratings-table">
    <thead>
      <tr>
        <th>Player</th>
        <th>Score</th>
        <th>Faction</th>
        <th>Notes</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in rows" :key="row.player">
        <td>{{ row.player }}</td>
        <td>{{ row.score }}</td>
        <td>{{ row.faction }}</td>
        <td>{{ row.notes }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.ratings-table {
  width: 100%;
  border-collapse: collapse;
}

.ratings-table th,
.ratings-table td {
  border: 1px solid var(--line);
  padding: 0.55rem 0.6rem;
  text-align: left;
}
</style>
