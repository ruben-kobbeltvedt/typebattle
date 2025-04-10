<template>
  <div class="bg-[#2c2c2c] h-screen">
    <Navigation class="px-32 pt-8" />
    <div class="flex flex-col ml-2 left">
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
