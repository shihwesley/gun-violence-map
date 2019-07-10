var friends = require("../data/friends");

module.exports = function (app) {
  // Return friends as JSON
  app.get("/api/friends", function (req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function (req, res) {
    console.log(req.body.scores);

    // Collect user's details
    var user = req.body;

    for (var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    // Default friend is first one, but result will be one with the least difference
    var companionIndex = 0;
    var minimumDifference = Infinity;

    // Loop through each question and check the difference per question 
    // Add each diffference to the total difference
    for (var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for (var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      // Check if there if that total difference is lower than the minimum difference, and if so replace it
      if (totalDifference < minimumDifference) {
        companionIndex = i;
        minimumDifference = totalDifference;
      }
    }

    // Add user to friend array after finding match
    friends.push(user);

    // Display to browser the companion
    res.json(friends[companionIndex]);
  });
};