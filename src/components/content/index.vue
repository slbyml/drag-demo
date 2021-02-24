<template>
  <div class="content" @drop="handleDrop" @dragover="handleDragOver">
    <component-box v-for="(item, key) in components" :key="item.id" :componentsConfig="item" :index='key'>
      <component :is="item.component" v-bind="item.props"></component>
    </component-box>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick } from 'vue'
import {useStore} from 'vuex'
import { generateID } from '../../utils'
import componentBox from '../component-box/index.vue'

export default defineComponent({
  name: 'tzContent',
  components: {
    componentBox,
  },
  setup () {
    const store = useStore()

    // 拖拽停止
    const handleDrop = (event:any) => {
      event.preventDefault()
      const obj = JSON.parse(event.dataTransfer.getData('componentType'))
      obj.style.top = event.offsetY - obj.style.top + 'px'
      obj.style.left = event.offsetX - obj.style.left + 'px'
      obj.id=generateID()
      
      store.commit('addComponents', obj)

    }
    const handleDragOver = (event: any) => {
      event.preventDefault()
    }
    
    return {
      components:computed(() => store.getters.getComponents) || [],
      handleDrop,
      handleDragOver,
    }
  }
})
</script>

<style scoped>
  .content{
    background-color: #fff;
    margin: 25px;
    flex: 1;
    overflow: hidden;
    position: relative;
  }
</style>