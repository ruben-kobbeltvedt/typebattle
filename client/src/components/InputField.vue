<script setup lang="ts">
import { type Ref, ref, watch } from 'vue';

const props = defineProps<{
  currentWord: string
}>();

const emit = defineEmits(['completedWord', 'startGame']);

const gameStarted: Ref<boolean> = ref(false);

const inputValue = ref('');

watch(inputValue, (newValue) => {
  if (gameStarted.value === false) {
    emit('startGame');
    gameStarted.value = true;
  }
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
      class="px-4 py-2 focus:border-none w-full border-none"
      v-model="inputValue"
    />
  </div>
</template>
