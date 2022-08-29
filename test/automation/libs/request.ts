const http = require('http');

export default function requestServer(path, method, data) {
    return new Promise((resolve, reject) => {
        let options = {
            hostname: 'api.123123.store',
            path,
            port: 80,
            method,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',

                'Origin': 'http://123123.store',
                'Referer': 'http://api.123123.store/order',
                'Sec-Fetch-Mode': 'cors',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36',

                'X-MERCHANT-ID': 'ID',
                'X-AUTH-KEY': 'KEY',
                'X-AUTH-TOKEN': 'TOKEN'
            }
        };
        let req = http.request(options, res => {
            res.setEncoding('utf8');
            res.on('data', (chunk) => {
                // console.log(`响应主体: ${chunk}`);
                let jsonData = {}
                try {
                    jsonData = JSON.parse(chunk)
                    resolve(jsonData)
                } catch (error) {
                    reject(error)
                }
            });
        })
        req.write(data);
        req.end();
    })
}
