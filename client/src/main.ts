import { createApp } from 'vue'
import { router } from './router'
import './style.css'
import ui from '@nuxt/ui/vue-plugin'
import App from './App.vue'

const app = createApp(App)

// Plugins
app.use(ui);
app.use(router);

app.mount('#app')