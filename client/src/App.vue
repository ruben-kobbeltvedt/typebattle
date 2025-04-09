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
    <UApp>
      <div>
        <UBadge>FooBar</UBadge>
        <WordsToType :words="words" />
        <InputField :word="words[0]" @completed="handleCompletedWord" />
      </div>
    </UApp>
</template>