<script setup lang="ts">
import { ref, toRefs, watchEffect } from 'vue';;
import { supabase } from '../supabase';

const prop = defineProps(['path', 'size']);
const { path, size } = toRefs(prop);
const emit = defineEmits(['upload', 'update:path']);
const uploading = ref(false);
const src = ref('');
const files = ref(null);
const previewImage = ref();

const downloadImage = async () => {
  try {
    const { data, error } = await supabase.storage.from('avatars').download(path.value);
    if (error) throw error;
    src.value = URL.createObjectURL(data);    
  } catch (error) {
    console.error('Error downloading image: ', error.message);
  }
}

const avatarSelected = (r) => {
  const image = r.target.files[0];
  
  emit('changeYeet', image);
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = () => {
    previewImage.value = reader.result;
  };
}

watchEffect(() => {
  if (path.value) downloadImage();
});

</script>
<template>
  <div>
    <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image"
      :style="{ height: size + 'em', width: size + 'em' }"
    />
    <div v-else class="avatar no-image" :style="{ height: size + 'em', width: size + 'em' }"></div>
    <div>
      <UInput
        type="file"
        accept="image/*"
        @change="avatarSelected($event)"
        :disabled="uploading"
      />
    </div>
    <img
      v-if="previewImage"
      :src="previewImage"
      alt="Avatar"
      class="avatar image"
      :style="{ height: size + 'em', width: size + 'em' }"
    />
  </div>
</template>