
var repoNameEl = document.querySelector("#repo-name");
var repoNameEl = document.querySelector("#repo-name");

//function to extract query value from query string
var getRepoName = function() {
    // get repo name from URL query
    var queryString = document.location.search;
    var repoName = queryString.split("=")[1];
    //console.log(repoName);
    if (repoName) {
        // display repo name on the page
        repoNameEl.textContent = repoName;
    
        getRepoIssues(repoName);
      } else {
        // if no repo was given, redirect to the homepage
        document.location.replace("./index.html");
      }
    };

// identify container for message about >30 issues
var limitWarningEl = document.querySelector("#limit-warning");

// identify issues container
var issueContainerEl = document.querySelector("#issues-container");

// function to take in a repo name as parameter
var getRepoIssues = function(repo) {
    console.log(repo);

    // create a var to hold the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    //create a request with apiUrl variable to receive and handle server's response
    fetch(apiUrl).then(function(response) {
        //if request is successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data into dom function
                displayIssues(data);

                //check if api has paginated issues (>30issues)
                if (response.headers.get("Link")) {
                 //   console.log("repo has more than 30 issues");
                displayWarning(repo);
                }
            });
        } else {
            //alert("There was a problem with your request.");
            //redirect to homepage
            document.location.replace("./index.html");
        }
    });
};
var displayIssues = function(issues) {
    //if there are no open issues, display this info and exit this function
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
        }

    // loop over response data and create an <a> element for each issue
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        // style it
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        // give it a url link
        issueEl.setAttribute("href", issues[i].html_url);
        // make the link open in a new tab
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
        typeEl.textContent = "(Pull request)";
        } else {
        typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        // add issue container to issue lement
        issueContainerEl.appendChild(issueEl);
        }
    };

// function for displaying limit warning
var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    
    //append link element with href attribute to this link and append 
    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning container
    limitWarningEl.appendChild(linkEl);
};

//getRepoIssues("facebook/react");
getRepoName(); 