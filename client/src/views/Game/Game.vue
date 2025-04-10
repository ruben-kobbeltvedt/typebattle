<template>
	<div class="bg-[#2C2C2C] flex flex-col w-screen h-screen">
        <Navigation class="px-32 pt-8" />
        <div class="flex-1 p-32">
            <div class="flex justify-center w-full h-full">
                <GameOver v-if="state.completed.value" :state="state" />
                <GamePlaying v-else :state="state" />
            </div>
        </div>
	</div>
</template>

<script setup lang="ts">
import Navigation from '../../components/Navigation.vue';
import { useGameState } from './useGameState';
import GameOver from './GameOverAnimation.vue';
import GamePlaying from './GamePlaying.vue';

const state = useGameState();
</script>
