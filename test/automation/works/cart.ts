import requestServer from '../libs/request'

export function createCart() {
    let content = JSON.stringify({
        "user_id": Math.floor(Math.random() * 100),
        "product_id": Math.floor(Math.random() * 300),
        "quantity": Math.floor(Math.random() * 10) || 1
    })
    return requestServer('/cart', 'POST', content).then((res: any) => {
        console.log('添加购物车成功', res)
    })
}

export function queryListCart() {
    let content = JSON.stringify({
        "user_id": Math.floor(Math.random() * 100),
        "pageIndex": 1,
        "pageSize": 10
    })
    return requestServer('/cart/list', 'POST', content).then((res: any) => {
        console.log('查询购物车成功', res.data)
    })
}
