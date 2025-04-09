<template>
    <div class="bg-[#2C2C2C] w-screen h-screen flex items-center justify-center">

        <div class="flex flex-col justify-start gap-11 p-32">
            <GameCountdown :seconds="30" />
            <div>
                <GameLetter :letter="letter" :written="written" v-for="(letter, index) in letters" :key="index" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GameCountdown from './GameCountdown.vue'
import GameLetter from './GameLetter.vue'
import { ref, computed } from 'vue'
const letters = ref<string[]>("Dette en telefon skal kunne hoppe fra sånn er denne reisen med kalkun gjennom flere runder i norge".split(""));
</script>