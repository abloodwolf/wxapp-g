<template>
	<view class="page-home">
		<view class="home-header">
			<view class="header-location">
				<uni-data-picker :localdata="locationData.cityList" popup-title="请选择城市" :map="{text:'nameZh',value:'id'}"
					@change="onchange" @nodeclick="onnodeclick">
				</uni-data-picker>
			</view>
			<view class="header-current" @click="getCurrent">定位</view>
			<view class="header-user cont-common" @click='gotoUserList'>
				<image mode='aspectFill' class='common-img' src='../../static/dog.png'></image>
				<view>个人中心</view>
			</view>
		</view>
		<view class="home-banner">
			<BannerWeather :adInfo='locationData.adInfo'
				class="banner-cont" />
		</view>
		<view class="page-cont">
			<view class="cont-common home-audio" @click='gotoAudio'>
				<image class='common-img' src='../../static/rabbit.png'></image>
				<view>去听小兔子乖乖</view>
			</view>
			<view class="cont-common" @click='gotoVedio'>
				<image class='common-img' src='../../static/pig.png'></image>
				<view>去搜索音乐</view>
			</view>
		</view>


	</view>
</template>
<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue"
	import BannerWeather from '../../components/banner-weather/index.vue'
	import cityList from '../../utils/cityDataMultilevel.js'
	import { apiGeocoder } from '../../api/index.js'
	

	let locationData = reactive({
		city: '北京',
		locationId: '101010100',
		cityList: cityList,
		coord: '39.915267,116.403406',
		adInfo: {}
	})

	const imgList = reactive([{
			id: 1,
			src: '/static/dog.png'
		},
		{
			id: 2,
			src: '/static/dog.png'
		},
		{
			id: 3,
			src: '/static/dog.png'
		},
	])

	let avatarUrl = ref('')
	const openSetting = () =>  {
		uni.openSetting()
	}
	const getCurrent = () => {
		getLocation()
	}
	const onchange = (e) => {
		// locationData.currentCity = e.detail.value?.text
		// console.log(e, 'e====', )
		// const value = e.detail.value
	}
	const onnodeclick = (node) => {
		console.log(node, 'node====')
		locationData.locationId = node?.id
		const coord = `${node?.longitude},${node?.latitude}`
		locationData.adInfo = {
			location: { lat: node?.latitude, lng: node?.longitude },
			nation: node?.countryRegionZh,
			province: node?.adm1NameZh,
			city: node?.adm2NameZh,
			district: node?.nameZh,
		}
	}
	// onShow: function() {
	// 			console.log('App Show')
	// },

	const onChooseAvatar = (e) => {
		const {
			avatarUrl
		} = e.detail
		// avatarUrl.value = e.detail.avatarUrl
		console.log(e, 'avatarUrl====', avatarUrl)
	}
	// 获取用户信息
	const getuserinfo = () => {
		uni.getUserProfile({
			desc: '用于完善会员资料',
			success: function(res) {
				console.log(res, 'res====')
				var userInfo = res.userInfo
				var nickName = userInfo.nickName
				var avatarUrl = userInfo.avatarUrl
				var gender = userInfo.gender //性别 0：未知、1：男、2：女
				var province = userInfo.province
				var city = userInfo.city
				var country = userInfo.country
			},
			fail: (err) => {
				console.log(err)
			}
		})
	}
	
	const getGeocoder = async (coord) => {
		const data = {
			// get_poi: 1, // 是否返回周边地点（POI）列表，可选值：0 不返回(默认) 1 返回
			location: coord,
		}
		const res = await apiGeocoder(data)
		if(+res?.status === 0) {
		 console.log(res, 'apiGeocoder======')
			locationData.adInfo = res?.result?.ad_info
		}
		// weatherData.daily7d = res?.daily
	}
	const getLocation = () => {
		uni.getSetting({
				success(res) {
					console.log(res.authSetting, 'res.authSetting')
					if (res.authSetting['scope.userLocation']) {
						uni.authorize({
							scope: 'scope.userLocation',
							success() {
								uni.getLocation({
									type: 'gcj02',
									success(res) {
										console.log('获取位置成功', res)
										const coord = `${res?.latitude},${res?.longitude}`
										getGeocoder(coord)
									},
									fail(err) {
										console.error('获取位置失败', err)
									}
								})
							},
							fail() {
								uni.showModal({
									title: '提示',
									content: '此功能需要获取您的地理位置权限，请确认授权',
									success(res) {
										if (res.confirm) {
											uni.openSetting()
										}
									}
								})
							}
						})
					}
				}
			})
	}
	onMounted(() => {
		console.log('App Show====')
		getLocation()
		// getuserInfo()
	})
	const gotoWeater = (type) => {
		console.log(type, 'gotoWeater');
		uni.navigateTo({
			url: `/pages/weather/index?type=${type}`
		});
	}
	// 去儿歌页面
	const gotoAudio = () => {
		console.log(333)
		uni.navigateTo({
			url: '/pages/audio-pages/index?id=1&name=uniapp'
		});
	}
	// 去搜索页面
	const gotoVedio = () => {
		uni.navigateTo({
			// url: '/pages/video-pages/index?id=1&name=uniapp'
			url: '/pages/search-pages/index'
		});
	}
	// 去个人收藏页面
	const gotoUserList = () => {
		uni.navigateTo({
			url: '/pages/song-list/index'
		});
	}
</script>

<style lang="less" scoped>
	.page-home {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.home-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 95%;
			padding: 20rpx;

			.header-location {
				width: 400rpx;
			}

			.header-current {
				padding: 20rpx;
			}

			.header-user {
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.common-img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
				}
			}
		}

		.home-banner {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin-bottom: 80rpx;

			.banner-cont {
				width: 100%;
				height: 100%;
			}

			.banner-common {
				text-align: center;
				font-size: 34rpx;
				font-weight: 600;
				background: #f00;
				padding: 40rpx;
				border-radius: 16rpx;
			}

			.banner-view {
				// width: 50%;
			}

			.banner-detail {
				// width: 50%;
			}

			.banner-swiper {
				.swiper-item {
					width: 100%;
					height: 100%;
				}
			}
		}

		.page-cont {
			width: 100%;
			display: flex;
			justify-content: space-around;
			// padding: 0 30rpx;
			flex-wrap: wrap;

			.cont-common {
				// width: 50%;
				margin: 60rpx;
				// margin: 60rpx 30rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				align-items: center;

				.common-img {
					width: 200rpx;
					height: 200rpx;
					border-radius: 50%;
				}
			}
		}

	}
</style>