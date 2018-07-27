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
 const log = './server/log.txt';
 const visitorNum = './server/visitorNum.txt';
 const MongoClient = require('mongodb').MongoClient;
 const assert = require('assert');


 // Connection URL
 const mongodbURL = 'mongodb://localhost:27017';

 // Database Name
 const dbName = 'myproject';

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
 	if (clienturl === "/visitorNum") {
 		console.log("正在访问/visitorNum");
 		fs.readFile(visitorNum, function(err, data) {
 			if (err) return console.log(err);
 			let num = data.toString().match(/\b\d+/);
 			num = +num + 1;
 			ACAORes(res, num.toString());
 		});
 	} else if (clienturl.match(/^\/loginIn\??/)) {

 		// 登陆
 		let loginStatus = "fail";
 		let paras = queryStringPares(clienturl, 9);
 		console.log("paras = ", paras);
 		MongoClient.connect(mongodbURL, {
 			useNewUrlParser: true
 		}, function(err, client) {
 			if (err) return console.log("err = ", err);
 			console.log("Connected successfully to server");
 			const db = client.db(dbName);
 			const collection = db.collection('documents');
 			// Find some documents
 			collection.findOne({
 				"name": paras.name,
 				"password": paras.password
 			}, function(err, docs) {
 				if (docs) {
 					console.log("该用户已存在,可以登录");
 					ACAORes(res, "success");
 				} else {
 					console.log("该用户不存在，不可以登陆");
 					ACAORes(res, "fail");
 				}
 				client.close();
 			});
 		});
 	} else if (clienturl.match(/^\/loginUp\??/)) {

 		// 注册
 		let paras = queryStringPares(clienturl, 9);
 		console.log("paras = ", paras);
 		MongoClient.connect(mongodbURL, {
 			useNewUrlParser: true
 		}, function(err, client) {
 			if (err) console.log("err = ", err);
 			assert.equal(null, err);
 			console.log("Connected successfully to server");
 			const db = client.db(dbName);
 			const collection = db.collection('documents');
 			// Find some documents
 			collection.findOne({
 				"name": paras.name
 			}, function(err, docs) {
 				if (docs) {
 					console.log("该用户已存在");
 					ACAORes(res, "exist");
 				} else {
 					console.log("该用户不存在，可以注册");
 					// 插入
 					insertDocuments(db, [paras], function() {
 						client.close();
 					});
 					// 查找
 					findDocuments(db, function() {
 						client.close();
 					});
 					ACAORes(res, "success");
 				}
 				client.close();
 			});
 		});

 	} else {
 		// 获取所有请求头信息
 		console.log(`Printing Header ...`);
 		for (let prop in req.headers) {
 			console.log(`${prop} = ${req.headers[prop]}`);
 			if (htmlFlag) append += `${prop} = ${req.headers[prop]}\r\n`;
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

 		// 记录访问日志和人数
 		// 验证文件的可读可写行
 		if (htmlFlag) {
 			writeLogAndNum(log, append, visitorNum);
 		}
 	}

 	res.setTimeout(10000);
 	res.on('timeout', () => {
 		console.log('oh no, timeout!');
 		res.end();
 	});
 });

 server.listen(8080, () => {
 	console.log('i am listening!');
 });

 // queryString.parse() 
 function queryStringPares(clienturl, num) {
 	let str = clienturl.slice(num);
 	let set = str.split("&");
 	let paras = {};
 	let key = "";
 	let value = "";
 	set.forEach((item, index) => {
 		key = item.split("=")[0];
 		value = item.split("=")[1];
 		paras[key] = value;
 	});
 	return paras;
 }

 // 增
 const insertDocuments = function(db, data, callback) {
 	// Get the documents collection
 	const collection = db.collection('documents');
 	// Insert some documents
 	collection.insertMany(data, function(err, result) {
 		console.log("Inserted 3 documents into the collection");
 		callback(result);
 	});
 }

 // 删
 const removeDocument = function(db, callback) {
 	// Get the documents collection
 	const collection = db.collection('documents');
 	// Delete document where a is 3
 	collection.deleteOne({
 		a: 3
 	}, function(err, result) {
 		// assert.equal(err, null);
 		// assert.equal(1, result.result.n);
 		console.log("Removed the document with the field a equal to 3");
 		callback(result);
 	});
 }

 // 改
 const updateDocument = function(db, callback) {
 	// Get the documents collection
 	const collection = db.collection('documents');
 	// Update document where a is 2, set b equal to 1
 	collection.updateOne({
 		a: 2
 	}, {
 		$set: {
 			b: 1
 		}
 	}, function(err, result) {
 		// assert.equal(err, null);
 		// assert.equal(1, result.result.n);
 		console.log("Updated the document with the field a equal to 2");
 		callback(result);
 	});
 }


 // 查
 const findDocuments = function(db, callback) {
 	// Get the documents collection
 	const collection = db.collection('documents');
 	// Find some documents
 	collection.find({}).toArray(function(err, docs) {
 		// assert.equal(err, null);
 		console.log("Found the following records");
 		console.log(docs);
 		callback(docs);
 	});
 }

 // 提升性能
 const indexCollection = function(db, callback) {
 	db.collection('documents').createIndex({
 			"a": 1
 		},
 		null,
 		function(err, results) {
 			console.log(results);
 			callback();
 		}
 	);
 };

 const ACAORes = function(res, str) {
 	res.setHeader('Access-Control-Allow-Origin', '*'); //支持全域名访问，不安全，部署后需要固定限制为客户端网址
 	res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,DELETE'); //支持的http 动作
 	res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type'); //响应头 请按照自己需求添加。
 	res.writeHead(200, {
 		'Content-Type': 'text/plain;charset="utf-8"'
 	})
 	res.write(str);
 	res.end();
 }