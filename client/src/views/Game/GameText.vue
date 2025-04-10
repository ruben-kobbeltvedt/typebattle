<template>
    <div ref="containerRef">
        <div class="absolute w-[2px] h-[3rem] bg-[#B82BFF]" ref="cursorRef"></div>
        <GameLetter
            :id="`letter-${index}`"
            :letter="letter"
            :written="index < state.currentIndex.value"
            :error="state.hasErrorAtIndex(index)"
                v-for="(letter, index) in state.letters.value"
            :key="index"
        />
    </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watch } from 'vue';
import GameLetter from './GameLetter.vue';
import type { useGameState } from './useGameState';
import { animate } from 'animejs';

interface Props {
    state: ReturnType<typeof useGameState>;
}
const props = defineProps<Props>();

const cursorRef = useTemplateRef<HTMLElement>('cursorRef');
const containerRef = useTemplateRef<HTMLElement>('containerRef');

onMounted(() => {
    animate(cursorRef.value, {
        opacity: [1, 0],
        ease: 'inQuint',
        duration: 1000,
        loop: true,
        direction: 'alternate'
    });
});

watch(() => props.state.currentIndex.value, () => {
    const letter = document.getElementById(`letter-${props.state.currentIndex.value}`);
    if (!letter) return;

    // Get bounding rectangles for both container and the letter
    const containerRect = containerRef.value.getBoundingClientRect();
    const letterRect = letter.getBoundingClientRect();

    // Calculate target x and y positions relative to the container.
    // This is like computing: targetX = letter's left - container's left.
    // We "add" (or subtract) offsets to move from one position to another.
    const targetX = letterRect.left - containerRect.left;
    const targetY = letterRect.top - containerRect.top;

    // Animate the cursor to the computed target.
    // Think of this as multiplying the cursor's movement by the delta we calculated.
    animate(cursorRef.value, {
        translateX: targetX,
        translateY: targetY,
        duration: 100,
        easing: 'easeOutQuad'
    });
});
</script>