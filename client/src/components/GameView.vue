<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const displayedWords = ref<string[]>([])
const startTime = ref<number | null>(null)
const completedWordsCount = ref(0)
const wpm = ref(0)

onMounted(() => {
  shuffleWords()
})

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

  startTime.value = null
  completedWordsCount.value = 0
  wpm.value = 0
}

const handleCompletedWord = () => {
  completedWordsCount.value++
  displayedWords.value.shift()

  if (startTime.value) {
    const elapsedTime = (Date.now() - startTime.value) / 60000
    wpm.value = Math.round(completedWordsCount.value / elapsedTime)
  }

  if (displayedWords.value.length === 0) {
    alert(`All words completed! Your WPM: ${wpm.value}`)
  }
}

const handleStartGame = () => {
  startTime.value = Date.now()
  completedWordsCount.value = 0
  wpm.value = 0
}

watch(() => wpm.value, (newWpm) => {
  wpm.value = newWpm;
})
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UBadge>WPM: {{ wpm }}</UBadge>
    <ShuffleWordsButton @shuffleWords="shuffleWords" />
    <WordsToType :words="displayedWords" />
    <InputField :currentWord="displayedWords[0]" @completedWord="handleCompletedWord" @startGame="handleStartGame" />
  </div>
</template>
