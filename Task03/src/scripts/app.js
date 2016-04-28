require("babel-polyfill");
require("whatwg-fetch");

function* SectionGenerator() {
	const sections = [
		"home",
		"world",
		"national",
		"politics",
		"nyregion",
		"business",
		"opinion",
		"technology",
		"science",
		"health",
		"sports",
		"arts",
		"fashion",
		"dining",
		"travel",
		"magazine",
		"realestate"
	];
	for (let i = 0; i < sections.length; i++) {
		yield sections[i];
	}
}

let sectionGenerator = SectionGenerator();

class NewsPiece {
	constructor(responseFormat, apiKey, section) {
		this._responseFormat = responseFormat;
		this._apiKey = apiKey;
		this._section = section;
		this.createUrl();
	}
	createUrl() {
		this._url = `http://api.nytimes.com/svc/topstories/v1/${this._section}.${this._responseFormat}?api-key=${this._apiKey}`;
	}
	set section(section) {
		this._section = section;
		this.createUrl();
	}
	
	get section() {
		return this._section;
	}
	get url() {
		return this._url;
	}
	get responseJSON() {
		return fetch(this._url)
			.then( response => response.json())
			.catch( ex => console.log("NYT error: wrong url or section", ex));
	}
}

document.addEventListener("DOMContentLoaded", function() {

	let firstNewsClickListener = function() {
		this.innerHTML = "Next section of news";
		this.removeEventListener("click", firstNewsClickListener);
		//path relatively of index.html
		require.ensure([], function(require) {
			let newsPiece = require("./news-piece");
		}, 'news-piece');
	};

	document.getElementById("nav-section-name").addEventListener("click", firstNewsClickListener);

});

//TODO: other way to share variables of entry point?
window.NewsPiece = NewsPiece;
window.SectionGenerator = SectionGenerator;