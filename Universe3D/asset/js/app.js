/**
 * 
 * @authors LvHongbin (hblvsjtu@163.com)
 * @date    2018-07-26 21:10:45
 * @version v0.0.1
 */

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Use connect method to connect to the server
MongoClient.connect(url, {
	useNewUrlParser: true
}, function(err, client) {
	if (err) console.log("err = ", err);
	assert.equal(null, err);
	console.log("Connected successfully to server");

	const db = client.db(dbName);

	// 插入
	insertDocuments(db, function() {
		client.close();
	});

	// 查找
	findDocuments(db, function() {
		client.close();
	});

	// 更新
	updateDocument(db, function() {
		client.close();
	});

	// 删除
	removeDocument(db, function() {
		client.close();
	})

	// 辅助 用于提升性能，使用的时候嵌套在CRUD里面的回调函数中使用
	// indexCollection(db, function() {
	// 	client.close();
	// });

	client.close();
});

// 增
const insertDocuments = function(db, callback) {
	// Get the documents collection
	const collection = db.collection('documents');
	// Insert some documents
	collection.insertMany([{
		a: 1
	}, {
		a: 2
	}, {
		a: 3
	}], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
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
		assert.equal(err, null);
		assert.equal(1, result.result.n);
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
		assert.equal(err, null);
		assert.equal(1, result.result.n);
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
		assert.equal(err, null);
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