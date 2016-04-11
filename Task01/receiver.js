const responseFormat = "json";
const apiKey = "883c9597c1166a747b0aae229fe79970:18:74940799";

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

let newsPiece = new NewsPiece(responseFormat, apiKey, sectionGenerator.next().value);
let json = newsPiece.responseJSON;