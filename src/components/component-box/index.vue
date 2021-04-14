<template>
  <div class="item" :class="{activeComponent: isActive}" :style="componentsConfig.style" ref="component" @click="activeComponent">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Prop, computed } from 'vue'
import {useStore} from 'vuex'

export default defineComponent({
  name: 'componentBox',
  props: {
    componentsConfig: {
      type: Object,
      required: true,
      default() {
        return {}
      }
    } as Prop<any>,
    index: {
      type: Number,
      default: 0
    } as Prop<number>
  },
  emits: ['onComponent'],
  setup (props, context) {
    const component = ref<HTMLDivElement | null>(null)
    const store = useStore()
    const currentComponent = computed(() => store.getters.getCurrentComponent)
    onMounted(() => {   
      // 将新添加组件的宽高放到配置中
      const dom:any = component.value;
      const style:any = (dom as HTMLElement).getBoundingClientRect()
      const canvasWidth = computed(() => {store.getters.getCanvas.style.width})
      const height = style.height ? style.height + 'px' : '50px'
      const width = style.width ? style.width + 'px' : canvasWidth
      store.commit('updateStyle', {
        index: props.index, 
        style: {
          height,
          width
        }
      })
    })

    const activeComponent = (e:Event):void => {
      context.emit('onComponent', props.index)
      e.stopPropagation()
    }

    const isActive = computed(() => {      
      return currentComponent.value && currentComponent.value.id === props.componentsConfig.id
    })

    return {
      component,
      currentComponent,
      activeComponent,
      isActive
    }
  }
})
</script>

<style scoped>
  .item{
    position: absolute;
  }
</style>