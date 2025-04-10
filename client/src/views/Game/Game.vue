<template>
	<div class="bg-[#2C2C2C] flex flex-col w-screen h-screen">
        <Navigation class="px-32 pt-8" />
        <div class="flex-1 flex items-center justify-center">
            <div class="flex flex-col justify-start gap-11 p-32">
                <GameCountdown :seconds="state.countdown" />
                <span class="text-white">
{{ state.wpm.value }} WPM
                </span>
                <div>
                    <GameLetter
                        :letter="letter"
                        :written="index < state.currentIndex.value"
                        v-for="(letter, index) in state.letters"
                        :key="index"
                    />
                </div>
            </div>
        </div>
	</div>
</template>

<script setup lang="ts">
import Navigation from "../../components/Navigation.vue";
import GameCountdown from "./GameCountdown.vue";
import GameLetter from "./GameLetter.vue";
import { ref, computed } from "vue";
import { useGameState } from "./useGameState";

const input = "Dette en telefon skal kunne hoppe fra sånn er denne reisen med kalkun gjennom flere runder i norge";

const state = useGameState(input);
</script>
