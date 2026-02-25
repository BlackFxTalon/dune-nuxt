<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const setMode = (mode) => {
  emit('update:modelValue', mode)
}
</script>

<template>
  <div class="ratings-tabs">
    <button
      type="button"
      :class="{ active: props.modelValue === 'imperium' }"
      @click="setMode('imperium')"
    >
      Imperium
    </button>
    <button
      type="button"
      :class="{ active: props.modelValue === 'uprising' }"
      @click="setMode('uprising')"
    >
      Uprising
    </button>
  </div>
</template>

<style scoped>
.ratings-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

button {
  border: 1px solid var(--line);
  border-radius: 8px;
  padding: 0.45rem 0.8rem;
  background: var(--char-700);
  color: var(--sand-50);
}

button.active {
  border-color: var(--sand-500);
}
</style>
