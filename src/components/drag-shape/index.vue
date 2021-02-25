<template>
  <div class="dragWrap" :style="shapeConfig.style" @mousedown.stop.prevent="onShapeMove">
    <div v-for="item in Object.keys(pointStyle)" :class="item" :style="pointStyle[item]" @mousedown.stop.prevent="onPointMouseDown(item,$event)" @click.stop.prevent="onClickPoint"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop, computed, reactive } from 'vue'
import {useStore} from 'vuex'
import {pointStyle, pointEvent} from './shape-point'
import { shapeMove } from './shape-drag'

export default defineComponent({
  name: 'dragShape',
  setup () {
    const store = useStore()

    const shapeConfig:any = computed(() => store.getters.getCurrentComponents)

    // 点的点击事件,只是做了防冒泡处理
    const onClickPoint = () => {}
    // 八个点的拖拽缩放
    const onPointMouseDown = pointEvent()
    // 组件拖拽
    const onShapeMove = shapeMove()
    return {
      pointStyle,
      shapeConfig,
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
  outline: 1px solid #70c0ff;
  user-select: none;
}
.dragWrap > div{
  position: absolute;
  background-color: #fff;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  border: 1px solid #70c0ff;
}
</style>