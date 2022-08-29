import requestServer from '../libs/request'
import { generateUUID } from '../libs/utils'

export function createGoods() {
    let content = JSON.stringify({
        "name": generateUUID('product-', 'xxxxx-xxx-xxxxx'),
        "description": "description",
        "detail": "detail",
        "price": Math.floor(Math.random() * 500) || 1,
        "stock": Math.floor(Math.random() * 1000) || 1,
        "image": "url.png"
    })
    return requestServer('/product', 'POST', content).then((res: any) => {
        console.log('创建商品成功', res.data)
    })
}

export function queryListGoods() {
    let content = JSON.stringify({})
    return requestServer('/product/list', 'POST', content).then((res: any) => {
        console.log('查询商品成功', res.data)
    })
}

export function queryItemGoods() {
    let content = JSON.stringify({})
    let id = Math.floor(Math.random() * 1000)
    return requestServer(`/product/${id}`, 'GET', content).then((res: any) => {
        console.log('查询商品详情成功', res.data)
    })
}
