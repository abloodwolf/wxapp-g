<template>
  <view class="page-home">
    <view class="home-banner">
			<swiper class="banner-swiper" 
				circular 
				:autoplay="true" 
				:interval="2000"
				:duration="500">
				<swiper-item v-for="item in imgList" :key='item.id'>
					<image class="swiper-item" :src="item.src"></image>
				</swiper-item>
			</swiper>
		</view>
    <view class="home-common home-audio" @click='gotoAudio'>
			<image class='common-img' src='../../static/rabbit.png'></image>
      <view>去听小兔子乖乖</view>
    </view>
	<view class="home-common" @click='gotoAudio'>
		<image class='common-img' src='../../static/pig.png'></image>
	  <view>去看小猪佩奇</view>
	</view>


  </view>
</template>
<script setup>
import {ref, reactive} from "vue"

const title = ref('hello word')

let current = reactive({})
const imgList = reactive([
	{id: 1, src: '/static/dog.png'},
	{id: 2, src: '/static/dog.png'},
	{id: 3, src: '/static/dog.png'},
])
const audioList = [
  {
    poster: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png',
    name: '致爱丽丝',
    author: '暂无',
    src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
  },
  {
    poster: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png',
    name: '致爱丽丝',
    author: '暂无',
    src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
  }
]
const audioAction = {
  method: 'pause'
}
const gotoAudio = () => {
  console.log(333)
  uni.navigateTo({
    url: '/pages/audio-pages/index?id=1&name=uniapp'
  });
}

const danmuList = reactive([{
  text: '第 1s 出现的弹幕',
  color: '#ff0000',
  time: 1
},
  {
    text: '第 3s 出现的弹幕',
    color: '#ff00ff',
    time: 3
  }
])
const videoErrorCallback = (e) => {
  uni.showModal({
    content: e.target.errMsg,
    showCancel: false
  })
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
  .home-common {
	  margin: 60rpx 0;
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


</style>
