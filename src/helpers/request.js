import axios from 'axios'
import baseURLConfig from './config-baseURL'
import { Message } from 'element-ui'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURLConfig.baseURL
axios.defaults.withCredentials = true

export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        let option = {
            url,
            method: type,
            validateStatus(status) {
                return (status >= 200 && status < 300) || status === 400
            }
        }
        if (type.toLowerCase() === 'get') {
            option.params = data
        } else {
            option.data = data
        }
        axios(option).then(response => {
            if (response.status === 200) {
                resolve(response.data)
            } else {
                Message.error(response.data.msg)
                reject(response.data)
            }
        }).catch(error => {
            Message.error('网络异常')
            reject({ message: error })
        })
    })
}