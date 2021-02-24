<template>
  <div class="left">
    <div v-for="(item, key) in componentConfig" :key="key"  class="item" @dragstart="handleDrag($event, key)" @dragend="handleDragEnd" draggable="true">
      {{item.title}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop } from 'vue'
import {configItemType} from '../../config'

export default defineComponent({
  name: 'tz-list',
  props: {
    componentConfig: {
      type: Array,
      required: true,
      default() {
        return []
      }
    } as Prop<configItemType[]>,
  },
  setup(prop) {
    const handleDrag = (event:any, key: number ) => {
      let dragComponent = prop.componentConfig && prop.componentConfig[key]
      
      // 优化,限制组件在画布松开时的定位
      dragComponent && (dragComponent.style.top = event.offsetY);
      dragComponent && (dragComponent.style.left = event.offsetX);
      
      event.dataTransfer.setData('componentType', JSON.stringify(dragComponent))
      event.target.style.opacity='0.5'
    }
    const handleDragEnd = (event:any) => {
      event.target.style.opacity='1'
    }

    return {
      handleDrag,
      handleDragEnd
    }
  }
})
</script>

<style scoped>
  .left{
    flex-basis:200px;
    border-right: 1px #f1f1f1 solid;
    background-color: #fff;
  }
  .item{
    box-sizing: border-box;
    padding: 0 10px;
    margin: 5px;
    height: 50px;
    min-width: 50px;
    display: inline-block;
    background-color: #f5f5f5;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    cursor: move;
    -webkit-user-select: none;
  }
</style>