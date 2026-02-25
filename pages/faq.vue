<script setup>
import FaqAccordion from '~/components/faq/FaqAccordion.vue'

const faqItems = [
  {
    label: 'What is this site?',
    content: 'A fan-maintained reference for Dune Imperium players.'
  },
  {
    label: 'Is this official?',
    content: 'No. This is an independent fan project.'
  }
]
</script>

<template>
  <section>
    <h1>FAQ</h1>
    <FaqAccordion :items="faqItems" />
  </section>
</template>
