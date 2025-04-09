<script setup lang="ts">

const props = defineProps<{
  words: string[]
}>()

</script>

<template>
  <div class="flex justify-center">
    <button
      @click="shuffleWords"
      class="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Shuffle Words
    </button>
  </div>

  <div class="w-[64rem] h-[32rem] bg-gray-100 p-4 overflow-auto rounded-2xl shadow-lg">
    <div class="flex flex-wrap space-x-4 space-y-2">
      <span v-for="(word, index) in props.words" :key="index" class="text-gray-800 font-mono">
        {{ word }}
      </span>
    </div>
  </div>
</template>
