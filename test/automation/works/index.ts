import { createUser } from './user'
import { createGoods, queryListGoods, queryItemGoods } from './goods'
import { createCart, queryListCart } from './cart'
import { createOrder, confirmOrder, queryListOrder, queryItemOrder } from './order'

function delayFn(fn, wh = 100) {
    const delay = Math.floor(Math.random() * wh)
    setTimeout(() => {
        fn().then(res => delayFn(fn, delay)).catch(err => delayFn(fn, delay))
    }, delay)
}

export default class Works {
    constructor() { }
    init() {
        delayFn(createUser, 3000)
        delayFn(createGoods, 3000)
    }
    run() {
        this.init()
        this.runUser()
        this.runGoods()
        this.runCart()
        this.runOrder()
    }
    runUser() {
        delayFn(createUser, 1000 * 60 * 60 * 8) // 0到8小时之间
    }
    runGoods() {
        delayFn(queryListGoods, 5000)
        delayFn(queryItemGoods, 5000)
    }
    runCart() {
        delayFn(createCart, 5000)
        delayFn(queryListCart, 5000)
    }
    runOrder() {
        delayFn(createOrder, 5000)
        delayFn(confirmOrder, 5000)
        delayFn(queryListOrder, 5000)
        delayFn(queryItemOrder, 5000)
    }
}

