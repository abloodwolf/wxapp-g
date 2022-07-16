<template>
	<view class='page-video'>
		<web-view :webview-styles="webviewStyles" :src="webViewSrc"></web-view>
		<!-- <video class='video-box' id="myVideo" :src="videoSrc" @error="videoErrorCallback" :danmu-list="danmuList"
			enable-danmu danmu-btn controls>
		</video> -->
	</view>
</template>

<script setup>
	import { ref, reactive, onUnmounted } from "vue"
	const webViewSrc = ref('https://m.bilibili.com/bangumi/play/ep375713')
	const videoSrc = ref('https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4')
	// const videoSrc = ref('blob:https://www.bilibili.com/6d5778d7-1bd3-43ac-8fbc-e34b2e743fb8')
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
	onUnmounted(() => {
		 webViewSrc.value = null
	 })
	const videoErrorCallback = (e) => {
		uni.showModal({
			content: e.target.errMsg,
			showCancel: false
		})
	}
</script>

<style lang="less" scoped>
	.page-video {
		.video-box {
			width: 100%;
		}
	}
</style>
