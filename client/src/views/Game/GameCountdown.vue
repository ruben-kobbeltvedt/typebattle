<template>
    <span class="text-[#B82BFF] font-mono text-5xl">{{ seconds }} sekunder</span>
</template>

<script setup lang="ts">
interface Props {
    seconds: number
}
const props = defineProps<Props>()
</script>