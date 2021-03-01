import { computed } from 'vue'
import {configItemType} from '../../config'
const gap = 3
export interface allPositionTs {
  left:number[],
  top: number[],
  left2line?:number[], // 标线距离拖拽组件左侧的距离
  top2line?:number[]  // 标线距离拖拽组件上面的距离
}
export interface positionTs {
  left: number,
  top: number,
  right: number,
  bottom: number,
  xcenter: number,
  ycenter: number
}

const getPosition = (component:configItemType ):positionTs => {
  const left = parseInt(component.style.left)
  const top = parseInt(component.style.top)
  const right = left + parseInt(component.style.width)
  const bottom = top + parseInt(component.style.height)
  const xcenter =top + parseInt(component.style.height) / 2
  const ycenter = left + parseInt(component.style.width) / 2
  return {
    left,
    top,
    right,
    bottom,
    xcenter,
    ycenter
  }
}

const isNearly = (cur:number, target:number): boolean => {
  return Math.abs(cur - target) <= gap
}

export const lineStyle = (store:any) => {
  const componentsConfig = computed(() => store.getters.getComponents).value
  const currentComponent:configItemType = computed(() => store.getters.getCurrentComponent).value
  const allPosition:positionTs[] = []
  // 存储所有组件的定位
  const targetPostions:allPositionTs = {
    left: [0, parseInt(store.getters.getCanvas.width)],
    top: [0, parseInt(store.getters.getCanvas.height)]
  }
  
  componentsConfig.forEach( (item:configItemType)  => {
    if (item !== currentComponent) {
      allPosition.push(getPosition(item))
    }
  });  

  allPosition.forEach(item => {
    targetPostions.left.push(
      item.left,
      item.ycenter,
      item.right
    )
    targetPostions.top.push(
      item.top,
      item.xcenter,
      item.bottom
    )
  });
  
  return (xline:HTMLElement | null, yline:HTMLElement | null) => {
    // if (!allPosition.length) return false;
    const currentPosition:positionTs = getPosition(currentComponent)
    const samePostion:any = {}    
    const currentPostion:allPositionTs= {
      left: [currentPosition.left, currentPosition.ycenter, currentPosition.right],
      top: [currentPosition.top, currentPosition.xcenter, currentPosition.bottom],
      left2line: [0, parseInt(currentComponent.style.width) / 2, parseInt(currentComponent.style.width)],
      top2line: [0, parseInt(currentComponent.style.height) / 2, parseInt(currentComponent.style.height)],
    }

    // 计算Y轴的标线
    for (var index = 0; index < currentPostion.left.length; index++) {
      const current = currentPostion.left[index];
      samePostion.left = targetPostions.left.find(item => {
        return isNearly(current, item)
      })
      if (samePostion.left !== undefined) {
        samePostion.leftLine = samePostion.left // 标识线的位置
        samePostion.left -= (currentPostion.left2line ? currentPostion.left2line[index] : 0) // 拖拽组件的位置
        break
      };
    }

    // 计算X轴的标线
    for (var index = 0; index < currentPostion.top.length; index++) {
      const current = currentPostion.top[index];
      samePostion.top = targetPostions.top.find(item => {
        return isNearly(current, item)
      })
      
      if (samePostion.top !== undefined) {
        samePostion.topLine = samePostion.top // 标识线的位置
        samePostion.top -= (currentPostion.top2line ? currentPostion.top2line[index] : 0) // 拖拽组件的位置
        break
      };
    }
    if (yline && xline) {
      yline.style.display = "none"
      xline.style.display = 'none'
      // 显示Y轴标线
      if (samePostion.left !== undefined) {
        yline.style.display = "block"
        yline.style.left = samePostion.leftLine + 'px'
        store.commit('updateCurrentStyle', {
          left: samePostion.left + 'px'
        })
      }
      // 显示X轴标线
      if (samePostion.top !== undefined) {
        xline.style.display = "block"
        xline.style.top = samePostion.topLine + 'px'
        store.commit('updateCurrentStyle', {
          top: samePostion.top + 'px'
        })
      }
    }
  }
  
}