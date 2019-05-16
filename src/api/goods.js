import request from '@/utils/request'
/**
 * 商品模块
 */

// 商品列表
export function goodsList({ start, length }) {
  return request({
    url: 'goods/list',
    method: 'post',
    data: { start, length }
  })
}
// 商品详情
export function goodsDetail({ id }) {
  return request({
    url: 'goods/detail',
    method: 'post',
    data: { id }
  })
}
// 商品购买
export function goodsBuy({ id }) {
  return request({
    url: 'goods/buy',
    method: 'post',
    data: { id }
  })
}

