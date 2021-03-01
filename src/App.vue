<template>
  <tz-left :component-config="config" />
  <tz-content />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import tzLeft from './components/list/index.vue'
import tzContent from './components/content/index.vue'
import {getCofig} from './config'

export default defineComponent({
  name: 'App',
  components: {
    tzLeft,
    tzContent
  },
  setup() {
    // 获取所有全局注册的组件
    const internalInstance = getCurrentInstance()
    const config = getCofig(internalInstance && internalInstance.appContext.components)
    return {
      config
    }
  }
})
</script>

<style>
body,html{
  height: 100%;
  padding: 0;
  margin: 0;
  -moz-user-select: none;
  background-color: #f9f9f9;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
}
</style>