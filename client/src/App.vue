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

onMounted(() => {
  shuffleWords()
})

function shuffleWords() {
  displayedWords.value = [...words]
    .sort(() => 0.5 - Math.random())
    .slice(0, 20)
}

const handleCompletedWord = () => {
  displayedWords.value.shift()
  if (displayedWords.value.length === 0) {
    alert('All words completed!')
  }
}
</script>

<template>
  <div>
    <UBadge>Foobar</UBadge>
    <ShuffleWordsButton @shuffleWords="shuffleWords" />
    <WordsToType :words="displayedWords" />
    <InputField :currentWord="displayedWords[0]" @completedWord="handleCompletedWord" />
  </div>
</template>
