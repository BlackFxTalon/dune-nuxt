<template>
  <div class="app-shell">
    <AppHeader />
    <main class="app-main">
      <div class="container">
        <slot />
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DefaultLayout'
})
</script>
