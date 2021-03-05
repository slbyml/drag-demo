// 公共参数
export {configKeyMap} from './component/defalut'
import vanButton from './component/button'

// 为单独组件设置的参数
export const componentConfigMap = {
  'tzText': {
    align: {
      value: '对齐方式',
      type: 'select',
      options: ['left', 'right', 'center']
    }
  },
  ...vanButton
}