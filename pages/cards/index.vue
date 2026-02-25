<script setup>
import CardFilters from '~/components/cards/CardFilters.vue'
import CardGrid from '~/components/cards/CardGrid.vue'
import { useCards } from '~/composables/useCards'
import { applyCardFilters } from '~/utils/cards-filter'
import { sortCards } from '~/utils/cards-sort'

const filters = ref({
  set: '',
  faction: '',
  search: '',
  sort: 'name'
})

const { data, pending, error } = await useCards(filters)

const items = computed(() => data.value || [])

const setOptions = computed(() => [...new Set(items.value.map((card) => card.set))])
const factionOptions = computed(() => [...new Set(items.value.flatMap((card) => card.faction))])

const filtered = computed(() => applyCardFilters(items.value, filters.value))
const sorted = computed(() => sortCards(filtered.value, filters.value.sort === 'cost' ? 'cost' : 'name'))

const onUpdateFilters = (next) => {
  filters.value = { ...filters.value, ...next }
}

const onResetFilters = () => {
  filters.value = { set: '', faction: '', search: '', sort: 'name' }
}
</script>

<template>
  <div>
    <h1>Cards</h1>
    <CardFilters
      :model-value="filters"
      :sets="setOptions"
      :factions="factionOptions"
      @update:model-value="onUpdateFilters"
      @reset="onResetFilters"
    />

    <p v-if="pending">Loading cards...</p>
    <p v-else-if="error">Failed to load cards.</p>
    <CardGrid v-else :cards="sorted" />
  </div>
</template>
