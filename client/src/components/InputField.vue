<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

const props = defineProps<{
  word: string
}>();

const emit = defineEmits(['completed'])


const inputField = ref<HTMLInputElement | null>(null);

const inputValue = ref('');

watch(inputValue, (newValue) => {
  if (newValue === props.word) {
    emit('completed');
    inputValue.value = '';
  }
});

onMounted(() => {
  inputField.value?.focus();
});

</script>

<template>
  <h1></h1>

  <div class="card">
    <input
      ref="inputField"
      :placeholder="props.word"
      type="text"
      class="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      v-model="inputValue"
    />
  </div>
</template>
