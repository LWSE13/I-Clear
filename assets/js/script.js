var searchBtnEl = document.getElementById("search-button");
var searchInputEl = document.getElementById("search-input");
var historyButtonEl = document.getElementById("clear-history");
var recentSearchContainerEl = document.getElementById("button-container");


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
})

historyButtonEl.addEventListener("click", function() {
    localStorage.clear();
})