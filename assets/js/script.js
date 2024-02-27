var searchBtnEl = document.getElementById("search-button");
var searchInputEl = document.getElementById("search-input");
var historyButtonEl = document.getElementById("clear-history");
var recentSearchContainerEl = document.getElementById("button-container");
const apiBase = "https://api.openweathermap.org";
const apiKey = "f23ee9deb4e1a7450f3157c44ed020e1";


searchBtnEl.addEventListener("click", function() {
    if (searchInputEl.value === "") {
        alert("Please enter a search term")
        return;
    }
    var recentSearch = searchInputEl.value;
    var newButton = document.createElement("button");
    newButton.textContent = recentSearch;
    recentSearchContainerEl.appendChild(newButton);
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(recentSearch);
    searchInputEl.value = "";
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));

    var query = `${apiBase}/data/2.5/weather?q=${recentSearch}&appid=${apiKey}`;
    fetch(query)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            // update HTML with weather data
        });
})

historyButtonEl.addEventListener("click", function() {
    localStorage.clear();
})