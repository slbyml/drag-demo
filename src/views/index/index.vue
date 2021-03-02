<template>
  <tz-left :component-config="config" />
  <tz-content />
  <tz-right />
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from 'vue'
import tzLeft from '../../components/left/index.vue'
import tzRight from '../../components/right/index.vue'
import tzContent from '../../components/content/index.vue'
import {getCofig} from '../../config'

export default defineComponent({
  name: 'Index',
  components: {
    tzLeft,
    tzContent,
    tzRight
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
}
</style>