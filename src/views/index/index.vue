<template>
  <tz-left :component-config="config" />
  <tz-content />
  <tz-right />
  <el-button type="primary" class="view" @click="open">预览</el-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, isProxy, toRaw } from 'vue'
import {useStore} from 'vuex'
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
  setup(props, content) {
    const store = useStore()
    // 获取所有全局注册的组件
    const internalInstance = getCurrentInstance()
    const config = getCofig(internalInstance && internalInstance.appContext.components)
    const canvasConfig = store.getters.getCanvas

    const open = () => {
      const style = {
        width: canvasConfig.style.width,
        height: canvasConfig.style.height
      }
      const components = store.getters.getComponents
      internalInstance?.appContext.config.globalProperties.$alert(`<div class='box' style="width:${style.width};height:${style.height}"><iframe src='/#/iframe' class="iframe" ></iframe></div>`, {
        showConfirmButton: false,
        showClose: false,
        customClass: 'iframeBox',
        closeOnClickModal: true,
        dangerouslyUseHTMLString: true
      })
      const iframe = document.querySelector('.iframe') as HTMLIFrameElement
      iframe.onload = () => {
        if (iframe.contentWindow) {
          iframe.contentWindow.postMessage(toRaw(components),'*')
        }

      }
    }

    return {
      config,
      open
    }
  }
})
</script>

<style scoped>
.view{
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>