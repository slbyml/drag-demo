<template>
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <tz-list></tz-list>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import tzList from './components/list/index.vue'

export default defineComponent({
  name: 'App',
  components: {
    tzList,
  },
  setup() {
    let num = ref<number>(0)
    const add = () => {
      return ++num.value
    }
    return {
      num,
      add
    }
  }
})
</script>

<style>
body,html{
  height: 100%;
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
  flex-direction: column;
}
</style>