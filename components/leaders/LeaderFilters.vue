<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  },
  sets: {
    type: Array,
    required: true
  },
  difficulties: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'reset'])

const local = reactive({
  set: '',
  difficulty: ''
})

watch(
  () => props.modelValue,
  (value) => {
    Object.assign(local, value)
  },
  { deep: true, immediate: true }
)

const update = () => {
  emit('update:modelValue', { ...local })
}

const reset = () => {
  Object.assign(local, { set: '', difficulty: '' })
  emit('update:modelValue', { ...local })
  emit('reset')
}
</script>

<template>
  <section class="leader-filters">
    <h2>Leader Filters</h2>
    <div class="leader-filters__controls">
      <label>
        Set
        <select v-model="local.set" @change="update">
          <option value="">All</option>
          <option v-for="setName in sets" :key="setName" :value="setName">{{ setName }}</option>
        </select>
      </label>

      <label>
        Difficulty
        <select v-model="local.difficulty" @change="update">
          <option value="">All</option>
          <option v-for="level in difficulties" :key="level" :value="level">{{ level }}</option>
        </select>
      </label>

      <button type="button" @click="reset">Reset</button>
    </div>
  </section>
</template>

<style scoped>
.leader-filters {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1rem;
  background: rgba(15, 17, 21, 0.45);
}

.leader-filters__controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  align-items: end;
}

label {
  display: grid;
  gap: 0.35rem;
}

select,
button {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--char-700);
  color: var(--sand-50);
  padding: 0.5rem 0.6rem;
}
</style>
