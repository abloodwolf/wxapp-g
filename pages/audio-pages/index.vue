<template>
	<view class="page-audio">
		<view class="audio-control">
			<view class='control-play'>
				<button class='play-all' @click='playAll()'>播放全部</button>
			  <view class="play-select">
			    <button class='select-common select-song' :class="{active: audioList.id === 1}" @click='selectPlay(1)'>儿歌</button>
			    <button class='select-common select-poetry' :class="{active: audioList.id === 2}" @click='selectPlay(2)'>诗词</button>
			  </view>
			</view>
<!--			<view class='control-bar' >-->
<!--				<view class='bar-l'  @click='playAll()'>-->
<!--					<image src='../../static/play.png' class='l-icon' v-show='!status'></image>-->
<!--					<image src='../../static/stop.png' class='l-icon' v-show='status'></image>-->
<!--				</view>-->
<!--				<view class='bar-r'>-->
<!--					<slider></slider>-->
<!--&lt;!&ndash; 					<slider @change='changeAudio' :activeColor='activeColor' :min='0' :max='duration.toFixed(0)' :value='currentTime.toFixed(0)' :step='0.1'></slider> &ndash;&gt;-->
<!--				</view>-->
<!--				&lt;!&ndash; <view class='ml-3'>{{getTime(Math.round(currentTime))}}</view> &ndash;&gt;-->
<!--			</view>-->
		</view>
		<view class="audio-list">
			<view class="list-item" :class='{active: audioList.currentIndex === index}' v-for="(item, index) in audioList.data">
				<view class='item-l'>
					<image class="l-img" :src='item.pic'></image>
					<text class="l-index">{{ index + 1 }}</text>
					<text class="l-name">{{ item.title }}</text>
					<text class="l-author">{{ item.author }}</text>
				</view>
				<view class='item-r'>
					<view class="r-btn" @click='stopAudio(item, index)'>暂停</view>
					<view class="r-btn" @click='playAudio(item, index)'>播放</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted, onUnmounted } from "vue"
	import { songListData, poetryListData} from './audioList.js'
	// import freeAudio from '../../components/audio-common/free-audio.vue'

	let audioSrc = ref('')
	let innerAudioContext = reactive({})
	let audioList = reactive({data: songListData, id: 1, currentIndex: null})

	onMounted(() => {
		// innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext = uni.getBackgroundAudioManager();
		console.log(innerAudioContext, 'innerAudioContext===')
		innerAudioContext.autoplay = true;
		innerAudioContext.onNext(() => {  
				console.log('onNext')
				prevNextPlay('onNext')
		})  
		innerAudioContext.onPrev(() => {  
				console.log('onPrev')
				prevNextPlay('onPrev')
		}) 
	})
	
	onUnmounted(() => {
		 innerAudioContext.pause()
		 innerAudioContext = null
	 })
	 // 切换上下一首
	 const prevNextPlay = (type) => {
		 let curIndex = audioList.currentIndex
		 if (type === 'onNext') {
			curIndex++ 
			if (curIndex >= audioList.data.length) {
				curIndex = audioList.data.length
			}
		 } else {
			 curIndex--
			 if (curIndex <= 0) {
				 curIndex = 0
			 }
		 }
		 setAudio(audioList.data[curIndex], curIndex);
		 innerAudioContext.play();
	 }
	 // 歌曲、诗词切换
  const selectPlay = (type) => {
		audioList.id = type
		audioList.currentIndex = null
		if (type === 1) {
			audioList.data = songListData
		} else {
			audioList.data = poetryListData
		}
  }
	// 设置播放歌曲
	const setAudio = (item, curIndex) => {
		audioList.currentIndex = curIndex
		innerAudioContext.title = item.title;
		innerAudioContext.singer = item.author;
		innerAudioContext.coverImgUrl = item.pic;
		innerAudioContext.src = item.url;
		audioSrc.value = item.url
	}
	// 全部播放中单播
	const play = (arr, currentIndex) => {
		setAudio(arr[currentIndex], currentIndex)
		innerAudioContext.play();
		innerAudioContext.onEnded((res) => {
			if (currentIndex < arr.length) {
				play(arr, currentIndex + 1);
			} else {
				play(arr, 0);
			}
		})
	}
	// 全部播放
	const playAll = () => {
		play(audioList.data, 0)
	}
	// 单曲播放
	const playAudio = (item, index) => {
		console.log(item, 'item===')
		setAudio(item, index)
		innerAudioContext.loop = true;
		innerAudioContext.play()
		innerAudioContext.onError((res) => {
			console.log('onError===', res)
			console.log(res.errCode)
		})
	}
	// 停止播放
	const stopAudio = () => {
		innerAudioContext.pause()
	}
</script>

<style lang="less" scoped>
	page {
		width: 100%;
		height: 100%;
	}
	.page-audio {
		padding: 0 10rpx;
		overflow-y: hidden;
		display: flex;
		height: 100%;
		flex-direction: column;
		.audio-control {
			.control-play {
				margin: 10rpx 0;
				display: flex;
				justify-content: space-between;
				.play-all {
					width: 100px;
					height: 40px;
					margin: 0;
					border-radius: 20px;
					border-color: #e61723;
					line-height: 40px;
					background: #e61723;
					color: #fff;
				}
				.play-select {
					display: flex;
					.select-common {
						height: 40px;
						line-height: 40px;
						padding: 0 8px;
						margin-left: 10px;
						&.active {
							color: #fff;
							background: #e61723;
						}
					}
				}
			}
			.control-bar {
				.bar-l {
					.l-icon {
						width: 80rpx;
						height: 80rpx;
					}
				}
				.bar-r {
					
				}
			}
		}
		
		.audio-list {
			flex: 1;
			overflow: auto;
			.list-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx 10rpx;

				.item-l {
					display: flex;
					align-items: center;

					.l-img {
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						flex-shrink: 0;
					}
					.l-index {
						font-size: 12px;
						margin-left: 8rpx;
					}
					.l-name {
						font-size: 28rpx;
						margin: 0 10rpx;
					}

					.l-author {
						font-size: 24rpx;
						color: #555;
					}
				}

				.item-r {
					display: flex;
          flex-shrink: 0;
					.r-btn {
						height: 48rpx;
						line-height: 48rpx;
						margin-left: 20rpx;
						padding: 0 20rpx;
						border: 2rpx solid #ccc;
						border-radius: 8rpx;
						color: #588CE9;
						background-color: #f8f8f8;
					}
				}

				&:nth-child(even) {
					background: #F3F5F9;
				}
				&.active {
					color: #e61723;
				}
			}
		}

	}
</style>
