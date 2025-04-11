<script setup>
import { ref } from 'vue';
import { supabase } from '../supabase';

const loading = ref(false);
const email = ref('');
const emailSent = ref(false);

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
  <div class="flex min-h-full flex-col px-6 py-12 lg:px-8 justify-center">
    <div class="ml-[9.25rem]">
      <form>
        <Logo class="h-[2.8125rem] w-[18.70994rem] mb-[1.25rem]" />
        <span class="text-base text-[#E0E0E0] text-center w-[18.1875rem] mb-[1.25rem]">
          Kom i gang. Lag en bruker og test dine skrive ferdigheter.
        </span>
        <UFormField label="E-postaddresse" class="flex flex-col space-y-2 mt-4" text="#E0E0E0" required>
          <UInput
            type="email"
            name="email"
            id="email"
            autocomplete="email"
            color="#888888"
            v-model="email"
            required

          />
        </UFormField>
        <UButton 
          type="submit"
          color="primary"
          class="flex w-[7.6875rem] justify-center mt-4 bg-[#B82BFF] disabled:bg-[#B82BFF] hover:bg-[#B82BFF]"
          @click="handleLogin"
          :disabled="loading"
        >
          {{loading ? 'Sender epost...' : 'Registrer deg her'}}
        </UButton>
      </form>
    </div>
  </div>
</template>