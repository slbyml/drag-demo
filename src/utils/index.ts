export function deepClone<T>(target: T):T {
  if (typeof target == 'object') {
    const result:any = Array.isArray(target)? [] : {}
    for (const key in target) {
      if (typeof target[key] == 'object') {
        result[key] = deepClone(target[key])
      } else {
        result[key] = target[key]
      }
    }
  return result
  }
  return target
}
// 生产随机ID
export function generateID():string {
  return `${Number(Math.random().toString().substr(3,length) + Date.now()).toString(36)}`
}