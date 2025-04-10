import { ref, computed, type Ref } from 'vue'
import { useCountdown, useEventListener  } from '@vueuse/core'

export interface GameState {
    letters: string[];
    currentIndex: Ref<number>;
    running: Ref<boolean>;
    completed: Ref<boolean>;
    countdown: Ref<number>;
    seconds: Ref<number>;
    wpm: Ref<number>;
}

/**
 * A composable that encapsulates the core logic of the game.
 *
 * @param initialText - The text the player must type.
 * @param initialCountdown - The number of seconds for the game countdown (default is 30 seconds).
 * @returns An object with reactive game state and helper methods.
 */
export function useGameState(initialText: string, initialCountdown: number = 30): GameState {
  const letters = initialText.split('')
  const errorIndeces = ref<number[]>([]);
  const currentIndex = ref(0);
  const { 
    remaining: countdown, 
    start,
    pause,
    reset,
    isActive: running,
} = useCountdown(initialCountdown);
  const completed = computed(() => countdown.value == 0 || currentIndex.value == letters.length);

  const AVG_WORD_LENGTH = 5;
  const SECONDS_IN_MINUTE = 60;

  const wpm = computed(() => {
    const wordsTyped = currentIndex.value / AVG_WORD_LENGTH;
    const minutes = (initialCountdown - countdown.value) / SECONDS_IN_MINUTE;
    return Math.floor(wordsTyped / (minutes || 1));
  })

  // Listen to keyboard events.
  useEventListener('keydown', (e: KeyboardEvent) => {
    // If the game is completed, do nothing.
    if (completed.value) {
        return;
    }

    // check if character is a letter, space, or backspace.
    if (!/^[a-zA-Z\s]$/.test(e.key) && e.key !== 'Backspace') {
        return;
    }

    // Start game on the first key press.
    if (!running.value) {
        start();
    }

    const key = e.key
    if (key === 'Backspace') {
        // Remove the last character from the current index.
        currentIndex.value = Math.max(0, currentIndex.value - 1);

        // Remove the last error index if it is the current index.
        const errorIndex = errorIndeces.value.indexOf(currentIndex.value);
        if (errorIndex !== -1) {
            errorIndeces.value.splice(errorIndex, 1);
        }
        return;
    }

    const expected = letters[currentIndex.value]
    if (key !== expected) {
        errorIndeces.value.push(currentIndex.value);
    }

    // Check if this is the last character of the text.
    if (currentIndex.value === letters.length - 1) {
        pause();
    }

    currentIndex.value++
  })

  return {
    letters,
    currentIndex,
    running,
    completed,
    countdown,
    wpm,
  }
}
