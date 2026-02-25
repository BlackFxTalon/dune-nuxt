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
  factions: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'reset'])

const local = reactive({
  set: '',
  faction: '',
  search: '',
  sort: 'name'
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
  Object.assign(local, { set: '', faction: '', search: '', sort: 'name' })
  emit('update:modelValue', { ...local })
  emit('reset')
}
</script>

<template>
  <section class="card-filters">
    <h2>Filters</h2>
    <div class="card-filters__controls">
      <label>
        Set
        <select v-model="local.set" @change="update">
          <option value="">All</option>
          <option v-for="setName in sets" :key="setName" :value="setName">{{ setName }}</option>
        </select>
      </label>

      <label>
        Faction
        <select v-model="local.faction" @change="update">
          <option value="">All</option>
          <option v-for="factionName in factions" :key="factionName" :value="factionName">{{ factionName }}</option>
        </select>
      </label>

      <label>
        Search
        <input v-model="local.search" type="search" placeholder="Card name" @input="update">
      </label>

      <label>
        Sort
        <select v-model="local.sort" @change="update">
          <option value="name">Name</option>
          <option value="cost">Cost</option>
        </select>
      </label>

      <button type="button" @click="reset">Reset</button>
    </div>
  </section>
</template>

<style scoped>
.card-filters {
  border: 1px solid var(--line);
  border-radius: 12px;
  padding: 1rem;
  background: rgba(15, 17, 21, 0.45);
}

.card-filters__controls {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  align-items: end;
}

label {
  display: grid;
  gap: 0.35rem;
  font-size: 0.9rem;
}

select,
input,
button {
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--char-700);
  color: var(--sand-50);
  padding: 0.5rem 0.6rem;
}
</style>
