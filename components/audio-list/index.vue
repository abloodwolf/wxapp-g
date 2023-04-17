<template>
	<view class="audio-list">
		<view class="list-item" :class='{active: currentIndex === index}' v-for="(item, index) in audioList">
			<view class='item-l'>
				<image class="l-img" :src='item.pic'></image>
				<text class="l-index">{{ index + 1 }}</text>
				<text class="l-name">{{ item.title }}</text>
				<text class="l-author">{{ item.author }}</text>
			</view>
			<view class='item-r'>
				<!-- <view class="r-btn r-add" @click='addStorage(item, module)'>{{ (module !== 'songList' && isHasFn(item.title)) ? '添加' : '移除'}} -->
				<view class="r-btn r-add" @click='addStorage(item, module)'>{{ module !== 'songList' ? '添加' : '移除'}}
				</view>
				<view class="r-btn" v-if='currentIndex === index' @click='stopAudio(item, index)'>暂停</view>
				<view class="r-btn" v-else @click='playAudio(item, index)'>播放</view>
			</view>
		</view>

	</view>
</template>

<script setup>
	import {
		ref,
		toRefs,
		reactive,
		onMounted,
		onUnmounted
	} from "vue"
	// 接受父组件传参
	const props = defineProps({
		audioList: Array,
		// currentIndex: Number,
		module: String
	})
	const emitEvents = defineEmits(['emitSuccess'])

	const keyWord = ref('刘德华')
	const page = ref(1)
	const currentIndex = ref(null)
	// const currentIndex = ref(props.currentIndexProps)
	// const audioList = ref(props.audioListProps)
	const {
		module,
		// currentIndex,
		audioList
	} = toRefs(props)
	// const url = 'https://xz.hao363.com/'
	// const url = 'https://music.xf1433.com/'
	const url = 'https://mp3.ltyuanfang.cn/'
	let innerAudioContext = reactive({})
	let isHas = ref({})
	onMounted(() => {
		// innerAudioContext = uni.createInnerAudioContext();
		innerAudioContext = uni.getBackgroundAudioManager();
		console.log(innerAudioContext, 'innerAudioContext===', audioList)
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
	const isHasFn = (item) => {
		const songListStorage = uni.getStorageSync('songList') || [];
		const index = songListStorage.findIndex(object => object.title === item.title);
		return index === -1
	} 
	// 添加歌曲到缓存
	const addStorage = (item, type) => {
		// uni.setStorageSync('songList', item);
		console.log(type, 'type===')
		const songListStorage = uni.getStorageSync('songList') || [];
		const songList = []
		// JSON.parse(JSON.stringify(songListStorage))
		for (var i = 0; i < songListStorage.length; i++) {
			songList.push(songListStorage[i])
		}
		const index = songList.findIndex(object => object.title === item.title);
		isHas.value[item.title] = index === -1
		if (type !== 'songList') {
			console.log(songList, 'songList===')
			if (index === -1) {
				songList.unshift(item);
				uni.setStorageSync('songList', songList);
				uni.showToast({
					title: `已添加到歌单`,
					icon: 'success',
					duration: 2000
				});
			}
		} else {
			console.log(songList, 'songList！===22222', songListStorage)
			const songListNew = songList.filter(val => val.title !== item.title);
			// uni.clearStorageSync();
			// 	uni.setStorageSync('songList', songListNew);
			// 	uni.showToast({
			// 		title: `已从歌单移除`,
			// 		 icon: 'success',
			// 		duration: 2000
			// 	});
			// 	emitEvents("emitSuccess", 11)
			// }
			uni.setStorage({
				key: 'songList',
				data: songListNew,
				success: function() {
					console.log('success');
					uni.showToast({
						title: `已从歌单移除`,
						icon: 'success',
						duration: 2000
					});
					emitEvents("emitSuccess", 11)
				}
			});
		}
	}
	// 切换上下一首
	const prevNextPlay = (type) => {
		let curIndex = currentIndex.value
		if (type === 'onNext') {
			curIndex++
			if (curIndex >= audioList.value.length) {
				curIndex = audioList.value.length
			}
		} else {
			curIndex--
			if (curIndex <= 0) {
				curIndex = 0
			}
		}
		setAudio(audioList.value[curIndex], curIndex);
		innerAudioContext.play();
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
		innerAudioContext.onError((res) => {
			console.log('onError===', res)
			if (currentIndex < arr.length) {
				play(arr, currentIndex + 1);
			} else {
				play(arr, 0);
			}
		})
	}

	// 单曲播放
	const playAudio = (item, index) => {
		console.log(item, 'item===', audioList)
		play(audioList.value, index)
		// setAudio(item, index)
		// innerAudioContext.loop = true;
		// innerAudioContext.play()
		// innerAudioContext.onError((res) => {
		// 	console.log('onError===', res)
		// 	console.log(res.errCode)
		// })
	}
	// 设置播放歌曲
	const setAudio = (item, curIndex) => {
		currentIndex.value = curIndex
		innerAudioContext.title = item.title;
		innerAudioContext.singer = item.author;
		innerAudioContext.coverImgUrl = item.pic;
		innerAudioContext.src = item.url;
	}
	// 停止播放
	const stopAudio = () => {
		innerAudioContext.pause()
	}
</script>

<style lang="less" scoped>
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

				.r-add {
					font-size: 24rpx;
				}
			}

			&:nth-child(even) {
				background: #F3F5F9;
			}

			&.active {
				color: #e61723;

				.l-author {
					color: #e61723;
				}

				.r-btn {
					border: 2rpx solid #e61723;
					color: #e61723;
				}
			}
		}
	}
</style>
