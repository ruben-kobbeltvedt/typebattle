<template>
    <div class="flex justify-between items-center gap-3">
        <router-link to="/game" @click="reload" class="h-full flex items-center gap-3">
            <Logo />
        </router-link>
        <div class="flex items-center gap-3">
            <UButton size='xl' icon="i-mdi-trophy-variant" to="/leaderboard" class="bg-[#2C2C2C] text-white border border-[#606060]" />
            <UButton size='xl' icon="i-mdi-account" to="/" class="bg-[#2C2C2C] text-white border border-[#606060]" />
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './Logo.vue';

const reload = () => {
    // check if /game is running, if so, reload the page
    const currentPath = window.location.pathname;
    if (currentPath === '/game') {
        window.location.reload();
    }
}
</script>