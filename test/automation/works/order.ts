import requestServer from '../libs/request'

export function createOrder() {
    let content = JSON.stringify({
        user_id: Math.floor(Math.random() * 100) || 5,
        product_list: JSON.stringify([
            {
                id: Math.floor(Math.random() * 500) || 5,
                quantity: Math.floor(Math.random() * 10) || 1
            }
        ])
    })
    return requestServer('/order', 'POST', content).then((res: any) => {
        console.log('创建订单成功', res)
    })
}

export function confirmOrder() {
    let content = JSON.stringify({})
    let id = Math.floor(Math.random() * 100) || 5
    return requestServer(`/order/confirm/${id}`, 'POST', content).then((res: any) => {
        console.log('提交订单成功', res)
    })
}

export function queryListOrder() {
    let content = JSON.stringify({})
    return requestServer('/order/list', 'POST', content).then((res: any) => {
        console.log('查询订单成功', res.data)
    })
}

export function queryItemOrder() {
    let content = JSON.stringify({})
    let id = Math.floor(Math.random() * 1000)
    return requestServer(`/order/${id}`, 'GET', content).then((res: any) => {
        console.log('查询订单详情成功', res.data)
    })
}
