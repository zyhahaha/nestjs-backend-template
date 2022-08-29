const https = require('https');

export function requestServerIspa(path, method, cookie, data) {
    return new Promise((resolve, reject) => {
        let options = {
            hostname: 'mall.ispacechina.com',
            path,
            port: 443,
            method,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Origin': 'https://mall.ispacechina.com',
                'Referer': 'https://mall.ispacechina.com/',
                'Sec-Fetch-Mode': 'cors',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',
                'auth-token': '111',
                'Cookie': cookie
            }
        };
        let req = https.request(options, res => {
            let dataStr = ''
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                dataStr += chunk
                // console.log(`响应主体: ${chunk}`);
            });
            res.on('end', () => {
                // console.log('end: ', dataStr)
                let jsonData = {}
                try {
                    jsonData = JSON.parse(dataStr)
                    resolve(jsonData)
                } catch (error) {
                    reject(error)
                }
            })
        })
        req.write(data);
        req.end();
    })
}

export function requestServerDjh() {
    return new Promise((resolve, reject) => {
        
    })
}
