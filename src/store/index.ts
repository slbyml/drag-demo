import { createStore } from 'vuex'
import {configItemType} from '../config'

export interface state {
  canvasConfig:any,
  components: configItemType[],
  currentComponents:configItemType | null,
  [propName: string]: any
}


const store = createStore({
  state () {
    return {
      canvasConfig: { // 画布信息
        width: "500px",
        height: "600px",
        backgroundColor: "#fff"
      },
      components: [], // 画布上已经存在的组件
      currentComponents: null, // 当前正在操作的组件
    }
  },
  mutations: {
    updateCanvasConfig(state:state, config) {
      state.canvasConfig = {
        ...state.canvasConfig,
        ...config
      }
    },
    addComponents (state:state, data) {
      state.components.push(data)
    },
    // 更新组件的样式
    updateStyle(state:state, {index, style}) {
      const defaultStyle = state.components[index].style      
      state.components[index].style = {
        ...defaultStyle,
        ...style,
      }      
    },
    addCurrentComponents(state:state, data) {
      state.currentComponents = data
    }
  },
  getters: {
    getComponents( state:state) {
      return state.components
    },
    getCanvas(state: state) {
      return state.canvasConfig
    }
  }
})

export default store