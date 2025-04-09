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
    alert('Innloggingslenke er sendt til innboksen din');
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
  <!-- <form class="row flex-center flex" @submit.prevent="handleLogin">
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
  </form> -->

  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight">
      TYPEBATTLE
    </h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm/6 font-medium">
          E-postadresse
        </label>
        <div class="mt-2">
          <UInput 
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            v-model="email"
            required
          />
        </div>
      </div>

      <div>
        <UButton 
          color="primary"
          class="flex w-full justify-center px-3 py-1.5"
          :disabled="loading"
        >
          {{loading ? 'Sender...' : 'Send magic link'}}
        </UButton>
      </div>
    </form>
  </div>
</div>
</template>