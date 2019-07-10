var path = require("path");

module.exports = function(app) {
	// Displays survey page if user has survey in URL or if the user clicks the survey button
	app.get("/map", function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/map.html"));
	});

	// Displays home page by default
	app.use(function(req, res) {
		res.sendFile(path.join(__dirname, "/../public/home.html"));
	});
};