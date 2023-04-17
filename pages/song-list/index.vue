<template>
	<view class="song-list">
		<view class="list-title">
			<view class="title-txt">我的歌单</view>
			<button v-if='audioList.data.length > 0' class="title-btn" @click="removeAll">移除全部</button>
		</view>
		<view class="list-cont" v-if='audioList.data.length > 0'>
			<AudioList @emitSuccess='emitSuccess' module='songList' :audioList='audioList.data' :currentIndex='audioList.currentIndex' />
		</view>
		<view class="list-empty" v-else>
			{{ audioList.error }}
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted,
		onUnmounted
	} from "vue"
	import AudioList from '../../components/audio-list/index.vue'
	const keyWord = ref('刘德华')
	const page = ref(1)
	// const url = 'https://xz.hao363.com/'
	// const url = 'https://music.xf1433.com/'
	const url = 'https://mp3.ltyuanfang.cn/'
let audioList = ref({
		data: [],
		id: 1,
		currentIndex: null,
		moreType: false,
		error: '暂未添加歌单'
	})

	// 从缓存获取歌单
	const getSongList = () => {
		// audioList.data = []
		const songList = uni.getStorageSync('songList');
		console.log(songList, 'songList====');
		// if (songList) {
			audioList.value.data = songList
			// audioList.data.splice(0,)
			console.log(songList, 'songList====');
		// }
	}
	// 清除所有歌单
	const removeAll = () => {
		uni.clearStorageSync()
		getSongList()
	}
	// 页面移除歌单后触发
	const emitSuccess = () => {
		console.log('emitSuccess===')
		getSongList()
	}
	onMounted(() => {
		getSongList()
	})
</script>

<style lang="less" scoped>
	.song-list {
		display: flex;
		flex-direction: column;
		height: 100%;
		padding: 20rpx;
		.list-title {
			
			.title-txt {
				text-align: center;
				padding: 20rpx 0;
				font-weight: 600;
			}
			.title-btn {
				width: 100px;
				height: 40px;
				margin: 0;
				border-radius: 20px;
				border-color: #e61723;
				line-height: 40px;
				background: #e61723;
				color: #fff;
			}
		}
		.list-cont {
			display: flex;
			flex-direction: column;
			height: 100%;
			padding: 20rpx;
		
		}
		.list-empty {
			text-align: center;
			margin: auto;
		}
	}

</style>
