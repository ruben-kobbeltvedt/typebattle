<template>
  <span :class="[colorClass, 'font-mono text-5xl']">{{ props.letter }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  letter: string
  written: boolean
  error: boolean
}

const props = defineProps<Props>()

const colorClass = computed(() => {
  if (props.error) return 'text-red-500'
  if (props.written) return 'text-white'
  return 'text-[#B0B0B0]'
});
</script>
