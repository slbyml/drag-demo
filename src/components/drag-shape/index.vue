<template>
  <div class="line">
    <div class="xline" ref="xline"></div>
    <div class="yline" ref="yline"></div>
  </div>
  <div class="dragWrap" :style="currentComponentConfig.style" @mousedown.stop.prevent="onShapeMove" @click.stop.prevent="_ => _">
    <div v-for="item in Object.keys(pointStyle)" :class="item" :style="pointStyle[item]" @mousedown.stop.prevent="onPointMouseDown(item,$event)" @click.stop.prevent="onClickPoint"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import {useStore} from 'vuex'
import {pointStyle, pointEvent} from './shape-point'
import { shapeMouseEvent } from './shape-drag'
import { lineStyle } from './shape-line'

export default defineComponent({
  name: 'dragShape',
  setup () {
    const store = useStore()
    const xline = ref(null)
    const yline = ref(null)

    const currentComponentConfig:any = computed(() => store.getters.getCurrentComponent)

    // 点的点击事件,只是做了防冒泡处理
    const onClickPoint = () => {}
    // 八个点的拖拽缩放
    const onPointMouseDown = pointEvent()

    // 组件拖拽
    const onShapeMove = (event: MouseEvent):void => {
      // 设置拖拽的组件实时位置信息
      const shapMove = shapeMouseEvent(event, store)
      // 设置拖拽组件时的标线信息
      const lineMove = lineStyle(store)

      // 鼠标拖拽
      const translateComponent = (event:MouseEvent) => {
        shapMove(event)
        lineMove(xline.value, yline.value)        
      }
      // 鼠标抬起
      const end = ():void => {
        const xDom = xline.value as HTMLElement | null;
        const yDom = yline.value as HTMLElement | null;
        xDom && (xDom.style.display = 'none')
        yDom && (yDom.style.display = 'none')
        document.removeEventListener('mousemove', translateComponent)
        document.removeEventListener('mouseup', end)
      }
    
      document.addEventListener('mousemove', translateComponent)
      document.addEventListener('mouseup', end)
    }

    return {
      xline,
      yline,
      pointStyle,
      currentComponentConfig,
      onPointMouseDown,
      onClickPoint,
      onShapeMove
    }
  }
})
</script>

<style scoped>
.dragWrap{
  position: absolute;
  outline: 1px dashed #70c0ff;
  user-select: none;
  cursor: move;
  z-index: 999;
  /* transition:all .2s ease-out	; */
}
.dragWrap > div{
  position: absolute;
  background-color: #fff;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid #70c0ff;
}
.line > div{
  position: absolute;
  background-color: #59c7f9;
  display: none;
}
.xline{
  left: 0;
  height: 1px;
  width: 100%;
}
.yline{
  width: 1px;
  top: 0;
  height: 100%;

}
</style>