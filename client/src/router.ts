import { createMemoryHistory, createRouter } from 'vue-router'

import Landing from './views/Landing.vue'
import Game from './views/Game.vue'
import Leaderboard from './views/Leaderboard.vue'

const routes = [
  { path: '/', component: Landing },
  { path: '/game', component: Game },
  { path: '/leaderboard', component: Leaderboard },
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
});