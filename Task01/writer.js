//receiver.js must be loadeded before

//TODO: use Set/Map & Generator & class (maybe to do a switch for loading other section)
//TODO: try the same with Ajax

let article = document.getElementById("article");
let articleSection = document.getElementById("section");

/**
 * creates and returns new tags which contains enumerated hrefs
 * @param  {array} listOfItems 
 * @param  {string} id
 * @param  {string} class
 * @return {HTMLelement}
 */
function getNewLinksHTMLTag(listOfItems, id="listOfArticles", className="listOfArticles") {
	let content = document.createElement("section");
	content.id = id;
	content.className = className;
	let ul = document.createElement("ul");
	let li, a;
	for (item of listOfItems) {
		li = document.createElement("li");
		a = document.createElement('a');
		a.className = "articleItem";
		a.href = item.url;
		a.innerHTML = item.title;
		li.appendChild(a);
		ul.appendChild(li);
	}
	content.appendChild(ul);
	return content;
}

json.then(
	json => document.getElementById("article").appendChild(getNewLinksHTMLTag(json.results))
)