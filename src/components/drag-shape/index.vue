<template>
  <div class="dragWrap" :style="shapeConfig.style">
    <div v-for="item in Object.keys(pointStyle)" :class="item" :style="pointStyle[item]" @mousedown.stop.prevent="onMouseDown(item,$event)" @click.stop.prevent="onClickPoint"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Prop, reactive, computed } from 'vue'
import {useStore} from 'vuex'
import {getMoveStyle, selectTs, positionTs} from './getMoveStyle'

export default defineComponent({
  name: 'dragShape',
  props: {
    currentIndex: {
      type: Number,
      required: true,
      default: 0
    } as Prop<number>
  },
  setup (props) {
    const store = useStore()
    const pointHalf = 8 / 2

    const shapeConfig:any = computed(() => store.getters.getComponents[props.currentIndex || 0])
    const canvasConfig = computed(() => store.getters.getCanvas)
    const pointStyle = reactive({
      lt:{
        left:`-${pointHalf}px`,
        top: `-${pointHalf}px`,
        cursor: 'nw-resize'
      },
      rt:{
        right: `-${pointHalf}px`,
        top: `-${pointHalf}px`,
        cursor: 'ne-resize'
      },
      lb: {
        left:`-${pointHalf}px`,
        bottom: `-${pointHalf}px`,
        cursor: 'sw-resize'
      },
      rb: {
        right: `-${pointHalf}px`,
        bottom: `-${pointHalf}px`,
        cursor: 'se-resize'
      },
      l: {
        left: `-${pointHalf}px`,
        top: "calc(50% - 4px)",
        cursor: 'w-resize'
      },
      t: {
        left: "calc(50% - 4px)",
        top: `-${pointHalf}px`,
        cursor: 'n-resize'
      },
      r: {
        right: `-${pointHalf}px`,
        top: "calc(50% - 4px)",
        cursor: 'e-resize'
      },
      b: {
        left: "calc(50% - 4px)",
        bottom: `-${pointHalf}px`,
        cursor: 's-resize'
      }
    })

    // 点的点击事件,只是做了防冒泡处理
    const onClickPoint = () => {}
    const onMouseDown = (item: selectTs, event: MouseEvent):void => {
      let startPosition:positionTs = {
        x: event.clientX,
        y: event.clientY
      }
      const startStyle = {
        ...shapeConfig.value.style
      }
      // 鼠标按下并移动
      const move = (event:MouseEvent) => {
        
        event.stopPropagation()
        const curPostion:positionTs = {
          x: event.clientX,
          y: event.clientY
        }
        const newStyle = getMoveStyle(item, startPosition, curPostion, startStyle, canvasConfig.value)
        store.commit('updateStyle', {
          index: props.currentIndex, 
          style: newStyle
        })
        
      }
      // 鼠标抬起
      const end = ():void => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', end)
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', end)
    }
    return {
      pointStyle,
      shapeConfig,
      onMouseDown,
      onClickPoint,
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