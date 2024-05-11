const request = ({url, data, method = 'GET', header}) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			data: data,
			method: method,
			// header: header,
			success: (res) => {
				console.log('res==', res)
				if(+res?.statusCode === 200) {
					resolve(res?.data)
				} else {
					reject(res)
				}
			},
			fail: (error) => {
				console.log('error', error)
				reject(error)
			}
		});
	})
}

export default request;