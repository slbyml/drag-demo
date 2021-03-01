// 一个简单的对象类型
export interface objType {
  [propName: string]: any
}
// 配置文件的基本类型
export interface configItemType {
  title: string,
  component: string,
  style: {
    [propName: string]: any
  },
  id?:string, // 会在组件拖拽到工作区,为这个组件生成一个唯一id
  props?:objType[]
  [propName: string]: any
}

// 列举用到的组件
const componentsMap:objType = {
  tzBox: {
    title: '矩形',
    style: {
      width:"100px",
      height:"100px"
    }
  },
  tzButton: {
    title: '按钮'
  },
  VanButton: {
    title: 'vant-按钮',
    props: {
      text: '按钮',
      block: true,
    }
  },
  VanNavBar: {
    title: 'nav导航栏',
    style: {
      width: '100%'
    },
    props: {
      title: '标题',
      leftText: '返回',
      zIndex: 1
    }
  }
}
export const getCofig = (components:any):configItemType[] => {
  const obj = []
  const defaultComponents = Object.keys(components).filter((item:string) => {  
    return componentsMap[item]
  })

  // 获取组件的默认props参数
  const props = (component:objType):objType => {
    const propsMap = component.props
    let obj:objType = {}
    if (!component.props) return []
    for (const item of Object.keys(propsMap)) {
      obj[item] = typeof propsMap[item] === 'function' ? propsMap[item]() : propsMap[item].default
    }
    return obj
  }

  for (let i = 0; i < defaultComponents.length; i++) {
    const item = defaultComponents[i]
    const component = components[item]
    const s = componentsMap[item] ? componentsMap[item] : {}
    
    obj.push({
      component: component.name,
      ...s,
      props: { //默认参数和自定义参数合并
        ...props(component),
        ...(s.props?s.props : {})
      },
      style: {
        ...(s.style?s.style : {})
      }
    })
  }
  
  return obj
}