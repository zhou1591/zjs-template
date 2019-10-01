/*
 * @Date: 2019-09-19 11:29:54
 * @information: 最后更新时间
 */
/**
 * @Author: 周靖松
 * @information: 配置axios
 * @Date: 2019-09-19 11:30:44
 */
import axios from 'axios'

let path = {
  development: ` `,
  lan: ` `,
  pred: ` `,
  production: ` `
}
let token = {
  development: ` `,
  lan: window.token || "",
  pred: window.token || "",
  production: window.token || ""
}
const ENV = process.env.NODE_ENV
export default class InitAxios {
  constructor() {
    //   基础url
    this.baseURL = path[ENV]
    //   token
    this.token = token[ENV]
    //   成功响应状态码
    this.successCode = [1000, 200]
    //  推出登陆状态码
    this.logoutCode = [ ]
    //  允许的对象类型
    this.successProp = [ArrayBuffer]
  }
  /**
   * @Author: 周靖松
   * @information: 请求拦截
   * @Date: 2019-09-19 11:45:02
   */
  requestFun(request){
    request.headers.token = this.token
    return request
  }
  /**
   * @Author: 周靖松
   * @information: 响应拦截
   * @Date: 2019-09-19 11:46:10
   */
  responseFun(response){
    let { data,headers }=response
    let { statusCode , message } = data;
    let { pragma } = headers
    let isSuccess = this.responseVerify(data)
    // let isLogout = this.isLogout(statusCode)
    // isLogout&&window.logout()
    if (isSuccess) {
        // 赋值token
        window.token = pragma || ''
        return Promise.resolve(data)
    } 
    this._messageShow("error", message)
    return Promise.reject(data)   
  }
  /**
   * @Author: 周靖松
   * @information: 请求失败回调
   * @Date: 2019-09-19 13:56:02
   */
  errorFun(){
    // this._messageShow("error", '500')
  }
  /**
   * @Author: 周靖松
   * @information: 校验返回头
   * @Date: 2019-09-19 13:46:56
   */
  responseVerify(data){
    let { statusCode } = data;
    return this.verifyProp(data)||this.verifyCode(statusCode)
  }
  /**
   * @Author: 周靖松
   * @information: 校验状态码
   * @Date: 2019-09-19 11:55:06
   */
  verifyCode(statusCode){
    return this.successCode.includes(statusCode)
  }
  /**
   * @Author: 周靖松
   * @information: 校验拦截对象
   * @Date: 2019-09-19 11:55:06
   */
  verifyProp(data){
    return this.successProp.map(el=>{
        return data instanceof el
    }).includes(true)
  }
  /**
   * @Author: 周靖松
   * @information: 退出登陆校验
   * @Date: 2019-09-19 13:52:57
   */
  isLogout(statusCode){
    return this.logoutCode.includes(statusCode)
  }
  /**
   * @Author: 周靖松
   * @information: 配置axios
   * @Date: 2019-09-19 11:45:17
   */
  init() {
    let { requestFun , responseFun , errorFun } = this
    // 基础url
    axios.defaults.baseURL = path[ENV];
    // 默认时间
    axios.defaults.timeout = 60000
    // 请求拦截
    axios.interceptors.request.use(requestFun.bind(this),errorFun)
    // 响应拦截
    axios.interceptors.response.use(responseFun.bind(this),errorFun)
  }
}





