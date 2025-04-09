<template>
  <span :class="[colorClass, 'font-mono text-5xl']">{{ props.letter }}</span>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  letter: string
  written: boolean
}

const props = defineProps<Props>()

const colorClass = computed(() => props.written ? 'text-white' : 'text-[#B0B0B0]');
</script>
