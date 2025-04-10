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
    <div>
      <UInput
        type="file"
        accept="image/*"
        @change="avatarSelected($event)"
        :disabled="uploading"
      />
    </div>
    <div class="h-[171px] w-[345px] border fucktailwind">
      <div v-if="src && !previewImage" class="avatar-container">
        <img
          :src="src"
          alt="Avatar"
          class="avatar image"
          :style="{ height: size + 'em', width: size + 'em' }"
        />
      </div>

      <div v-if="previewImage" class="avatar-container">
        <img
          :src="previewImage"
          alt="Avatar"
          class="avatar image"
          :style="{ height: size + 'em', width: size + 'em' }"
        />
      </div>

    </div>
  </div>
</template>

<style scoped>
.fucktailwind {
  margin-top: 20px;
  border-radius: 14px;
  border-color: #888888;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.avatar-container {
  height: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* .avatar-container > img {
  
} */
</style>