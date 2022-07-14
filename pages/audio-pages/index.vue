<template>
	<view class="page-audio">
		<view class='audio-play'>
			<button class='play-all' @click='playAll()'>播放全部</button>
		</view>
		<view class="audio-list">
			<view class="list-item" v-for="item in audioList">
				<view class='item-l'>
					<image class="l-img" :src='item.poster'></image>
					<text class="l-name">{{ item.name }}</text>
					<text class="l-author">{{ item.author }}</text>
				</view>
				<view class='item-r'>
					<view class="r-btn" @click='stopAudio(item)'>暂停</view>
					<view class="r-btn" @click='playAudio(item)'>播放</view>
				</view>
			</view>
		</view>
		<!-- <free-audio v-if='audioSrc' :innerAudioContext='innerAudioContext' audioId='audio1' :url='audioSrc'></free-audio> -->
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
		onMounted
	} from "vue"
	// import freeAudio from '../../components/audio-common/free-audio.vue'

	let audioSrc = ref('')
	let current = reactive({})
	let innerAudioContext = reactive({})
	const audioList = reactive([{
			poster: 'https://p1.music.126.net/GlV130UzFe2hEofOpo9k2g==/109951163314358137.jpg',
			name: '小兔子乖乖',
			author: '宝宝巴士',
			src: 'http://m701.music.126.net/20220715004156/57ac6f7b325feefcfc471b14178b9d78/jdyyaac/045f/5658/0753/3573b4e5b7a22868c935096c9c995688.m4a'
		},
		{
			poster: 'https://p1.music.126.net/ybmDi6biknnuVvFIRQn0wQ==/109951164538531061.jpg',
			name: '两只老虎爱跳舞',
			author: '儿歌宝贝',
			src: 'http://m10.music.126.net/20220715002055/613a919b2e8577b4cdd34dc6e2750d63/yyaac/040f/050f/545f/3e90fa77db2e1b9b830bc574ce8bf085.m4a',
		},
		{
			poster: 'https://p2.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg',
			name: '虫儿飞',
			author: '贝乐虎儿歌',
			src: 'http://m10.music.126.net/20220715002322/bd9fee614df8204c3916921b5aac1ff8/yyaac/000c/020b/565b/7fdee9e2a25aaf9426aea1d2e3a2e52f.m4a',
		},
		{
			poster: 'https://p1.music.126.net/E_QQdGo7B1LHTo123E_trw==/109951165033259182.jpg',
			name: '一闪一闪亮晶晶',
			author: '儿歌',
			src: 'http://m10.music.126.net/20220715002526/93bb1f1b133739525f3dd3dba3559638/yyaac/obj/wonDkMOGw6XDiTHCmMOi/2735435296/a846/cbf3/fab7/24495d62011b2b3d4f730b4f5a5033cf.m4a',
		},
		{
			poster: 'https://p1.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg',
			name: '小白兔白又白',
			author: '贝乐虎儿歌',
			src: 'http://m10.music.126.net/20220715002759/07c77a6fc48b5dd89ada21c92ad2d57c/yyaac/5509/025f/535f/bcbf6976f2558045285ad55e14f1ce9c.m4a',
		},
		{
			poster: 'https://p2.music.126.net/iRYGuWbKdsA5kD3fLnXSdg==/109951164640698111.jpg',
			name: '小毛驴',
			author: '贝乐虎儿歌',
			src: 'http://m10.music.126.net/20220715002917/922585667dc33633983789e114d7736e/yyaac/0558/5608/0459/223e848383abff8851e333221d24ddeb.m4a',
		}
	])
	const audioAction = {
		method: 'pause'
	}

	onMounted(() => {
		innerAudioContext = uni.createInnerAudioContext();
		console.log(innerAudioContext, 'innerAudioContext===')
		innerAudioContext.autoplay = true;
	})

	const play = (arr, currentIndex) => {
		innerAudioContext.src = arr[currentIndex].src;
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
		for (var i = 0; i < audioList.length; i++) {
			// innerAudioContext.src = audioList[i].src;
		}
		play(audioList, 0)
	}
	const playAudio = (item) => {
		// audioSrc.value = item.src
		console.log(item, 'item===')
		innerAudioContext.src = item.src;
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
	.page-audio {
		padding: 10rpx;
		.audio-play {
			.play-all {
				width: 140px;
				height: 40px;
				border-radius: 20px;
				border-color: #e61723;
				line-height: 40px;
				background: #e61723;
				color: #fff;
			}
		}
		.audio-list {
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

					.l-name {
						font-size: 28rpx;
						margin: 0 20rpx;
					}

					.l-author {
						font-size: 24rpx;
						color: #555;
					}
				}

				.item-r {
					display: flex;

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
			}
		}

	}
</style>
