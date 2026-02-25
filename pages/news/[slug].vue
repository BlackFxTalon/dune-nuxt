<script setup lang="ts">
import RichContent from '~/components/content/RichContent.vue'

const route = useRoute()
const slug = String(route.params.slug || '')

const { data } = await useAsyncData(`news:${slug}`, () =>
  queryCollection('news').path(`/news/${slug}`).first()
)

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not found' })
}

const body = computed(() => {
  const raw = (data.value as Record<string, unknown>).body
  return typeof raw === 'string' ? raw : ''
})
</script>

<template>
  <article>
    <h1>{{ data?.title }}</h1>
    <p>{{ data?.description }}</p>
    <RichContent :body="body" />
  </article>
</template>
