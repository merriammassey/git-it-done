// test the API
/*
var getUserRepos = function() {
    fetch("https://api.github.com/users/octocat/repos").then(function(response) {
        response.json().then(function(data) {
          console.log(data);
        });
      });
    console.log("outside");
}

 /*   var response = fetch("https://api.github.com/users/octocat/repos");
    console.log(response);
  };
  */

  // get any user's respositories
 var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
        console.log(data);
      });
    });
  };
  getUserRepos();