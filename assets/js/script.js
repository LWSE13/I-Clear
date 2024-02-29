var searchBtnEl = document.getElementById("search-button");
var searchInputEl = document.getElementById("search-input");
var historyButtonEl = document.getElementById("clear-history");
var recentSearchContainerEl = document.getElementById("button-container");
var cityHeadingEl = document.getElementById("city-heading");
var dateEl = document.getElementById("date");
var mainTempEl = document.getElementById("main-temp");
var mainHumidityEl = document.getElementById("main-humidity");
var mainWindEl = document.getElementById("main-wind");

const apiBase = "https://api.openweathermap.org";
const apiKey = "f23ee9deb4e1a7450f3157c44ed020e1";


function loadSearchHistory () {
    var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
    for (let i=0; i<searchHistory.length; i++) {
        //create button
        var recentSearchButtonEl = document.createElement("button");
        //add search history text
        recentSearchButtonEl.textContent = searchHistory[i];
        // class list add
        recentSearchButtonEl.classList.add("button-styling");
        //add event listener that calls the searchForWeather function with the parameters of the search history index of the array and duplicate button check false
        recentSearchButtonEl.addEventListener("click", function() {
            searchForWeather(searchHistory[i], false)
        });
        recentSearchContainerEl.appendChild(recentSearchButtonEl)
    }
}
loadSearchHistory();
// Function to search for weather. added location and recentButtonCheck as parameters to prevent button duplication
function searchForWeather(location, recentButtonCheck) {
    
    // Check if location is empty and prompts user to enter a search term
    if (location === "") {
        alert("Please enter a search term")
        return;
    }

    // Fetch request to Openweather API. Used backticks to insert my api info and location variable (when it is defined by the user input line 55)
    var weatherRequest = `${apiBase}/data/2.5/forecast?q=${location}&appid=${apiKey}`;
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
                var cityName = data.city.name;
                var currentDate = data.list[0].dt_txt.split(" ")[0];
                var mainTemp = data.list[0].main.temp;
                var mainHumidity = data.list[0].main.humidity;
                var mainWind = data.list[0].wind.speed;
                var weatherIconCode = data.list[0].weather[0].icon;
                var weatherIconUrl = `http://openweathermap.org/img/w/${weatherIconCode}.png`;

                cityHeadingEl.textContent = cityName;
                dateEl.textContent = currentDate;
                mainTempEl.textContent = "Temperature: " + mainTemp;
                mainHumidityEl.textContent = "Humidity: " + mainHumidity;
                mainWindEl.textContent = "Wind Speed: " + mainWind;
                var weatherIconEl = document.createElement('img');
                weatherIconEl.src = weatherIconUrl;
                cityHeadingEl.appendChild(weatherIconEl);

                



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
    recentSearchContainerEl.innerHTML = "";
})

// Display API data on page