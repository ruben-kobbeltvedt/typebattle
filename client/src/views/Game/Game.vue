<template>
	<div class="bg-[#2C2C2C] flex flex-col w-screen h-screen">
        <Navigation class="px-32 pt-8" />
        <div class="flex-1 flex items-center justify-center">
            <div class="flex flex-col justify-start gap-11 p-32">
                <GameCountdown :seconds="state.countdown" />
                <span class="text-white">
                    {{ state.wpm }} WPM
                </span>
                <div>
                    <GameLetter
                        :letter="letter"
                        :written="index < state.currentIndex.value"
                        :error="state.hasErrorAtIndex(index)"
                        v-for="(letter, index) in state.letters.value"
                        :key="index"
                    />
                </div>
            </div>
        </div>
	</div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import Navigation from '../../components/Navigation.vue';
import GameCountdown from './GameCountdown.vue';
import GameLetter from './GameLetter.vue';
import { useGameState } from './useGameState';

const state = useGameState();

onMounted(async () => {
    await state.initializeWords(20);
    console.log('Mounted', state.letters);
});

watch(() => state.currentIndex, async () => {
    await state.updateWords();
});
</script>
