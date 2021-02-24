import { createStore } from 'vuex'
import {configItemType} from '../config'

export interface state {
  components: configItemType[],
  [propName: string]: any
}


const store = createStore({
  state () {
    return {
      components: []
    }
  },
  mutations: {
    addComponents (state:state, data) {
      state.components.push(data)
    },
    // 更新组件的样式
    updateStyle(state:state, {index, style}) {
      const defaultStyle = state.components[index].style
      
      state.components[index].style = {
        ...defaultStyle,
        ...style
      }
      console.log(state.components[index]);
      
    }
  },
  getters: {
    getComponents( state:state) {
      return state.components
    }
  }
})

export default store