<script setup lang="ts">
const props = defineProps<{
  letter: string
}>()
</script>

<template>
  <span class="text-gray-800 font-mono">{{ props.letter }}</span>
</template>