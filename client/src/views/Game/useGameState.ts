import { ref, computed, type Ref, onMounted, watch } from 'vue';
import { useCountdown, useEventListener } from '@vueuse/core';

export interface GameState {
    letters: Ref<string[]>;
    currentIndex: Ref<number>;
    running: Ref<boolean>;
    completed: Ref<boolean>;
    countdown: Ref<number>;
    wpm: Ref<number>;
    initializeWords: (initialCount: number) => Promise<void>;
    updateWords: () => Promise<void>;
}

async function fetchRandomWords(count: number): Promise<string[]> {
    const response = await fetch('/words.json');
    const words = await response.json();
    const flatWords = words.map((word: any) => word);
    const randomWords = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * flatWords.length);
        randomWords.push(flatWords[randomIndex]);
    }
    return randomWords;
}

/**
 * A composable that encapsulates the core logic of the game.
 *
 * @param initialText - The text the player must type.
 * @param initialCountdown - The number of seconds for the game countdown (default is 30 seconds).
 * @returns An object with reactive game state and helper methods.
 */
export function useGameState(initialCountdown: number = 30): GameState {
  const letters = ref<string[]>([]);
  const errorIndeces = ref<number[]>([]);
  const currentIndex = ref(0);
  const { 
    remaining: countdown, 
    start,
    pause,
    isActive: running,
  } = useCountdown(initialCountdown);
  const completed = computed(() => countdown.value === 0 || currentIndex.value === letters.value.length);

  const AVG_WORD_LENGTH = 4.5;
  const SECONDS_IN_MINUTE = 60;

  const wpm = computed(() => {
      const wordsTyped = currentIndex.value / AVG_WORD_LENGTH;
      const minutes = (initialCountdown - countdown.value) / SECONDS_IN_MINUTE;
      return Math.floor(wordsTyped / (minutes || 1));
});

async function initializeWords(initialCount: number) {
    const initialWords = await fetchRandomWords(initialCount);
    letters.value = initialWords.join(' ').split('');
}

async function updateWords() {
    const remainingLetters = letters.value.length - currentIndex.value;
    if (remainingLetters <= 10) {
        const newWords = await fetchRandomWords(10);
        letters.value = [...letters.value, ...newWords.join(' ').split('')];
    }
}

// Listen to keyboard events.
useEventListener('keydown', (e: KeyboardEvent) => {
    // If the game is completed, do nothing.  
    if (completed.value) return;
    // check if character is a letter, space, or backspace.
    if (!/^[a-zA-ZæøåÆØÅ\s]$/.test(e.key) && e.key !== 'Backspace') return;
    // Start game on the first key press.
    if (!running.value) start();

    if (e.key === 'Backspace') {
        currentIndex.value = Math.max(0, currentIndex.value - 1);
        // Remove the last error index if it is the current index.
        return removeErrorIndex(currentIndex.value);
    }

    if (errorIndeces.value.length > 0 && letters.value[currentIndex.value] === ' ') return;

    // Check if this is the last character of the text.
    if (currentIndex.value === letters.value.length - 1) pause();

    if (letters.value[currentIndex.value] !== e.key) {
        errorIndeces.value.push(currentIndex.value);
    }
        

    currentIndex.value++;
});

const removeErrorIndex = (index: number) => {
    const errorIndex = errorIndeces.value.indexOf(index);
    if (errorIndex !== -1) {
        errorIndeces.value.splice(errorIndex, 1);
    }
    return errorIndex !== -1;
}

const hasErrorAtIndex = (index: number) => {
    return errorIndeces.value.includes(index);
}

onMounted(async () => await initializeWords(5));
watch(() => currentIndex, async () => await updateWords());

  return {
    letters,
    currentIndex,
    running,
    completed,
    countdown,
    wpm,
    hasErrorAtIndex,
  };
}
