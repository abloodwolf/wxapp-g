<template>
	<view class="page-home">
		<view class="home-banner">
			<swiper class="banner-swiper" circular :autoplay="true" :interval="2000" :duration="500">
				<swiper-item v-for="item in imgList" :key='item.id'>
					<image class="swiper-item" :src="item.src"></image>
				</swiper-item>
			</swiper>
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
	import {
		ref,
		reactive,
		onMounted
	} from "vue"

	const title = ref('hello word')

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
			margin-top: 20rpx;
			width: 100%;

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
