<template>
 <view class="page-audio">
   <view class="audio-list">
     <view class="list-item" v-for="item in audioList">
        <text class="item-txt">{{ item.name }}</text>
			  <view class="item-btn" @click='stopAudio(item)'>暂停</view>
        <view class="item-btn" @click='playAudio(item)'>播放</view>
     </view>
   </view>
   <!-- <view class="audio-box" v-show="Object.keys(current).length">
     <audio :src="current.src" :poster="current.poster" :name="current.name"
            :author="current.author" :action="audioAction" controls></audio>
   </view> -->
 </view>
</template>

<script setup>
import {ref, reactive, onMounted} from "vue"

let current = reactive({})
let innerAudioContext = reactive({})
const audioList = reactive([
  {
    poster: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/7fbf26a0-4f4a-11eb-b680-7980c8a877b8.png',
    name: '致爱丽丝',
    author: '暂无',
    src: 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3',
  },
  {
    poster: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
    name: '淋雨一直走',
    author: '张韶涵',
    src: 'http://m701.music.126.net/20220714203038/8a21e60614b728be71d566fc2dc18e06/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096596906/2457/b1ac/7081/26cab2b46533edb592924e5b4c949aa0.mp3',
  }
])
const audioAction = {
  method: 'pause'
}

onMounted(() => {
  innerAudioContext = uni.createInnerAudioContext();
	innerAudioContext.autoplay = true;
})

const playAudio = (item) => {
	innerAudioContext.src = item.src;
	innerAudioContext.onPlay(() => {
	  console.log('开始播放');
	});
	innerAudioContext.onError((res) => {
	  console.log(res.errMsg);
	  console.log(res.errCode);
	});
}
const stopAudio = () => {
	innerAudioContext.onStop(() => {
	  console.log('停止播放');
	});
}
</script>

<style lang="less" scoped>
.page-audio {
	padding: 10rpx;
	.audio-list {
		.list-item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 10rpx;
			.item-btn {
				height: 48rpx;
				line-height: 48rpx;
				padding: 0 40rpx;
				border: 2rpx solid #ccc;
				border-radius: 8rpx;
				color: #588CE9;
				background-color: #f8f8f8;
			}
			&:nth-child(even) {
				background: #F3F5F9;
			}
		}
	}
	
}
</style>