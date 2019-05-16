import Mock from 'mockjs'

const List = []
const count = 100

for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock({
      id: '@increment',
      name: '商品' + '@increment',
      price: Mock.Random.float(1, 1000, 0, 2),
      img: 'https://placehold.it/200x200'
    })
  )
}

export default [
  {
    url: '/goods/list',
    type: 'post',
    response: ({ body }) => {
      const { page = 1, length = 10 } = body
      const start = (page - 1) * length + 1
      const matchList = List.slice(start, start + length)
      return {
        code: 1000,
        data: matchList
      }
    }
  },

  {
    url: '/goods/detail',
    type: 'post',
    response: ({ body }) => {
      const matchItem = List.find(item => item.id === body.id)
      return {
        code: 1000,
        data: matchItem
      }
    }
  }
]
