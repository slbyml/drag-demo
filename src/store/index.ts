import { createStore } from 'vuex'
import {configItemType} from '../config'

export interface state {
  canvasConfig:any,
  components: configItemType[],
  currentComponent:configItemType | null,
  [propName: string]: any
}


const store = createStore({
  state () {
    return {
      canvasConfig: { // 画布信息
        style: {
          width: "414px",
          height: "736px",
          backgroundColor: "#fff"
        },
        props: {}
      },
      components: [], // 画布上已经存在的组件
      currentComponent: null, // 当前正在操作的组件
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
    // 更新当前选中组件的样式
    updateCurrentStyle(state:state, style) {      
      if (!state.currentComponent) return;
      const defaultStyle = state.currentComponent.style
      state.currentComponent.style = {
        ...defaultStyle,
        ...style
      }
    },
    // 删除当前组件
    deleteCurrentComponent(state: state) {
      if (!state.currentComponent || state.components.length <= 0) return
      for (let index = 0; index < state.components.length; index++) {
        const item = state.components[index];
        if (item === state.currentComponent) {
          state.components.splice(index, 1)
          store.commit('addCurrentComponent', null)
          return void(0)
        }
      }

    },
    addCurrentComponent(state:state, data) {
      state.currentComponent = data
    }
  },
  getters: {
    getComponents( state:state) {
      return state.components
    },
    getCurrentComponent(state:state) {
      return state.currentComponent
    },
    getCanvas(state: state) {
      return state.canvasConfig
    }
  }
})

export default store