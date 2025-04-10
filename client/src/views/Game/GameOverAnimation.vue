<template>
    <div class="flex flex-col justify-start w-full h-full relative">
        <div class="absolute flex flex-col justify-start gap-11">
            <span ref="gameOverRef" class="text-[#B82BFF] font-mono text-5xl font-semibold">GAME OVER</span>
            <div ref="gameRef" class="flex flex-col justify-start gap-11">
                <GameText :state="state" />
            </div>
        </div>
        <div class="absolute flex flex-col justify-start gap-11">
            <span ref="resultRef" class="text-[#B82BFF] opacity-0 font-mono text-9xl font-semibold">Resultat</span>
            <div ref="statistics" class="flex flex-col gap-11">
                <div class="inline-flex items-end  gap-8">
                    <span ref="wpmRef" class="text-white text-4xl opacity-0"> {{ state.wpm }} WPM </span>
                    <span ref="wpmMessageRef" class="text-xl text-[#B0B0B0] opacity-0">Du er så flink! 😎</span>
                </div>
                <div ref="rankingRef" class="inline-flex gap-2 text-4xl opacity-0">
                    <span class="text-[#B0B0B0]">Plassering: </span>
                    <span class="text-white">30 plass</span>
                </div>
                <div ref="personalRankingRef" class="inline-flex gap-2 text-4xl opacity-0">
                    <span class="text-[#B0B0B0]">Personlig rekord: </span>
                    <span class="text-white">128 wpm</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { animate, createSpring, createTimeline } from 'animejs';
import { onMounted, ref, useTemplateRef } from 'vue';
import GameText from './GameText.vue';
import type { useGameState } from './useGameState';

interface Props {
    state: ReturnType<typeof useGameState>;
    seconds: number
}
const props = defineProps<Props>()

const gameOverRef = useTemplateRef<HTMLElement>('gameOverRef');
const resultRef = useTemplateRef<HTMLElement>('resultRef');
const gameRef = useTemplateRef<HTMLElement>('gameRef');
const statistics = useTemplateRef<HTMLElement>('statistics');

const wpmRef = useTemplateRef<HTMLElement>('wpmRef');
const wpmMessageRef = useTemplateRef<HTMLElement>('wpmMessageRef');

const rankingRef = useTemplateRef<HTMLElement>('rankingRef');
const personalRankingRef = useTemplateRef<HTMLElement>('personalRankingRef');

const quickEase = createSpring({
    mass: 1,
    damping: 20,
    stiffness: 300,
});

onMounted(() => {
    const timeline = createTimeline();

    // Scale up the game over text
    timeline.add(gameOverRef.value, {
        fontSize: '8rem',
        duration: 600,
        delay: 800,
        ease: quickEase,
    });

    // Fade out the game over text and fade in the result text
    timeline.add(gameOverRef.value, {
        opacity: 0,
        duration: 600,
    });
    timeline.add(gameRef.value, {
        opacity: 0,
        duration: 600,
    },  '<<');

    // Fade in the result text
    timeline.add(resultRef.value, {
        opacity: 1,
        duration: 600,
    });

    // Scale down the result text
    timeline.add(resultRef.value, {
        fontSize: '3rem',
        duration: 600,
        delay: 800,
        ease: quickEase,
    }, '<<');

    // Fade in the wpm
    timeline.add(wpmRef.value, {
        opacity: 1,
        translateX: ['-50%', 0],
        duration: 200,
    });

    // Fade in the ranking text
    timeline.add(rankingRef.value, {
        opacity: 1,
        translateX: ['-50%', 0],
        duration: 200,
    });

    // Fade in the personal ranking text
    timeline.add(personalRankingRef.value, {
        opacity: 1,
        translateX: ['-50%', 0],
        duration: 200,
    });

    // Fade in the WPM message
    timeline.add(wpmMessageRef.value, {
        opacity: 1,
        duration: 200,
        delay: 600,
    });

});
</script>