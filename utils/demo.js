// node抽取多语转换脚本
var fs = require('fs');

const data = fs.readFileSync('data.json');
const str = JSON.parse(data.toString());
// console.log('同步读取：' + str);
const res = []
const fn = (obj, val) => {
    for (var i = 0; i < val.length; i++) {
    	
    }
    return res
}

// const aa = fn(res, str)
// console.log('返回结果：' + res.toString(),  aa);
// // writeFile(aa)
// const bb = JSON.stringify(aa);
// try {
//     fs.writeFileSync('index.json', bb);
//     console.log("JSON data is saved.");
// } catch (error) {
//     console.error(error);
// };