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
  <div class="flex min-h-full flex-col px-6 py-12 lg:px-8">
    <div class="sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-[#E0E0E0] text-center text-2xl/9 font-bold tracking-tight">
        Kom i gang 🚀
      </h2>
    </div>

    <div class="sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <div class="mt-2">
            <UFormField label="E-postadresse" class=""
            >
              <UInput
                class="bg-[#2c2c2c] border border-[#888888] rounded"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                v-model="email"
                required
              />
            </UFormField>
          </div>
        </div>

        <div>
          <UButton 
            type="submit"
            color="primary"
            class="flex w-[9.1875rem] justify-center px-3 py-1.5"
            @click="handleLogin"
            :disabled="loading"
          >
            {{loading ? 'Sender...' : 'Send magic link'}}
          </UButton>
        </div>
      </form>
    </div>
  </div>
</template>