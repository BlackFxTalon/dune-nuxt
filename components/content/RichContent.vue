<script setup>
defineProps({
  body: {
    type: String,
    required: true
  }
})
</script>

<template>
  <article class="rich-content">
    <pre class="rich-content__body">{{ body }}</pre>
  </article>
</template>

<style scoped>
.rich-content {
  border: 1px solid var(--line);
  border-radius: 12px;
  background: rgba(15, 17, 21, 0.5);
  padding: 1rem;
}

.rich-content__body {
  margin: 0;
  white-space: pre-wrap;
  font-family: inherit;
  color: var(--sand-50);
}
</style>
