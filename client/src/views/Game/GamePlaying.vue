<template>
    <div class="flex flex-col justify-start gap-11">
        <GameCountdown  :seconds="state.countdown" />
        <span class="text-white"> {{ state.wpm }} WPM </span>
        <GameText :state="state" />
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