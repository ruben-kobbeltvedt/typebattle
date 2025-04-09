<script setup lang="ts">
import { onMounted, ref } from 'vue';

const displayedWords = ref<string[]>([])

async function loadWords() {
  const raw = await fetch('/words.json').then(res => res.json())
  const onlyWords = raw.map((item: any[]) => item[1])
  return onlyWords
}

async function shuffleWords() {
  const words = await loadWords()
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
    <UBadge>Foobar</UBadge>
    <ShuffleWordsButton @shuffleWords="shuffleWords" />
    <WordsToType :words="displayedWords" />
    <InputField :currentWord="displayedWords[0]" @completedWord="handleCompletedWord" />
  </div>
</template>
