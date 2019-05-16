// 序列化对象
export default object => {
  const arr = []
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      const value = object[key]
      arr.push(`${key}=${value}`)
    }
  }
  return arr.join('&')
}
