<template>
	<view class="page-audio">
		<view class='audio-play'>
			<button class='play-all' @click='playAll()'>播放全部</button>
      <view class="play-select">
        <button class='select-common select-song' :class="{active: audioList.id === 1}" @click='selectPlay(1)'>儿歌</button>
        <button class='select-common select-poetry' :class="{active: audioList.id === 2}" @click='selectPlay(2)'>诗词</button>
      </view>
		</view>
		<view class="audio-list">
			<view class="list-item" :class='{active: itemIndex === index}' v-for="(item, index) in audioList.data">
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
		<!-- <free-audio v-if='audioSrc' :innerAudioContext='innerAudioContext' audioId='audio1' :url='audioSrc'></free-audio> -->
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted } from "vue"
	import { songListData, poetryListData} from './audioList.js'
	// import freeAudio from '../../components/audio-common/free-audio.vue'

	let audioSrc = ref('')
	let itemIndex = ref(null)
	let current = reactive({})
	let innerAudioContext = reactive({})
	let audioList = reactive({data: songListData, id: 1})

	onMounted(() => {
		innerAudioContext = uni.createInnerAudioContext();
		console.log(innerAudioContext, 'innerAudioContext===')
		innerAudioContext.autoplay = true;
	})
  const selectPlay = (type) => {
		audioList.id = type
		// itemIndex.value = null
		if (type === 1) {
			audioList.data = songListData
		} else {
			audioList.data = poetryListData
		}
  }
	const play = (arr, currentIndex) => {
		itemIndex.value = currentIndex
		innerAudioContext.src = arr[currentIndex].url;
		innerAudioContext.play();
		innerAudioContext.onEnded((res) => {
			if (currentIndex < arr.length) {
				play(arr, currentIndex + 1);
			} else {
				play(arr, 0);
			}
		})
	}
	const playAll = () => {
		play(audioList.data, 0)
	}
	const playAudio = (item, index) => {
		// audioSrc.value = item.src
		console.log(item, 'item===')
		itemIndex.value = index
		innerAudioContext.src = item.url;
		innerAudioContext.loop = true;
		innerAudioContext.play()
		innerAudioContext.onError((res) => {
			console.log(res.errMsg)
			console.log(res.errCode)
		})
	}
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
		.audio-play {
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
