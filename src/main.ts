import { createApp } from 'vue'
import App from './App.vue'
import Store from './store'
import Vant from 'vant';
import 'vant/lib/index.css';
import component from './custom-component'

// import 'tsBox' from './box/index.vue';
const app = createApp(App)
app.use(Store)
app.use(Vant);
app.use(component)

app.mount('#app')
