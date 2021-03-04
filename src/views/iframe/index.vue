<template>
  <div class="page">
    <div v-for="(item, key) in components" :key="item.id" class="item" :style="item.style" :ref="componentEl">
      <component :is="item.component" v-bind="item.props"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, nextTick } from 'vue'
import {useStore} from 'vuex'
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

    return {
      componentEl,
      components,
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