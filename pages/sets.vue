<script setup>
const setItems = [
  { name: 'Base Game', description: 'Core deckbuilding and conflict system.' },
  { name: 'Rise of Ix', description: 'Technology board and dreadnought layers.' },
  { name: 'Immortality', description: 'Research and specimen engine choices.' },
  { name: 'Uprising', description: 'Standalone variant with spies and worms.' }
]
</script>

<template>
  <section>
    <h1>Sets</h1>
    <ul>
      <li v-for="item in setItems" :key="item.name">
        <strong>{{ item.name }}</strong>
        <p>{{ item.description }}</p>
      </li>
    </ul>
  </section>
</template>
