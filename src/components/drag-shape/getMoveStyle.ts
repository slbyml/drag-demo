export enum selectTs {
  lt = 'lt',
  rt = 'rt',
  lb = 'lt',
  rb = 'rt',
  l = 'l',
  t = 't',
  r = 'r',
  b = 'b'
}
export interface positionTs {
  x: number,
  y: number
}

export interface objType {
  height: string,
  width: string,
}

export interface styleType extends objType{
  left: string,
  top: string,
  [propName: string]: any
}

// 防止组件缩小到宽高为0
const minNum = 2

const pointMap = {
  lt(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveY = startPosition.y - curPostion.y
    const moveX = startPosition.x - curPostion.x  
    const maxWidth = parseInt(style.left) + parseInt(style.width)
    const maxHeight = parseInt(style.top) + parseInt(style.height)
    let left = parseInt(style.left) - moveX
    let top = parseInt(style.top) - moveY
    let width = parseInt(style.width) + moveX
    let height = parseInt(style.height) + moveY
    width = width < minNum ? minNum : (width > maxWidth ? maxWidth : width)
    height = height < minNum ? minNum : (height > maxHeight ? maxHeight : height)
    left = left < 0 ? 0 : (left > maxWidth - minNum ? maxWidth - minNum : left)
    top = top < 0 ? 0 : (top > maxHeight - minNum ? maxHeight - minNum : top)

    return {
      ...style,
      left: left + 'px',
      top: top+ 'px',
      height: height + 'px',
      width: width + 'px',
    }
    
  },
  rt(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveY = startPosition.y - curPostion.y
    const moveX = curPostion.x - startPosition.x
    const maxWidth = parseInt(canvasConfig.width) - parseInt(style.left)
    const maxHeight = parseInt(style.top) + parseInt(style.height)
    let top = parseInt(style.top) - moveY
    let width = parseInt(style.width) + moveX
    let height = parseInt(style.height) + moveY    
    width = width < minNum ? minNum : (width > maxWidth ? maxWidth : width)
    height = height < minNum ? minNum : (height > maxHeight ? maxHeight : height)
    top = top < 0 ? 0 : (top > maxHeight - minNum ? maxHeight -minNum : top)

    return {
      ...style,
      top: top+ 'px',
      height: height + 'px',
      width: width + 'px',
    }
  },
  lb(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveY = curPostion.y - startPosition.y 
    const moveX = startPosition.x - curPostion.x
    const maxWidth = parseInt(style.left) + parseInt(style.width)
    const maxHeight = parseInt(canvasConfig.height) - parseInt(style.top)
    let left = parseInt(style.left) - moveX
    let width = parseInt(style.width) + moveX
    let height = parseInt(style.height) + moveY    
    width = width < minNum ? minNum : (width > maxWidth ? maxWidth : width)
    height = height < minNum ? minNum : (height > maxHeight ? maxHeight : height)
    left = left < 0 ? 0 : (left > maxWidth - minNum ? maxWidth -minNum : left)

    return {
      ...style,
      left: left + 'px',
      height: height + 'px',
      width: width + 'px',
    }
    
  },
  rb(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveY = curPostion.y - startPosition.y 
    const moveX = curPostion.x - startPosition.x
    const maxWidth = parseInt(canvasConfig.width) - parseInt(style.left)
    const maxHeight = parseInt(canvasConfig.height) - parseInt(style.top)
    let width = parseInt(style.width) + moveX
    let height = parseInt(style.height) + moveY    
    width = width < minNum ? minNum : (width > maxWidth ? maxWidth : width)
    height = height < minNum ? minNum : (height > maxHeight ? maxHeight : height)

    return {
      ...style,
      height: height + 'px',
      width: width + 'px',
    }
    
  },
  l(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveX = startPosition.x - curPostion.x  
    const maxWidth = parseInt(style.left) + parseInt(style.width)
    let left = parseInt(style.left) - moveX
    let width = parseInt(style.width) + moveX
    width = width < minNum ? minNum : (width > maxWidth ? maxWidth : width)
    left = left < 0 ? 0 : (left > maxWidth - minNum ? maxWidth - minNum : left)
    return {
      ...style,
      left: left + 'px',
      width: width + 'px'
    }
  },
  t(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveY = startPosition.y - curPostion.y  
    const maxHeight = parseInt(style.top) + parseInt(style.height)
    let top = parseInt(style.top) - moveY
    let height = parseInt(style.height) + moveY
    height = height < minNum ? minNum : (height > maxHeight ? maxHeight : height)
    top = top < 0 ? 0 : (top > maxHeight - minNum ? maxHeight -minNum : top)
    return {
      ...style,
      top: top + 'px',
      height:height + 'px'
    }
  },
  r(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveX = curPostion.x - startPosition.x
    let width = parseInt(style.width) + moveX
    const maxWidth = parseInt(canvasConfig.width) - parseInt(style.left)
    width = width < minNum ? minNum : (width > maxWidth ? maxWidth : width)
    return {
      ...style,
      width: width + 'px'
    }
  },
  b(startPosition:positionTs, curPostion:positionTs, style:styleType, canvasConfig: objType) {
    const moveY = curPostion.y - startPosition.y
    let height = parseInt(style.height) + moveY
    const maxHeight = parseInt(canvasConfig.height) - parseInt(style.top)
    height = height < minNum ? minNum : (height > maxHeight ? maxHeight : height)
    return {
      ...style,
      height: height + 'px'
    }
    
  }
}

/**
 * 8个拖拽点的计算逻辑
 * @param item 当前拖拽点的位置
 * @param startPosition 鼠标开始的位置信息
 * @param curPostion 鼠标移动的位置信息
 * @param style 当前选中组件的配置信息
 * @param canvasConfig 画布配置信息
 */
export function getMoveStyle(item:selectTs, startPosition:positionTs,curPostion:positionTs, style:styleType, canvasConfig: objType):any {
  return pointMap[item](startPosition, curPostion, style, canvasConfig)
}