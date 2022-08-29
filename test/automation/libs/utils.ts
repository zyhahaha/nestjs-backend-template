export const generateUUID = (prefix: string = 'van-', template: string = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx') => {
    var d = new Date().getTime()
    var uuid = template.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16)
    })
    return prefix + uuid
}
