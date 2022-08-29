import requestServer from '../libs/request'
import { generateUUID } from '../libs/utils'

export function createUser() {
    let content = JSON.stringify({
        accountName: generateUUID('user-', 'xxxxx-xxx-xxxxx'),
        password: '1234',
        repassword: '1234',
        mobile: '18312341234'
    })
    return requestServer('/user/register', 'POST', content).then((res: any) => {
        console.log('注册成功', res)
    })
}
