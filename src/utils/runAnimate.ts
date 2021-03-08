import {configItemType, animationItemTs, objType} from '../types'
function getComputedCSSText (style:objType) {
  let cssText = ''
  for (let attr in style) {
    // m <?> matched
    // #!en: hump to line
    // #!zh: 驼峰转下划线
    cssText += `${attr.replace(/[A-Z]+/g, m => `-${m.toLowerCase()}`)}:${style[attr]};`
  }
  return cssText
}


// 为组件添加动画
export default async function runAnimation(current:configItemType, store: any, el:HTMLDivElement|null) {  
  if (!el) return;
  let preClass = ""
  const play = (animate:animationItemTs) => new Promise((resolve) => {
    preClass && el?.classList.remove(preClass)
    const animationStyle = {
      // animationDuration: `${animate.duration}s`,
      animationIterationCount: animate.infinite ? 'infinite' : 1,
      animationDelay: `${animate.delay}s`,
      animationFillMode: animate.mode
    }
    preClass = `animate__${animate.value}`
    el?.classList.add(preClass, 'animate__animated')
    el.style.cssText = getComputedCSSText(animationStyle) + getComputedCSSText(current.style)

    const removeAnimation = () => {
      el?.removeEventListener('animationend', removeAnimation)
      el?.removeEventListener('animationcancel', removeAnimation)
      el.style.cssText = getComputedCSSText(current.style)
      // el?.classList.remove(`animate__${animate.value}`, 'animate__animated')
      resolve('end')
    }
      
    el?.addEventListener('animationend', removeAnimation)
    el?.addEventListener('animationcancel', removeAnimation)
  })
  // 可能存在多个动画
  for (const item of current.animates) {
    await play(item)
  }
}