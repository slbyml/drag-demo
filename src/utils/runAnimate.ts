import {configItemType} from '../config/index'
import {animationItemTs} from '../config/animate'

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
    store.commit('updateCurrentStyle', {
      ...animationStyle
    })

    const removeAnimation = () => {
      el?.removeEventListener('animationend', removeAnimation)
      el?.removeEventListener('animationcancel', removeAnimation)
      // el?.classList.remove(`animate__${animate.value}`, 'animate__animated')
      resolve('end')
    }
      
    el?.addEventListener('animationend', removeAnimation)
    el?.addEventListener('animationcancel', removeAnimation)
  })
  for (const item of current.animates) {
    await play(item)
  }
}