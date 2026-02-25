<script setup lang="ts">
import LeaderFilters from '~/components/leaders/LeaderFilters.vue'
import type { LeadersFilterState } from '~/composables/useLeaders'
import { useLeaders } from '~/composables/useLeaders'
import { filterLeaders } from '~/utils/leaders-filter'

const filters = ref<LeadersFilterState>({
  set: '',
  difficulty: ''
})

const { data, pending, error } = await useLeaders(filters)

const items = computed(() => data.value || [])
const setOptions = computed(() => [...new Set(items.value.map((leader) => leader.set))])
const difficultyOptions = computed(() => [...new Set(items.value.map((leader) => leader.difficulty))])
const visibleLeaders = computed(() => filterLeaders(items.value, filters.value))

const onUpdateFilters = (next: LeadersFilterState) => {
  filters.value = { ...filters.value, ...next }
}

const onResetFilters = () => {
  filters.value = { set: '', difficulty: '' }
}
</script>

<template>
  <div>
    <h1>Leaders</h1>
    <LeaderFilters
      :model-value="filters"
      :sets="setOptions"
      :difficulties="difficultyOptions"
      @update:model-value="onUpdateFilters"
      @reset="onResetFilters"
    />

    <p v-if="pending">Loading leaders...</p>
    <p v-else-if="error">Failed to load leaders.</p>
    <ul v-else>
      <li v-for="leader in visibleLeaders" :key="leader.slug">
        <NuxtLink :to="`/leaders/${leader.slug}`">{{ leader.title }}</NuxtLink>
        <span> ({{ leader.set }}, {{ leader.difficulty }}) </span>
      </li>
    </ul>
  </div>
</template>
