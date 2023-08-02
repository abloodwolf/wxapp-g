<template>
	<view class="page-home">
		<view class="home-banner" >
			<view class="banner-common banner-view" @click='gotoWeater(1)'>查看概览天气预报</view>
			<view class="banner-common banner-detail" @click='gotoWeater(2)'>查看详细天气预报</view>
			<!-- <BannerWeather/> -->
			<!-- <web-view :src="srcUrl" ></web-view> -->
			<!-- <swiper class="banner-swiper" circular :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="item in imgList" :key='item.id'>
					<image class="swiper-item" :src="item.src"></image>
				</swiper-item>
			</swiper> -->
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
			<view class="cont-common" @click='gotoUserList'>
				<image mode='aspectFill' class='common-img' src='../../static/dog.png'></image>
				<view>个人中心</view>
			</view>
		</view>


	</view>
</template>
<script setup>
	import {ref,reactive,onMounted} from "vue"
	import BannerWeather from '../../components/banner-weather/index.vue'
	
	const title = ref('hello word')
	const WIDGET = reactive({
		"CONFIG": {
			"layout": "1",
			"width": "450",
			"height": "150",
			"background": "1",
			"dataColor": "FFFFFF",
			"key": "5a8fc64ea8e0469fb256ad73d33deaac"
		}
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

	let srcUrl = ref('https://widget.qweather.net/standard/demo.html?width=375&height=150&background=1&dataColor=FFFFFF&key=7176405e1d2d435896ed85c3c5fe6dbe&demo=true&v=_1690892449138')
	let avatarUrl = ref('')
	let webviewStyles = reactive({})
	
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
	onMounted(() => {
		console.log('App Show')
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

		.home-banner {
			width: 100%;
			display: flex;
			justify-content: space-around;
			align-items: center;
			margin: 80rpx;
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
				.avatar-wrapper {
					width: 200rpx;
					height: 200rpx;
					.avatar {
						width: 200rpx;
						height: 200rpx;
					}
				}
				.common-img {
					width: 200rpx;
					height: 200rpx;
					border-radius: 50%;
				}
			}
		}

	}
</style>
