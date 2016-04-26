document.getElementById("loginButton").onclick = function() {

	//The 1st way (require.ensure) - callback calls our module (the best!)
	require.ensure(["./login"], function(require) {
		let login = require("./login");
		login();
	}, 'auth');

	//The 2nd way (AMD) - simplier
	/*require(["./login"], function(login) {
		login();
	});*/

};

document.getElementById("logoutButton").onclick = function() {
	require.ensure(["./logout"], function(require) {
		let logout = require("./logout");
		logout();
	}, 'auth');
};
