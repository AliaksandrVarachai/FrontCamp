var request = require('request');
var fetch = require('node-fetch');
var localUrl = 'http://127.0.0.1:80';
// request(localUrl, function(error, response, body) {
// 	console.log(body);
// });

fetch(localUrl)
	.then(response => {
		return response.json();
	}).then(function(json) {
		console.log(json);
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});


// console.log(this);

// var promise = new Promise((resolve, reject) => {
// 	setTimeout(() => resolve("result"), 1000);
// 	setTimeout(() => reject(new Error("ignored")), 2000);
// });

// promise
// 	.then(
// 		result => console.log("Fulfilled: " + result),
// 		error => console.log("Rejected: " + error)
// 	);