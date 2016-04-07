var request = require('request');
var fetch = require('node-fetch');
var localUrl = 'http://127.0.0.1';
// request(localUrl, function(error, response, body) {
// 	console.log(body);
// });

fetch(localUrl)
	.then(response => {console.log(response.body)})

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