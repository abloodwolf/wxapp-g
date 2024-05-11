import dayjs from 'dayjs'


// 时间转换成时间戳
export function getTimestamp(time, type = 's') {
	const currentTime = time ? dayjs(time) : dayjs()
	let timestamp = 0
	if(type === 's') {
		timestamp = dayjs(currentTime).unix()
	}
	if(type === 'ms') {
		timestamp = dayjs(currentTime).valueOf()
	}
	return timestamp
}
// 时间格式转换
export function timeForamt(time, format = 'YYYY-MM-DD HH:mm') {
	let res = ''
	if (time) {
		res = dayjs(time).format(format)
		if (time.toString().length === 10) {
			res = dayjs(dayjs.unix(time)).format(format)
		}
	}
	return res
}

export const mergeDate = (date, time, type='s') => {
	const mergeTime = dayjs(`${timeForamt(dayjs(date).valueOf(), 'YYYY/MM/DD')} ${timeForamt(dayjs(time).valueOf(), 'HH:mm:ss')}`)
	return type === 's' ?  mergeTime.unix() : mergeTime.valueOf()
}

// 获取时间对应的是星期几
export function getWeekDay (time) {
	let num
	if (time) {
		num = dayjs(new Date(time)).day()
		if (time.toString().length === 10) {
			num = dayjs(new Date(dayjs.unix(time))).day()
		}
	}
	return num
}
export function getWeekDayText (time) {
	const weekMap = [ '周日', '周一', '周二', '周三', '周四', '周五', '周六'	]
	let num = getWeekDay(new Date(time))
	return weekMap[num]
}

// 时间对比是否相同
export function dayjsIsSame(sTime, endTime, unit = 'day') {
	return dayjs(timeForamt(sTime * 1).valueOf()).isSame(timeForamt(endTime * 1).valueOf(), unit)
}
// 时间比对差值，差多少
export function dayjsDiff (sTime, endTime, unit = 'day', format='YYYY-MM-DD') {
	const num = dayjs(timeForamt(endTime, format)).diff(dayjs(timeForamt(sTime, format)), unit)
	return num
}

