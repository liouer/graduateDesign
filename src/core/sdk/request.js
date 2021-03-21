import { axios } from '@/router/index.js';
import qs from 'qs'

// 默认配置
axios.defaults.timeout = 60000
axios.defaults.baseURL = '/api'
// axios.defaults.headers['Content-Type'] = 'application/json'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.withCredentials = true

// 接口请求
const request = axios

export { request }