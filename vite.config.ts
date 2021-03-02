import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'


// https://vitejs.dev/config/
// export default defineConfig({
//   base: "",
//   plugins: [vue()]
// })
export default ({ command, mode }) => {
  const config = {
    base: '/',
    plugins: [vue()],
  }
  if (command === 'build') {
    config.base = '/drag-demo/dist/' 
  }
  return config
}
