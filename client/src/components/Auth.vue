<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

const loading = ref(false);
const email = ref('');

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    alert('Innloggingslenke sendt til innboksen din');
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="col-6 form-widget">
      <h1 class="header">TYPEBATTLE</h1>
      <p class="description">Magic link yeet</p>
      <div>
        <input class="inputField" required type="email" placeholder="E-postadresse" v-model="email" />
      </div>
      <div>
        <input
          type="submit"
          class="button block"
          :value="loading ? 'Sender...' : 'Send magic link'"
          :disabled="loading"
        />
      </div>
    </div>
  </form>
</template>