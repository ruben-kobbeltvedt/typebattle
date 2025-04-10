<template>
    <span ref="countdownRef" class="text-[#B82BFF] font-mono text-5xl">{{ seconds }} sekunder</span>
</template>

<script setup lang="ts">
import { animate } from 'animejs';
import { onMounted, useTemplateRef } from 'vue';

interface Props {
    seconds: number
}
const props = defineProps<Props>()
</script>