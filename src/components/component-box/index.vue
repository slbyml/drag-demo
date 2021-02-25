<template>
  <div class="item" :style="componentsConfig.style" ref="component" @click="activeComponent">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Prop } from 'vue'
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
  setup (props, context) {
    const component = ref(null)
    const store = useStore()
    onMounted(() => {   
      const dom:any = component.value;
      const style:any = (dom as HTMLElement).getBoundingClientRect()      
      store.commit('updateStyle', {
        index: props.index, 
        style: {
          height: style.height + 'px',
          width: style.width + 'px'
        }
      })
    })

    const activeComponent = (e:Event):void => {
      context.emit('onComponent', props.index)
      e.stopPropagation()
    }

    return {
      component,
      activeComponent
    }
  }
})
</script>

<style scoped>
  .item{
    position: absolute;
  }
</style>