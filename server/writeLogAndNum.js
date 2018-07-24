/**
 * 
 * @authors LvHongbin (hblvsjtu@163.com)
 * @date    2018-07-24 18:37:47
 * @version v0.0.1
 */
const fs = require('fs');

// 获取访问时间
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var seperator2 = ":";
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	if (month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if (strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
		" " + date.getHours() + seperator2 + date.getMinutes() +
		seperator2 + date.getSeconds();
	return currentdate;
}

// 记录访问日志和人数
function writeLogAndNum(log, append, visitorNum) {
	fs.open(log, 'r', (err, fd) => {
		// log
		if (err) {
			if (err.code === 'ENOENT') {
				console.error('文件不存在');
				fs.writeFile(log, "", function(err) {
					if (err) {
						console.error(err);
					} else {
						console.log('文件创建成功');
					}
					return;
				})
			} else throw err;
		}

		//readMyData(fd);
		console.log('文件可读' + fd);
		append = `访问时间：${getNowFormatDate()}\n\r${append}\n\r\n\r`;
		fs.appendFile(log, append, function() {
			console.log('追加内容完成');
		});

		// 关闭文件 
		if (typeof fd !== "number") return;
		fs.close(fd, function(err) {
			if (err) console.error(err);
			console.log('文件关闭成功');
		});
	});

	// visitorNum
	fs.open(visitorNum, 'r', (err, fd) => {
		if (err) {
			if (err.code === 'ENOENT') {
				console.error('文件不存在');
				fs.writeFile(visitorNum, "总访问次数： 0", function(err) {
					if (err) {
						console.error(err);
					} else {
						console.log('文件创建成功');
					}
					return;
				})
			} else throw err;
		}
		fs.readFile(visitorNum, function(err, data) {
			if (err) return console.log(err);
			let num = data.toString().match(/\b\d+/);
			num = +num + 1;
			fs.writeFile(visitorNum, "总访问次数： " + num, function(err) {
				if (err) {
					console.error(err);
				} else {
					console.log('写入成功');
				}
			});　
		});
		// 关闭文件 
		if (typeof fd !== "number") return;
		fs.close(fd, function(err) {
			if (err) console.error(err);
			console.log('文件关闭成功');
		});
	});
}

module.exports = writeLogAndNum;