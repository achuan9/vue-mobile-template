export const STATUS = [
  {label: '已审核', value: 0}, 
  {label: '未审核', value: 1}
]

export default  (val) => {
  if (!val && val !== 0) {
    return val
  }
  const matchItem = STATUS.find(item => item.value === Number(val));
  return matchItem && matchItem.label || val
}