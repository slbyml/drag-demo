import { computed } from 'vue'
import { useStore } from 'vuex'
import {configItemType} from '../../config'

export interface positionTs {
  x: number,
  y: number
}
/**
 * 组件在编辑区域的拖拽
 * @param index 当前选中组件的下标
 */
export function shapeMove() {
  const store = useStore()
  return (event: MouseEvent):void => {
    const canvasConfig = computed(() => store.getters.getCanvas).value
    const currentComponents:configItemType = computed(() => store.getters.getCurrentComponents).value
    const startStyle = {
      ...currentComponents.style
    }
    const startPosition:positionTs = {
      x: event.clientX,
      y: event.clientY
    }
    const move = (event: MouseEvent) => {
      event.stopPropagation()
      const curPostion:positionTs = {
        x: event.clientX,
        y: event.clientY
      }
      const moveX = curPostion.x - startPosition.x
      const moveY = curPostion.y - startPosition.y
      const width = parseInt(startStyle.width)
      const height = parseInt(startStyle.height)
      const maxLeft = parseInt(canvasConfig.width) - width / 2
      const maxTop = parseInt(canvasConfig.height) - height / 2
      let left = parseInt(startStyle.left) + moveX
      let top = parseInt(startStyle.top) + moveY
      // 防止组件拖拽到编辑区域外面
      left = -left > width/2 ? -width/2 : (left > maxLeft ? maxLeft : left);
      top = -top > height/2 ? -height/2 : (top > maxTop ? maxTop : top);
      const moveStyle = {
        ...startStyle,
        left: left + 'px',
        top: top + 'px'
      }
      store.commit('updateCurrentStyle', moveStyle)
    }
    // 鼠标抬起
    const end = ():void => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseup', end)
    }
  
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseup', end)
  }
}