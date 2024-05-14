<template>
	<view class="weather">
		<view class="weather-now">
			<view class="now-add">
			<text class="add-city">{{ locationData.city }}</text>
			<text class="add-district">{{ locationData.district }}</text>
			</view>
			<view class="now-cont" @click="gotoWeater">
				<text :class=" 'cont-item cont-icon qi-' + weatherData?.now?.icon "></text>
				<text class="cont-item">{{weatherData?.now?.text}}</text>
				<text class="cont-item">{{weatherData?.now?.windDir}}{{weatherData?.now?.windScale }}级</text>
				<!-- <text class="cont-item" >{{weatherData?.now?.windScale }}级</text> -->
				<text class="cont-item">{{weatherData?.now?.temp }}°</text>
			</view>
		</view>
		<view class="weather-hours">
			<view class="hours-item" v-for="(item, index) in weatherData?.hourly">
				<view class="item-t">
					<text :class=" 't-common t-icon qi-' + item?.icon "></text>
					<text class="t-common">{{item?.temp }}°</text>
				</view>
				<view class="item-b">{{ timeForamt(item?.fxTime, 'HH') }}h</view>
			</view>
		</view>
		<view class="weather-daily7d">
			<view class="daily7d-item" v-for="(item, index) in weatherData?.daily7d">
				<view class="item-t">
					<text :class=" 't-common t-icon qi-' + item?.iconDay "></text>
					<text class="t-common">{{item?.tempMin }}°~{{item?.tempMax }}°</text>
				</view>
				<view class="item-b">{{ timeForamt(new Date(item?.fxDate), 'MM-DD') }} {{getWeekDayText(item?.fxDate) }}</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref,
		reactive,
		onMounted,
		computed,
		defineProps,
		watch 
	} from "vue"
	import { onReady } from '@dcloudio/uni-app'
	import { apiWeatherNow, apiWeather24h, apiWeather7d } from '../../api/index.js'
	import { timeForamt, getWeekDayText } from '../../utils/date-format.js'

	let weatherData = reactive({
		now: {},
		hourly: [],
		daily7d: [],
		fxLink: ''
	})
	let locationData = reactive({
		city: '',
		coord: '',
		adInfo: {}
	})

const props = defineProps({
	  city: String,
	  coord: String,
	  adInfo: Object,
	});
	
	onReady(() => {

	})
	
	// 获取小时级天气预报
	const getWeatherNow = async (location) => {
		const data = {
			// key: wKey,
			location: location,
		}
		const res = await apiWeatherNow(data)
		// console.log(res, 'apiWeatherNow======')
		weatherData.now = res?.now
		weatherData.fxLink = res?.fxLink
	}
	const getWeather24h = async (location) => {
		const data = {
			// key: wKey,
			location: location,
		}
		const res = await apiWeather24h(data)
		// console.log(res, 'apiWeather24h======')
		weatherData.hourly = res?.hourly
	}
	const getWeather7d = async (location) => {
		const data = {
			// key: wKey,
			location: location,
		}
		const res = await apiWeather7d(data)
		// console.log(res, 'apiWeather7d======')
		weatherData.daily7d = res?.daily
	}
	const gotoWeater = (type) => {
		console.log(type, 'gotoWeater');
		uni.navigateTo({
			url: `/pages/weather/index?url=${weatherData?.fxLink}`
		});
	}
	watch(()=>props.adInfo,(newValue,oldValue)=>{
		console.log('city, locationId变化了', newValue, oldValue)
		if(newValue && oldValue?.location?.lat !== newValue?.location?.lat && oldValue?.location?.lng !== newValue?.location?.lng) {
			const coord = `${newValue?.location?.lng},${newValue?.location?.lat}`
			locationData.coord = coord // id
			locationData.city = newValue?.city
			locationData.district = newValue?.district
		}
	
		getWeatherNow(locationData.coord)
		getWeather24h(locationData.coord)
		getWeather7d(locationData.coord)
	},{immediate:true,deep:true})
	onMounted(() => {
	})
</script>

<style lang="less" scoped>
	.weather {
		width: 100%;
		height: 100%;

		.weather-now {
			display: flex;
			align-items: center;
			padding: 40rpx 20rpx;
			border-radius: 8rpx;
			margin-bottom: 8rpx;
			background-image: linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);

			.now-add {
				margin-right: 24rpx;
				font-size: 44rpx;
				.add-district {
					font-size: 32rpx;
					margin-left: 6rpx;
				}
			}

			.now-cont {
				.cont-item {
					margin: 0 8rpx;
					font-size: 40rpx;

					&.cont-icon {
						font-size: 50rpx;
					}
				}
			}
		}
	
		.weather-hours {
			display: flex;
			overflow-x: auto;
			background-image: linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);
			padding: 30rpx 0;
			border-radius: 8rpx;
			margin-bottom: 8rpx;
			.hours-item {
				padding: 0 8rpx;
				flex-shrink: 0;
				border-right: 1px solid #DEDFE2;
				.item-t {
					display: flex;
				}
			}
		}
		.weather-daily7d {
			display: flex;
			overflow-x: auto;
			background-image: linear-gradient(225deg, #D0DAE8, #CCD4DF 55%, #A5B3C5);
			padding: 30rpx 0;
			border-radius: 8rpx;
			margin-bottom: 8rpx;
			.daily7d-item {
				padding: 0 8rpx;
				flex-shrink: 0;
				border-right: 1px solid #DEDFE2;
				.item-t {
					display: flex;
				}
			}
		}
	
	}
</style>