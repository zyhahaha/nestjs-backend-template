// import DNSConfig from 'src/config/dns'
const Core = require('@alicloud/pop-core');
let client = new Core({
    // accessKeyId: DNSConfig.accessKeyId,
    // accessKeySecret: DNSConfig.accessKeySecret,
    // endpoint: DNSConfig.endpoint,
    // apiVersion: DNSConfig.apiVersion
});

// 2408:8244:620:d50:e2cb:4eff:fe86:3543
export default function setDnsFn(type: string, value?: string) {
    if (!type) return ''
    if (type === 'ipv6' && !value) return '' 

    const configMap = {
        ipv6: {
            RecordId: '771791691521248256',
            RR: 'ipv6',
            Type: 'AAAA',
            Value: value
        },
        m: {
            RecordId: '767394737932480512',
            RR: 'm',
            Type: 'A',
            Value: '121.4.102.246'
        },
        cm: {
            RecordId: '767394737932480512',
            RR: 'm',
            Type: 'CNAME',
            Value: 'm-123123-store-idvjug6.qiniudns.com'
        }
    }
    if (!configMap[type]) return ''

    let params = {
        "DomainName": "123123.store",
    }
    Object.assign(params, configMap[type])
    
    let requestOption = {
        method: 'POST'
    };
    client.request('UpdateDomainRecord', params, requestOption).then((result: any) => {
        console.log('dns set----------->', JSON.stringify(result));
    }, (ex: any) => {
        console.log('dns set error----------->', ex);
    })
}
