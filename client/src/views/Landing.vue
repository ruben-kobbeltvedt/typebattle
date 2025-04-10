<template>
  <div class="bg-[#2c2c2c] h-screen px-32 py-8 flex flex-col gap-11 overflow-auto">
    <Navigation />
    <div class="flex flex-col flex-1 w-full">
      <Account v-if="session" :session="session" />
      <Auth v-else />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import Account from '../components/Account.vue';
import Auth from '../components/Auth.vue';
import { supabase } from '../supabase';

const session = ref();

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    session.value = data.session;
  });
  supabase.auth.onAuthStateChange((_, _session) => {
    session.value = _session;
  });
});
</script>
