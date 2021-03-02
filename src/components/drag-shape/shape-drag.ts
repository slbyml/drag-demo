import { computed } from 'vue'
import {configItemType} from '../../config'

export interface positionTs {
  x: number,
  y: number
}
/**
 * 组件在编辑区域的拖拽
 */
export function shapeMouseEvent(event:MouseEvent, store:any) {
  const canvasConfig = computed(() => store.getters.getCanvas).value.style
  const currentComponent:configItemType = computed(() => store.getters.getCurrentComponent).value
  const startStyle = {
    ...currentComponent.style
  }
  const startPosition:positionTs = {
    x: event.clientX,
    y: event.clientY
  }
  return function mouseMove(event: MouseEvent) {
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
}