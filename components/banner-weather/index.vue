<template>
	<view class="weather">
		<!-- <web-view :src="srcUrl" :webview-styles='webviewStyles'></web-view> -->
		<!-- <div id="he-plugin-standard">{{weatherData?.rain?.txt}}</div> -->
		<view>{{ locationData?.location }}</view>
		<view class="weather-l">
					<view class="l-location">{{ locationData?.location }}</view>
					<view class="l-we">
						<view class="we-img"> 
							<!-- <image :src=`${imgBaseUrl}/icon/c/${weatherData?.now?.conod_code}d.png` mode=""></image> -->
							<image src='https://widget-s.qweather.net/img/plugin/190516/icon/c/101d.png' mode=""></image>
						</view>
						<view class="we-info">
							<view class="info-tmp">{{weatherData?.now?.tmp}}°</view>
							<view class="info-txt">{{weatherData?.now?.cond_txt}}</view>
						</view>
						
					</view>
					<view class="l-future">{{weatherData?.rain?.txt}}</view>
		</view>
		<view class="weather-r"></view>
	</view>
</template>
<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue"
	import {
		onReady
	} from '@dcloudio/uni-app'

import city from './city.js'
	const wKey = '7176405e1d2d435896ed85c3c5fe6dbe'
	const wLang = 'zh'
	let srcUrl = ref(
		'https://widget.qweather.net/standard/demo.html?width=375&height=150&background=1&dataColor=FFFFFF&key=7176405e1d2d435896ed85c3c5fe6dbe&demo=true&v=_1690892449138'
	)
	let imgBaseUrl = ref('https://widget-s.qweather.net/img/plugin/190516')
	let weatherData = reactive({})
	let array = reactive(city)
	let curIndex = ref('')
	let locationData = reactive({})
	// let srcUrl = ref('/index.html')
	let webviewStyles = reactive({
		width: '375px',
		height: '150px'
	})
	onReady(() => {

	})
	const bindPickerChange = (val) => {
		console.log(val, 'bindPickerChange===')
	}
	const getIpCode = (location) => {
		const url = 'https://search.heweather.net/find'
		uni.request({
			url: url,
			data: {
				key: wKey,
				location: location,
				lang: wLang,
				group: 'cn',
			},
			method: 'GET',
			header: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			success: (res) => {
				console.log('getIpCode', res.data);
				// weatherData = res.data
				Object.assign(locationData, res?.data?.HeWeather6?.[0].basic?.[0])
				// this.text = 'request success';
			},
			fail: (error) => {
				console.log('error', error)
			}
		});
	}
	const getIp = () => {
		const url = 'https://restapi.amap.com/v3/ip?key=d1a7a5151bc3b5f7de34c34f824da3fe&s=rsv3'
		uni.request({
			url: url,
			data: {},
			method: 'GET',
			header: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			success: (res) => {
				console.log('getIp', res.data);
				// weatherData = res.data
				getIpCode(res.data.adcode)
				// this.text = 'request success';
			},
			fail: (error) => {
				console.log('error', error)
			}
		});
	}
	const getWeather = () => {
		uni.request({
			url: 'https://widget-api.heweather.net/s6/plugin/view',
			data: {
				key: wKey,
				location: 'CN101010100',
				lang: wLang,
				charset: 'utf-8'
			},
			method: 'GET',
			header: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			success: (res) => {
				console.log('getWeather', res.data);
				// weatherData = res.data
				Object.assign(weatherData, res.data)
				// this.text = 'request success';
			},
			fail: (error) => {
				console.log('error', error)
			}
		});
	}
	onMounted(() => {
		getIp()
		getWeather()
		// console.log(window, 'window===', globalThis)
		// WIDGET = {
		// 	CONFIG: {
		// 		"layout": "1",
		// 		"width": "375",
		// 		"height": "150",
		// 		"background": "1",
		// 		"dataColor": "FFFFFF",
		// 		"key": "d3932e20fe244caa868123aca83dd025"
		// 	},
		// };
		// (function(d) {
			// let link = ''; //要获取的按钮
			// const btn = uni.createSelectorQuery().in(this);
			// btn.select().boundingClientRect(butn => {
			// 	link = butn; //赋值
			// 	link.rel = 'stylesheet'
			// 	link.href = '../../utils/qweather/index.css'
			// }).exec();
			// let script = ''; //要获取的按钮
			// const btn1 = uni.createSelectorQuery().in(this);
			// btn1.select().boundingClientRect(butn => {
			// 	script = butn; //赋值
			// 	script.src = '../../utils/qweather/index.js'
			// }).exec();
			// var c = d.createElement('link')
			// c.rel = 'stylesheet'
			// c.href = '../../utils/qweather/index.css'
			// var s = d.createElement('script')
			// s.src = '../../utils/qweather/index.js'
			// var sn = d.getElementsByTagName('script')[0]
			// sn.parentNode.insertBefore(c, sn)
			// sn.parentNode.insertBefore(s, sn)
		// })(document)
		// window.setTimeout(() => {
		// 	let script = document.createElement('script')
		// 	script.type = 'text/javascript'
		// 	script.src =
		// 			'https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0'
		// 	document.getElementsByTagName('head')[0].appendChild(script)
		// },0)
		// 	console.log('weather')
	})
</script>

<style lang="less" scoped>
	.weather {
		width: 100%;
		height: 100%;
	}
</style>