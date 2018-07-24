 /**
  * 
  * @authors Lv Hongbin (hblvsjtu@163.com)
  * @date    2018-06-21 11:02:19
  * @version 1.0.0
  * @description test for stream on the server
  */

 const http = require('http');
 const zlib = require('zlib');
 const fs = require('fs');
 const crypto = require('crypto');
 const url = require('url');
 const writeLogAndNum = require('./server/writeLogAndNum.js');
 const base = './dist';
 const log = './log.txt';
 const visitorNum = './visitorNum.txt';

 // 服务端示例
 // 对每一个请求运行 gzip 操作的成本是十分高昂的.
 // 缓存压缩缓冲区是更加高效的方式.
 const server = http.createServer((req, res) => {
 	// res.write("welcome to my home!");

 	// 日志记录
 	let append = "";
 	let htmlFlag = false;

 	// 获取访问地址
 	let clienturl = req.url;
 	console.log(`req.url = ${clienturl}`);
 	console.log("disturl = ", base + clienturl);
 	if (clienturl === "/index.html") {
 		htmlFlag = true;
 	}

 	// 获取所有请求头信息
 	console.log(`Printing Header ...`);
 	for (let prop in req.headers) {
 		console.log(`${prop} = ${req.headers[prop]}`);
 		if (htmlFlag) append += `${prop} = ${req.headers[prop]}\n\r`;
 	}


 	// 获取文件流对象
 	const raw = fs.createReadStream(base + clienturl);
 	// 允许接收的编码类型
 	let encoding = req.headers['accept-encoding']; //这里要全小写
 	if (!encoding) {
 		encoding = '';
 	}

 	// 获取请求头中的修改时间
 	let ifModifiedSince = req.headers['if-modified-since']; //这里要全小写

 	if (!ifModifiedSince) {
 		ifModifiedSince = '';
 	}

 	// 获取请求头中的if-none-match
 	let ifNoneMatch = req.headers['if-none-match']; //这里要全小写

 	const gzip = zlib.createGzip();
 	const deflate = zlib.createDeflate();

 	// 利用时间戳和if-modified-since判断是否需要缓存
 	// 判断文件的修改时间决定是否发送

 	// fs.stat('./index.html', (err, stat) => {
 	// 	// 获取文件最近一次的修改时间
 	// 	let lastModified = stat.mtime.toUTCString();
 	// 	console.log(`lastModified = ${lastModified}`);
 	// 	if (lastModified == ifModifiedSince) {

 	// 		// 没有过期
 	// 		res.writeHead(304, 'Not Modified');
 	// 	} else {

 	// 		// 已经过期
 	// 		res.setHeader('Last-Modified', lastModified);
 	// 		if (/\bdeflate\b/.test(encoding)) {
 	// 			res.writeHead(200, {
 	// 				'Content-Encoding': 'deflate'
 	// 			});
 	// 			raw.pipe(deflate).pipe(res);
 	// 		} else if (/\bgzip\b/.test(encoding)) {
 	// 			res.writeHead(200, {
 	// 				'Content-Encoding': 'gzip'
 	// 			});
 	// 			raw.pipe(gzip).pipe(res);
 	// 		} else {
 	// 			res.writeHead(200, {});
 	// 			raw.pipe(res);
 	// 		}
 	// 	}
 	// });

 	// 利用ETag和hash值判断是否需要缓存
 	fs.readFile(base + clienturl, (err, fd) => {

 		if (err) {
 			res.writeHeader(404, {
 				'content-type': 'text/html;charset="utf-8"'
 			});
 			res.write('<h1>404错误</h1><p>你要找的页面不存在</p>');
 			res.end();
 		} else {
 			// 获取文件的hash值
 			const hash = crypto.createHash('sha256');
 			hash.update(fd);
 			const hashsum = hash.digest('hex');
 			console.log(`hash = ${hashsum}`);
 			if (hashsum == ifNoneMatch) {

 				// 没有过期
 				console.log('没有过期');
 				res.writeHead(304, 'Not Modified');
 			} else {
 				// 已经过期
 				console.log('已经过期');
 				const expires = new Date();
 				expires.setTime(expires.getTime + 10 * 1000); //10秒
 				res.setHeader('Expires', expires.toUTCString());
 				res.setHeader('Cache-Control', 'max-age=' + 10 * 1000); //10秒
 				res.setHeader('ETag', hashsum);
 				if (/\bdeflate\b/.test(encoding)) {
 					res.writeHead(200, {
 						'Content-Encoding': 'deflate'
 					});
 					raw.pipe(deflate).pipe(res);
 				} else if (/\bgzip\b/.test(encoding)) {
 					res.writeHead(200, {
 						'Content-Encoding': 'gzip'
 					});
 					raw.pipe(gzip).pipe(res);
 				} else {
 					res.writeHead(200, {});
 					raw.pipe(res);
 				}
 			}
 		}
 	})


 	res.setTimeout(1000);
 	res.on('timeout', () => {
 		console.log('oh no, timeout!');
 		res.end();
 	});

 	// 记录访问日志和人数
 	// 验证文件的可读可写行
 	if (htmlFlag) {
 		writeLogAndNum(log, append, visitorNum);
 	}
 });

 server.listen(8080, () => {
 	console.log('i am listening!');
 });