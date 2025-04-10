import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router'

import Landing from './views/Landing.vue'
import Game from './views/Game/Game.vue'
import Leaderboard from './views/Leaderboard.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/game', component: Game },
  { path: '/leaderboard', component: Leaderboard },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});