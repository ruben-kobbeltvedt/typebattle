<script setup lang="ts">
import { supabase } from '../supabase';
import { onMounted, ref, toRefs } from 'vue';
import Avatar from './Avatar.vue';
import type { ToastProps } from '@nuxt/ui'

const props = defineProps(['session']);
const { session } = toRefs(props);

const loading = ref(true);
const username = ref('');
const avatarFile = ref(null);
const avatar_url = ref('');
const toast = useToast();

function showToast() {
  toast.add(<ToastProps>{
    title: 'Lagret',
  });
}

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
  loading.value = true;
  if (avatarFile.value) {
    const fileExt = avatarFile.value.name.split('.').pop();
    const filePath = `${user.id}.${fileExt}`;
    if (!avatar_url.value) {
      const { error: uploadError } = await supabase
        .storage
        .from('avatars')
        .upload(filePath, avatarFile.value);
      if (uploadError) {
        loading.value = false;
        throw uploadError;
      };
    } else {
      const { error: updateError } = await supabase
        .storage
        .from('avatars')
        .update(filePath, avatarFile.value);
      if (updateError) {
        loading.value = false;
        throw uploadError;
      };
    }

    avatar_url.value = filePath;
  }

  try {
    const updates = {
      id: user.id,
      username: username.value,
      avatar_url: avatar_url.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from('profiles').upsert(updates);

    if (error) throw error;
    showToast();
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
  <div class="w-full">
    <div class="flex justify-between">
      <h1 class="text-white" style="font-size: 20px">Info om deg <3</h1>
      <div>
        <UButton 
          class="button block"
          color="error"
          @click="signOut"
        >
          Logg ut
        </UButton>
      </div>
    </div>
    <form class="mt-4 space-y-3 text-white" @submit.prevent="updateProfile">
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

      <div class="mt-5">
        <label for="avtr" class="block text-sm/6 font-medium mb-2">Profilbilde</label>
        <Avatar id="avtr" @changeYeet="yeet" size="5" :path="avatar_url" />
      </div>

      <div>
        <UButton
          type="submit"
          class="button block"
          style="background-color: #B82BFF"
          :disabled="loading"
        >
          {{ loading ? 'Lagrer...' : 'Lagre' }}
        </UButton>
      </div>
    </form>
  </div>
</template>