// 公共参数
export const configKeyMap = {
  left: {
    value: 'X 坐标',
  },
  top: {
    value: 'Y 坐标'
  },
  width: {
    value: '宽'
  },
  height: {
    value: '高'
  },
  backgroundColor: {
    value: '背景色',
    type: 'color'
  },
  color: {
    value: '颜色',
    type: 'color'
  },
  text: {
    value: '文字'
  },
  type: {
    value: '类型',
    type: 'select'
  },
  disabled: {
    value: '是否禁用',
    type: 'switch'
  },
  url: {
    value: '链接'
  },
  plain: {
    value: "是否朴素",
    type: 'switch'
  },
  title: {
    value: '标题'
  },
  leftText: {
    value: '左侧文字'
  },
  rightText: {
    value: '右侧文字'
  },
  border: {
    value: '边框',
    type: 'switch',
  },
  leftArrow: {
    value: '左侧箭头',
    type: 'switch'
  },
  zIndex: {
    value: 'z-index',
    type: 'number'
  }
}
export interface objType {
  [propName: string]: any
}
// 为单独组件设置的参数
export const componentConfigMap:objType = {
  'van-button':{
    type: {
      value: '类型',
      type: 'select',
      options: ['primary', 'success', 'warning', 'danger']
    }
  }
}