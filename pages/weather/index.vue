<template>
	<view class="weather">
		<web-view  :src="srcUrl"></web-view>
	</view>
</template>
<script setup>
	import {ref,reactive,onMounted} from "vue"
	import {onLoad} from '@dcloudio/uni-app'

	const urlDetail = 'https://widget-page.qweather.net/h5/index.html?md=0123456&bg=1&lc=accu&key=64ff501bd4444ed1acb0bc70ed1bf16d&v=_1690888806110'
	const urlView = 'https://widget.qweather.net/standard/demo.html?width=375&height=150&background=1&dataColor=FFFFFF&key=7176405e1d2d435896ed85c3c5fe6dbe&demo=true&v=_1690892449138'
	let srcUrl = ref('')
	// onShow: function() {
	// 			console.log('App Show')
	// },
	onLoad((option) => {
console.log('weather9999', option)
		if(+option?.type === 1) {
			srcUrl.value= urlView
		} else {
			srcUrl.value= urlDetail
		}
	})
	onMounted((option) => {
		console.log('weather', option)
	})
	
	
</script>

<style lang="less" scoped>
	.weather {
		width: 100%;
		height: 100%;
	}
</style>
