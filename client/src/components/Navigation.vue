<template>
    <div class="flex justify-end items-center gap-3">
        <UButton size='xl' icon="i-mdi-trophy-variant" to="/leaderboard" class="bg-[#2C2C2C] text-white border border-[#606060]" />
        <UButton size='xl' icon="i-mdi-account" to="/user" class="bg-[#2C2C2C] text-white border border-[#606060]" />
    </div>
    <!-- <UNavigationMenu :items="items" class="justify-end" /> -->
</template>

<!-- <script setup lang="ts">
import { ref } from 'vue'

const items = ref<any[]>([
    {
        icon: 'i-mdi-trophy-variant',
        to: '/leaderboard',
        type: 'link',
    },
    {
        icon: 'i-mdi-account',
        to: '/user',
        type: 'link',
    }
]);
</script> -->