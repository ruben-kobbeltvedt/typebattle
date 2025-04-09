<script setup lang="ts">

const emit = defineEmits(['shuffleWords'])

</script>

<template>
  <div class="flex justify-center">
    <button
      @click="emit('shuffleWords')"
      class="mb-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Shuffle Words
    </button>
  </div>
</template>
