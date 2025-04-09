<script setup lang="ts">
import { onMounted, ref } from 'vue';
import InputField from './components/InputField.vue';
import WordsToType from './components/WordsToType.vue';

const words = [
  'banana', 'avocado', 'supernova', 'hologram', 'syntax', 'quantum',
  'pirate', 'enchanted', 'whiskers', 'moonlight', 'entropy', 'goblin',
  'alchemy', 'debug', 'plasma', 'serendipity', 'waffle', 'existential',
  'javascript', 'vortex', 'velocity', 'glitch', 'noodle', 'nebula'
]

const displayedWords = ref<string[]>([])

function shuffleWords() {
  displayedWords.value = [...words]
    .sort(() => 0.5 - Math.random())
    .slice(0, 20)
}

onMounted(() => {
  shuffleWords()
})

const handleCompletedWord = () => {
  displayedWords.value.shift()
  if (displayedWords.value.length === 0) {
    alert('All words completed!')
  }
}
</script>

<template>
  <div>
    <WordsToType :words="words" />
    <InputField :word="words[0]" @completed="handleCompletedWord" />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
