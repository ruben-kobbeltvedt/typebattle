<template>
    <div class="flex flex-col justify-start gap-11">
        <GameCountdown  :seconds="state.countdown" />
        <GameText :state="state" />
        <span class="mx-auto text-[#B0B0B0] text-xl">{  begynn å skrive  }</span> 
    </div>
</template>

<script setup lang="ts">
import GameCountdown from './GameCountdown.vue';
import GameText from './GameText.vue';
import type { useGameState } from './useGameState';

interface Props {
    state: ReturnType<typeof useGameState>;
}

const props = defineProps<Props>();

</script>