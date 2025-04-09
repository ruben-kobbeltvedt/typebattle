<template>
  <nav>
    <ul class="flex flex-row-reverse bg-[#2c2c2c] p-4">
      <li><router-link to="/"><div class="flex border border-white rounded p-2.75"><UIcon name="i-lucide-user" class="size-6 text-[#ffffff]"/></div></router-link></li>
      <!-- <li><router-link to="/game">Game</router-link></li> -->
      <li><router-link to="/leaderboard"><div class="flex border border-white rounded p-2.75"><UIcon name="i-lucide-crown" class="size-6 text-[#ffffff]" /></div></router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Menu",
};
</script>
