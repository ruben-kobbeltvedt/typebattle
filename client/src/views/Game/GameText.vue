<template>
    <div>
        <GameLetter
            :letter="letter"
            :written="index < state.currentIndex.value"
            :error="state.hasErrorAtIndex(index)"
            v-for="(letter, index) in state.letters.value"
            :key="index"
        />
    </div>
</template>

<script setup lang="ts">
import GameLetter from './GameLetter.vue';
import type { useGameState } from './useGameState';

interface Props {
    state: ReturnType<typeof useGameState>;
}
const props = defineProps<Props>();
</script>