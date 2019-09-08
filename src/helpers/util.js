export function dateFormat(dateStr) {
    let dateObj = typeof dateStr === 'Object' ? dateStr : new Date(dateStr)
    let time = dateObj.getTime()
    let now = Date.now()
    let diff = now - time
    let str

    switch (true) {
        case diff < 1000 * 60:
            str = '刚刚'
            break
        case diff < 1000 * 3600:
            str = Math.floor(diff / (1000 * 60)) + '分钟前'
            break
        case diff < 1000 * 3600 * 24:
            str = Math.floor(diff / (1000 * 3600)) + '小时前'
            break
        default:
            str = Math.floor(diff / (1000 * 3600 * 24)) + '天前'
    }
    return str
}