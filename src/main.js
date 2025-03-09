/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Import our store and router
import store from './store'
import router from './router'

const app = createApp(App)

// Register plugins
registerPlugins(app)

// Use store and router
app.use(store)
app.use(router)

app.mount('#app')
