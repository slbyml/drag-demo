<template>
  <tz-left :component-config="config" />
  <tz-content />
  <tz-right />
  <el-button type="primary" class="view" @click="open">预览</el-button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, toRaw } from 'vue'
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
  setup() {
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
      const url = import.meta.env.PROD ? '/drag-demo/dist/index.html#/iframe' : '/#/iframe'
      internalInstance?.appContext.config.globalProperties.$alert(`<div class='box' style="width:${style.width};height:${style.height}"><iframe src='${url}' class="iframe" ></iframe></div>`, '如果页面没有效果,请关闭弹窗,重新点击预览', {
        showConfirmButton: false,
        showClose: false,
        customClass: 'iframeBox',
        closeOnClickModal: true,
        dangerouslyUseHTMLString: true,
        callback() {}
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