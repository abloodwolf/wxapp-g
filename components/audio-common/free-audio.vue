<template>
	<!-- 音频播放器组件 -->
	<view v-if='url' class='flex justify-between align-center audio' >
		<view class='mr-3'  @click='start(audioId)'>
			<image src='./images/play.png' class='icon' v-show='!status'></image>
			<image src='./images/stop.png' class='icon' v-show='status'></image>
		</view>
		<view class='flex-1'>
			<slider @change='changeAudio' :activeColor='activeColor' :min='0' :max='duration.toFixed(0)' :value='currentTime.toFixed(0)' :step='0.1'></slider>
		</view>
		<view class='ml-3'>{{getTime(Math.round(currentTime))}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				context: null,
				currentTime: 0,
				duration: 100,
				status: false
			}
		},
		props: {
			url: String,
			activeColor: {
				type: String,
				default: '#0E7EFC'
			},
			audioId: [String,Number]
		},
		created() {
			console.log(this.url, 'this.url===')
		},
		methods: {
			start(id) { //点击播放
				uni.$emit('stop',id)
			},
			onCanplay() { //进入可播放状态
				this.context.onCanplay(() => {
					this.context.duration;
					setTimeout(()=>{
						this.duration = this.context.duration;
					},1000)
				})
			},
			onTimeUpdate() { //音频播放进度
				 this.context.onTimeUpdate(() => {
					 if (!Number.isFinite( this.context.duration)) {
						this.duration = this.context.currentTime + 10;
						this.currentTime = this.context.currentTime;
					 } else {
						 this.duration = this.context.duration;
						 this.currentTime = this.context.currentTime;
					 }
				 })
			},
			onEnded() { //播放结束
				this.context.onEnded(()=> {
					this.status = false;
					this.currentTime = 0;
				})
			},
			changeAudio(e) {
				let paused = this.context.paused;
				this.context.pause();
				this.context.seek(e.detail.value)
				if(!paused) {
					this.context.play();
				} 
			},
			getTime(time) {
				let m = parseInt(time / 60);
				let s = time % 60;
				return this.towNum(m) + ':' + this.towNum(s);
			},
			towNum(num) {
				if(num >= 10) {
					return num;
				}else {
					return '0' + num;
				}
			}
		}
	}
</script>

<style>
	.audio {
		background: #F4F4F4;
		padding: 20rpx;
	}
	
	.icon {
		width: 80rpx;
		height: 80rpx;
	}
	
	.flex {
		display: flex;
		flex-direction: row;
	}
	
	.justify-between {
		justify-content: between;
	}
	
	.align-center {
		align-items: center;
	}
	
	.flex-1 {
		flex: 1;
	}
	
	.ml-3 {
		margin-left: 30rpx;
	}
	
	.mr-3 {
		margin-right: 30rpx;
	}
</style>
