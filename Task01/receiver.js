let section = "politics"; //"arts"; "home"; "science";
let responseFormat = "json";
let apiKey = "883c9597c1166a747b0aae229fe79970:18:74940799";
let url = `http://api.nytimes.com/svc/topstories/v1/${section}.${responseFormat}?api-key=${apiKey}`;

let promise = fetch(url);

let json = promise
	.then( response => response.json())
	.catch( ex => {
		console.log("NYT error", ex);
	});