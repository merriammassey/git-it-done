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
 // identify containers for displaying data
 var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");



// capture form input
 var userFormEl = document.querySelector("#user-form");
 var nameInputEl = document.querySelector("#username");

 // a function to handle the form input
 var formSubmitHandler = function(event) {
    // prevent the event from bubbling up to next element
    event.preventDefault();

    // get value from input element and trim off any spaces
    var username = nameInputEl.value.trim();

    if (username) {
    getUserRepos(username);
    //clear out the name
    nameInputEl.value = "";
    } else {
    alert("Please enter a GitHub username");
    }
        console.log(event);
 };

 // get any user's respositories
 var getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
  
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // handle error in the event user account doesn't exist
        if (response.ok) {
          response.json().then(function(data) {
            displayRepos(data, user);
          });
        } else {
            // doesn't display any status text, though, as in 6.2.6
          alert("Error: " + response.statusText);
        }
    })
    // handle error caused by internet connection issues
    .catch(function(error) {
      // Notice this `.catch()` getting chained onto the end of the `.then()` method
      alert("Unable to connect to GitHub");
    });
  };
//  getUserRepos();

userFormEl.addEventListener("submit", formSubmitHandler);

// function that accepts array of data and search term as parameters
var displayRepos = function(repos, searchTerm) {
    // handle error in event user has no repos - check if api returned any repos
    if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  
  console.log(repos);
    console.log(searchTerm);

      // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    //loop over repos - 
    for (var i = 0; i< repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a repoEl div for each repo 
        var repoEl = document.createElement("div");
        //format appeance of repoEl
        repoEl.classList = "list-item flex-row justify-space-between alignn-center";

        //create a span elelent to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML = 
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        //append statusEl to repoEl div
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
  };

