/*包含应用中所有接口请求函数的模块*/
//登录接口
import  ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'
const BASE=""
export const reqLogin=(username,password)=>ajax(BASE+'/login',{username,password},'POST')
//添加用户
export const reqAddUser=(user)=>ajax(BASE+'/manage/user/add',user,'POST')
//查看分类
export const reqCategorys=(parentId)=>ajax(BASE+'/manage/category/list',{parentId})
//添加分类
export const reqAddCategory=(parentId,categoryName)=>ajax(BASE+'/manage/category/add',{parentId,categoryName},'POST')
//更新分类
export const reqUpdateCategory=(categoryId,categoryName)=>ajax(BASE+'/manage/category/update',{categoryId,categoryName},'POST')
//获取商品列表
export const reqProducts=(pageNum,pageSize)=>ajax(BASE+'/manage/product/list',{pageNum,pageSize})
//添加商品
export const reqAddProduct=(categoryId,pCategoryId,name)=>ajax(BASE+'/manage/product/add',{categoryId,pCategoryId,name},'POST')
//获取分类
export const reqCategory=(categoryId)=>ajax(BASE+'/manage/category/info',{categoryId})
//搜索商品  searchType:搜索类型 productName/productDesc
export const reqSearchProducts=({pageNum,pageSize,searchName,searchType})=>ajax(BASE+'/manage/product/search',{
  pageNum,
  pageSize,
  [searchType]:searchName
})
//商品的上架或者下架
export const reqUpdateStatus=(productId,status)=>ajax(BASE+'/manage/product/updateStatus',{productId,status},'POST')
//更新商品
export const reqProductUpdate=(user)=>ajax(BASE+'/manage/product/update',{user})
/*
json请求的接口请求函数
 */
export const reqWeather = (city) => {

  return new Promise((resolve, reject) => {
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
    // 发送jsonp请求
    jsonp(url, {}, (err, data) => {
      // 如果成功了
      if (!err && data.status==='success') {
        // 取出需要的数据
        const {dayPictureUrl, weather} = data.results[0].weather_data[0]
        resolve({dayPictureUrl, weather})
      } else {
        // 如果失败了
        message.error('获取天气信息失败!')
      }

    })
  })
}