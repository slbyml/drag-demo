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
  animates: animationItemTs[],
  events?:objType,
  id?:string, // 会在组件拖拽到工作区,为这个组件生成一个唯一id
  props?:objType[]
  [propName: string]: any
}


export interface animationBaseTs {
  label: string,
  value: string
}
export interface animationItemTs extends animationBaseTs {
  delay: number, // 延迟时间
  mode: string, // 动画开始和结束样式
  infinite: boolean,  // 是否是无限动画
  [propName: string]: any
}

export interface animationBoxTs {
  label: string,
  value: animationItemTs[]

}

// 动画类型
export interface animationTabsTs {
  in: animationBoxTs,
  out: animationBoxTs,
  other: animationBoxTs
}