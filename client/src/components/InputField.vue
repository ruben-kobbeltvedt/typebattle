<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  currentWord: string
}>();

const emit = defineEmits(['completedWord'])

const inputValue = ref('');

watch(inputValue, (newValue) => {
  if (newValue === props.currentWord) {
    emit('completedWord');
    inputValue.value = '';
  }
});

</script>

<template>
  <div>
    <input
      :placeholder="props.currentWord"
      type="text"
      class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-model="inputValue"
    />
  </div>
</template>
