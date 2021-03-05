<template>
  <div class="page">
    <div v-for="(item, key) in components" :key="item.id" class="item" :style="item.style" :ref="componentEl" @click="onComponent($event, item)">
      <component :is="item.component" v-bind="item.props"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import {useStore} from 'vuex'
import { Dialog } from 'vant'
import componentBox from '../../components/component-box/index.vue'
import runAnimation from '../../utils/runAnimate'
import {configItemType} from '../../config/index'

export default defineComponent({
  components: {
    componentBox,
  },
  setup () {
    const store = useStore()
    let num = 0
    const parentMessage:any = reactive([])
    const domArr:HTMLDivElement[] = []
    window.addEventListener('message', function(e) {
      parentMessage.value = e.data
    })
    const components = computed(() => {
      return parentMessage.value || []
    })
    
    const componentEl = (el:HTMLDivElement) => {      
      components.value && runAnimation(components.value[num], store, el)
      num++
    }

    // 处理组件的点击事件
    const onComponent = async (event:MouseEvent,cur:configItemType) => {
      const events = []
      if (!cur.events) return;
      for (let index = 0; index < cur.events.length; index++) {
        const event = cur.events[index];
        // 跳转
        if (event.method === 'href' && event.href) {
          events.push(() => new Promise((resolve) => {
            window.location.href = event.href
            resolve(void(0))
          }))
        }
        // 弹窗
        if (event.method=== 'alert' && event.dialog.message) {
          events.push(() => Dialog.alert({
            title: event.dialog.title,
            message: event.dialog.message,
            showCancelButton: event.dialog.showCancelButton
          }))
        }
      }
      for (const item of events) {
        await item()
      }

    }

    return {
      componentEl,
      components,
      onComponent
    }
  }
})
</script>

<style scoped>
.page{
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  position: relative;
}
.item {
  position: absolute;
}
</style>