<template>
	<view class="pages-search">
		<view class="search-cont">
			<input class="cont-input" :value="keyWord" type='text' confirm-type='search' @blur="inputFun"
				@confirm='inputFun' focus placeholder="例如: 不要说话 陈奕迅" />
			<!-- <view class="music-btn">搜索</view> -->
			<button class='cont-btn' type="warn" size='mini' @click='searchFun'>搜索</button>
		</view>
		<view class='search-radio'>
			<radio-group class='radio-group' @change="radioChange">
				<view class="group-item" v-for="(item, index) in radioList" :key="item.id">
					<radio class="item-radio" :value="item.value" :checked="item.value === radioCurrent" />
					<view class="item-name">{{item.name}}</view>
				</view>
			</radio-group>
		</view>
		<view class="search-list" v-if='audioList.data.length > 0'>
			<AudioList :audioList='audioList.data' :currentIndex='audioList.currentIndex'/>
			<view class='list-more' v-if='audioList.moreType' @click='moreMusic'>加载更多</view>
		</view>
		<view class="search-list-empty" v-else>
			{{ audioList.error }}
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted, onUnmounted } from "vue"
	import AudioList from '../../components/audio-list/index.vue'
	const keyWord = ref('刘德华')
	const page = ref(1)
	// const url = 'https://xz.hao363.com/'
	// const url = 'https://music.xf1433.com/'
	// const url = 'https://mp3.ltyuanfang.cn/'
	// const url = 'https://music.liuzhijin.cn/'
	const url = 'https://mp3.ltyuanfang.cn/'
	let innerAudioContext = reactive({})
	const radioList = [
		{ id: 1, value: 'netease', name: '网易' },
		{ id: 2, value: 'qq', name: 'ＱＱ' },
		{ id: 3, value: 'kugou', name: '酷狗' },
		{ id: 4, value: 'kugou', name: '酷我' },
		{ id: 5, value: 'xiami', name: '虾米' },
		{ id: 6, value: 'baidu', name: '百度' },
		{ id: 7, value: '1ting', name: '一听' },
		{ id: 8, value: 'migu', name: '咪咕' },
		{ id: 9, value: 'lizhi', name: '荔枝' },
		{ id: 10, value: 'qingting', name: '蜻蜓' },
		{ id: 11, value: 'ximalaya', name: '喜马拉雅' },
		// { id: 12, value: '5singyc', name: '5sing原创'},
		// { id: 13, value: '5singfc', name: '5sing翻唱'}
	]
	const radioCurrent = ref(radioList[0].value)
	let audioList = reactive({
		data: [],
		id: 1,
		currentIndex: null,
		moreType: false,
		error: '暂无内容'
	})

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
	// 输入失焦和确认事件
	const inputFun = (e) => {
		console.log(e)
		keyWord.value = e.detail.value
		searchFun('init')
	}
	// 单选触发事件
	const radioChange = (e) => {
		console.log(e)
		radioCurrent.value = e.detail.value
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
		console.log(item, 'item===')
		play(audioList.data, index)
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
		audioList.currentIndex = curIndex
		innerAudioContext.title = item.title;
		innerAudioContext.singer = item.author;
		innerAudioContext.coverImgUrl = item.pic;
		innerAudioContext.src = item.url;
	}
	// 停止播放
	const stopAudio = () => {
		innerAudioContext.pause()
	}

	// 歌曲搜搜
	const searchFun = (type) => {
		console.log(keyWord, 'keyWord===')
		if (type === 'init') {
			page.value = 1
		}
		uni.request({
			url: url,
			data: {
				input: keyWord.value,
				filter: 'name',
				type: radioCurrent.value,
				page: page.value
			},
			method: 'POST',
			header: {
				'X-Requested-With': 'XMLHttpRequest',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
			},
			success: (res) => {
				console.log('res', res.data);
				let temp = audioList.data
				audioList.moreType = res.data.data.length > 9
				type === 'more' ? temp.push(...res.data.data) : temp = res.data.data
				audioList.data = temp
				audioList.error = res.data.error
				// this.text = 'request success';
			},
			fail: (error) => {
				console.log('error', error)
			}
		});
	}
	// 加载更多
	const moreMusic = (e) => {
		console.log('scrolltolower', e)
		page.value++
		searchFun('more')
	}
</script>

<style lang="less" scoped>
	.pages-search {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20rpx;
		box-sizing: border-box;
	.search-cont {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
	
		.cont-input {
			flex: 1;
			border: 2rpx solid #5eb95e;
			border-radius: 8rpx;
			margin-right: 30rpx;
			height: 60rpx;
			line-height: 60rpx;
			padding: 0 10rpx;
		}
	}
	
	.search-radio {
		margin: 20rpx 0;
		border-bottom: 2rpx solid #f5f5f5;
	
		.radio-group {
			display: flex;
			flex-wrap: wrap;
	
			.group-item {
				display: flex;
				align-items: center;
				margin: 0 5px 5px 0;
	
				.item-radio {
					transform: scale(0.7);
				}
	
				.item-name {
					font-size: 24rpx;
				}
			}
		}
	}
	
	.search-list {
		flex: 1;
		overflow: auto;
	
		.list-more {
			flex-shrink: 0;
			font-size: 24rpx;
			text-align: center;
			cursor: pointer;
			padding: 40rpx 0 60rpx 0;
		}
	}
	
	.search-list-empty {
			text-align: center;
			margin: auto;
		}

		
	}
	
</style>
