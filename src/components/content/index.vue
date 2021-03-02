<template>
  <div class="content">
    <div class="canvas" @drop="handleDrop" @dragover="handleDragOver" @click.stop="onComponent('content')" :style="canvasStyle" tabIndex="0" @keyup.delete="deleteComponent">
      <component-box v-for="(item, key) in components" :key="item.id" :components-config="item" :index='key' @on-component="onComponent">
        <component :is="item.component" v-bind="item.props" />
      </component-box>
      <drag-shape v-if="currentComponent"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent} from 'vue'
import {useStore} from 'vuex'
import { generateID } from '../../utils'
import componentBox from '../component-box/index.vue'
import dragShape from '../drag-shape/index.vue'

export default defineComponent({
  name: 'tzContent',
  components: {
    componentBox,
    dragShape
  },
  setup () {
    const store = useStore()
    const components = computed(() => store.getters.getComponents)
    const currentComponent = computed(() => store.getters.getCurrentComponent)

    // 拖拽停止
    const handleDrop = (event:any):void => {
      event.preventDefault()
      const obj = JSON.parse(event.dataTransfer.getData('componentType'))
      obj.style.top = event.offsetY - obj.style.top + 'px'
      obj.style.left = event.offsetX - obj.style.left + 'px'
      obj.id=generateID()
      
      // 存储新增加的工作区内容
      store.commit('addComponents', obj)

    }
    const handleDragOver = (event: any) => {
      event.preventDefault()
    }
    
    // 点击画布是判断是否需要显示拖拽框
    const onComponent = (index:number | string) => {
      if (index === 'content' || !components) {
        // 取消选择
        store.commit('addCurrentComponent',null)        
        return
      }
      store.commit('addCurrentComponent',components.value[index])
    }

    // 删除选中的组件
    const deleteComponent = () => {
      store.commit('deleteCurrentComponent')
    }
    return {
      canvasStyle:computed(() => store.getters.getCanvas.style),
      components,
      handleDrop,
      handleDragOver,
      onComponent,
      deleteComponent,
      currentComponent
    }
  }
})
</script>

<style scoped>
.content{
  padding: 25px;
  flex: 1;
  box-sizing: border-box;
  height: 100%;
  overflow-y: auto;
}
.canvas{
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}
.canvas:focus{
  outline: none;
}
</style>