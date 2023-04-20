// 用户相关的请求模块
import request from '@/utils/request'
import qs from 'qs'

interface User{
    phone: string
    password: string
}
export const login = (data: User): any => {
  return request({
    method: 'POST',
    url: 'front/user/login',
    // 如果 data 是普通对象，则Content-Type application/json
    // 如果 data 是qs.stringify(data) 转换之后的数据：key=value&key=value, 则Content-Type application/x-www-form-urlencode,
    // 如果 data 是FormData对象，则Content-Type 是multipart/form-data
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data)
  })
}

export const getUserInfo = (): any => {
  return request({
    method: 'GET',
    url: 'front/user/getInfo'
  })
}

export const logOut = (): any => {
  return request({
    method: 'POST',
    url: 'front/user/logout'
  })
}
// /front/user/
