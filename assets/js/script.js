searchBtnEl = document.getElementById("search-button");
searchInputEl = document.getElementById("search-input");

searchBtnEl.addEventListener("click", function() {
    if (searchInputEl === "") {
        alert("Please enter a search term")
        return;
    }
    var recentSearch = searchInputEl.value;
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.push(recentSearch);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
})
