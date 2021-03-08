import { createStore } from 'vuex'
import {configItemType, animationItemTs} from '../types'
import { generateID } from '../utils'
export interface state {
  canvasConfig:{
    style: {
      width: string,
      height: string,
      backgroundColor: string,
      [propName: string]: any
    },
    props: any
  },
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
      store.commit('addCurrentComponent', state.components[state.components.length - 1])
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
    // 为当前组件添加动画
    addCurrentAnimation(state:state, animation:animationItemTs) {
      state.currentComponent?.animates.push({
        ...animation,
        id:generateID()
      })
    },
    // 移除当前组件的指定动画
    delCurrentAnimation(state:state, index:number) {
      state.currentComponent?.animates.splice(index, 1)
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
    },
    // 为当前组件添加事件
    addCurrentEvent(state, data) {
      if (!state.currentComponent) return;
      if(!state.currentComponent.events) {
        state.currentComponent.events = []
      }
      state.currentComponent.events.push(data)
    },
    // 删除当前组件对应的事件
    delCurrentEvent(state:state, index:number){
      state.currentComponent?.events?.splice(index, 1)
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