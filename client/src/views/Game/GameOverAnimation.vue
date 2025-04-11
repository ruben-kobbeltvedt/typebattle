<template>
    <div class="flex justify-center relative h-full w-full">
        <div class="absolute flex flex-col justify-start gap-11">
            <span ref="gameOverRef" class="text-[#B82BFF] font-mono text-5xl font-semibold">{{ getRandomCompleteMessage() }}</span>
            <div ref="gameRef" class="flex flex-col justify-start gap-11">
                <GameText :state="state" />
            </div>
        </div>
        <div class="absolute flex flex-col justify-start gap-11">
            <span ref="resultRef" class="text-[#B82BFF] opacity-0 font-mono text-9xl font-semibold">Resultat</span>
            <div ref="statistics" class="flex flex-col gap-11">
                <div class="inline-flex items-end  gap-8">
                    <span ref="wpmRef" class="text-white text-4xl opacity-0"> {{ state.wpm }} WPM</span>
                    <span ref="wpmMessageRef" class="text-xl text-[#B0B0B0] opacity-0">Du er så flink! 😎</span>
                </div>
                <div ref="rankingRef" class="inline-flex gap-2 text-4xl opacity-0">
                    <span class="text-[#B0B0B0]">Plassering: </span>
                    <span class="text-white">{{ ranking }} plass</span>
                </div>
                <div ref="personalRankingRef" class="inline-flex gap-2 text-4xl opacity-0">
                    <span class="text-[#B0B0B0]">Personlig rekord: </span>
                    <span class="text-white">{{ highscore }} wpm</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { createSpring, createTimeline } from 'animejs';
import { onMounted, ref, useTemplateRef } from 'vue';
import GameText from './GameText.vue';
import type { useGameState } from './useGameState';
import { getRandomCompleteMessage } from './completeMessages';
import { supabase } from '../../supabase';

interface Props {
    state: ReturnType<typeof useGameState>;
    seconds: number
}
const props = defineProps<Props>();

const ranking = ref<number | null>();
const highscore = ref<number | null>();

const getHighscoreAsync = async () => {
    const sessionResponse = await supabase.auth.getSession()
    const user = sessionResponse.data.session?.user;

    const { data } = await supabase
        .from('profiles')
        .select('high_score')
        .eq('id', user.id)
        .single();

    const highscore = data?.high_score || 0;

    return highscore;
}

const getRankingAsync = async () => {
    const sessionResponse = await supabase.auth.getSession();
    const user = sessionResponse.data.session?.user;

    if (!user) return null;

    // First: get the user's own high score
    const { data: myScoreData, error: scoreError } = await supabase
        .from('profiles')
        .select('high_score')
        .eq('id', user.id)
        .single();

    if (scoreError || !myScoreData) {
        console.error('Error fetching user score:', scoreError);
        return null;
    }

    const myScore = myScoreData.high_score;

    // Second: count how many users have a higher score
    const { count, error: countError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .gt('high_score', myScore);

    if (countError) {
        console.error('Error counting higher scores:', countError);
        return null;
    }


    // Rank is count of higher scores + 1
    const rank = (count ?? 0) + 1;

    return rank;
};

onMounted(async () => {
    highscore.value = await getHighscoreAsync();
    ranking.value = await getRankingAsync();
    console.log(highscore.value, ranking.value);
});

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