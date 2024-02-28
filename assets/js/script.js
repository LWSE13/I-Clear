var searchBtnEl = document.getElementById("search-button");
var searchInputEl = document.getElementById("search-input");
var historyButtonEl = document.getElementById("clear-history");
var recentSearchContainerEl = document.getElementById("button-container");

const apiBase = "https://api.openweathermap.org";
const apiKey = "f23ee9deb4e1a7450f3157c44ed020e1";

// Function to search for weather. added location and recentButtonCheck as parameters to prevent button duplication
function searchForWeather(location, recentButtonCheck) {
    
    // Check if location is empty and prompts user to enter a search term
    if (location === "") {
        alert("Please enter a search term")
        return;
    }

    // Fetch request to Openweather API. Used backticks to insert my api info and location variable (when it is defined by the user input)
    var weatherRequest = `${apiBase}/data/2.5/weather?q=${location}&appid=${apiKey}`;
    fetch(weatherRequest)
        .then(function(response) {
            if (!response.ok) {
                console.log('Error: Location not found');
                alert('Error: Location not found');
                return;
            }
            return response.json();
        })
        .then(function(data) {
            if (data) {
                console.log(data);
                // TODO: update HTML with weather data

                if (recentButtonCheck) {
                    var recentSearchButtonEl = document.createElement("button");
                    recentSearchButtonEl.textContent = location;
                    recentSearchButtonEl.classList.add ("button-styling");
                    recentSearchButtonEl.addEventListener("click", function() {
                        searchForWeather(location, false);
                    });
                    recentSearchContainerEl.appendChild(recentSearchButtonEl);
                    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
                    searchHistory.push(location);
                    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
                }
                searchInputEl.value = "";
            }
        });
}

// Event listener for search button
searchBtnEl.addEventListener("click", function() {
    var searchValue = searchInputEl.value;
    searchForWeather(searchValue, true);
})

// Event listener for history button
historyButtonEl.addEventListener("click", function() {
    localStorage.clear();
})

// Load recent searches from local storage

// Display API data on page