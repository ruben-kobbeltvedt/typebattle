<script setup lang="ts">
import { supabase } from '../supabase';
import { onMounted, ref, toRefs } from 'vue';
import Avatar from './Avatar.vue';

const props = defineProps(['session']);
const { session } = toRefs(props);

const loading = ref(true);
const username = ref('');
const avatarFile = ref(null);
const avatar_url = ref('');

onMounted(() => {
  getProfile();
});

async function getProfile() {
  try {
    loading.value = true;
    const { user } = session.value;

    const { data, error, status } = await supabase
      .from('profiles')
      .select(`username, avatar_url`)
      .eq('id', user.id)
      .single();

    if (error && status !== 406) throw error;

    if (data) {
      username.value = data.username;
      avatar_url.value = data.avatar_url;
    }
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

function yeet(file: File) {
  avatarFile.value = file ? file : null;
  const { user } = session.value;
  const fileExt = avatarFile.value.name.split('.').pop();
  console.log(`${user.id}.${fileExt}`);
}

async function updateProfile() {
  const { user } = session.value;

  if (avatarFile.value) {
    const fileExt = avatarFile.value.name.split('.').pop();
    const filePath = `${user.id}.${fileExt}`;
    if (!avatar_url.value) {
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, avatarFile.value);
      if (uploadError) throw uploadError;
    } else {
      const { error: updateError } = await supabase
        .storage
        .from('avatars')
        .update(filePath, avatarFile.value);
      if (uploadError) throw uploadError;
    }

    
    avatar_url.value = filePath;
  }

  try {
    loading.value = true;

    const updates = {
      id: user.id,
      username: username.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mt-10 ml-10">
    <h1 class="mb-10">Info om deg <3</h1>
    <form class="space-y-6" @submit.prevent="updateProfile">
      <div>
        <label for="email" class="block text-sm/6 font-medium">
          E-postadresse
        </label>
        <div class="mt-2">
          <UInput id="email" type="text" :value="session.user.email" disabled />
        </div>
      </div>

      <div>
        <label for="email" class="block text-sm/6 font-medium">
          Navn
        </label>
        <div class="mt-2">
          <UInput id="username" type="text" v-model="username" />
        </div>
      </div>

      <div>
        <Avatar @changeYeet="yeet" size="5" :path="avatar_url" />
      </div>

      <div>
        <UButton
          type="submit"
          class="button primary block"
          :value="loading ? 'Lagrer...' : 'Lagre'"
          :disabled="loading"
        >
          Yeet
        </UButton>
      </div>

      <div>
        <UButton 
          class="button block"
          color="error"
          @click="signOut"
        >
          Logg ut
        </UButton>
      </div>
    </form>
  </div>
</template>