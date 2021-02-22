import { createApp } from 'vue'
import App from './App.vue'
import component from './components'

// import 'tsBox' from './box/index.vue';
const app = createApp(App)
app.use(component)

app.mount('#app')
