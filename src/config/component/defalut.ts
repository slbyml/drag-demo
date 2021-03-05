export interface objType {
  [propName: string]: {
    value: string,
    type?:string,
    [propName: string]: any
  }
}
// 公共参数
export const configKeyMap:objType = {
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
  lineHeight: {
    value: '行高'
  },
  fixed: {
    value: '固定',
    type: 'switch'
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
    value: '文本',
    type: 'textarea'
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
