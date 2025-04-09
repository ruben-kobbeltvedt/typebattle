<script setup lang="ts">
import Letter from './Letter.vue'

const props = defineProps<{
  words: string[]
}>()

</script>

<template>
  <div class="w-[32rem] h-[32rem] bg-gray-100 p-4 overflow-auto rounded-2xl shadow-lg">
    <div class="flex flex-wrap space-x-4 space-y-2">
      <span v-for="(word, wordIndex) in props.words" :key="wordIndex" class="flex space-x-1">
        <Letter
          v-for="(letter, letterIndex) in word.split('')"
          :key="`${wordIndex}-${letterIndex}`"
          :letter="letter"
        />
      </span>
    </div>
  </div>
</template>
