import request from '../config/request.js'
import config from '../config/index.js'
// demo---get
export const getDemo = (params) => request({url: 'www.baidu.com', method: 'GET', params: params})
// demo---post
export const postDemo = (params) => request({url: 'www.baidu.com', method: 'POST', data: params})

const header = {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
}
// 搜索音乐
export const searchMusic = (data) => request({url: config.musicUrl, method: 'POST', data: data, header})

// 城市搜索API提供全球地理位位置、全球城市搜索服务，支持经纬度坐标反查、多语言、模糊搜索等功能。
export const apiCityAreas = (data) => request({url: config.geoCityUrl, method: 'GET', data: {key: config.hfKey, ...data}})

export const apiWeatherNow = (data) => request({url: config.hfBaseUrl + config.hfWeatherNow, method: 'GET', data: {key: config.hfKey, ...data}})

export const apiWeather24h = (data) => request({url: config.hfBaseUrl + config.hfWeather24h, method: 'GET', data: {key: config.hfKey, ...data}})

export const apiWeather7d = (data) => request({url: config.hfBaseUrl + config.hfWeather7d, method: 'GET', data: {key: config.hfKey, ...data}})
