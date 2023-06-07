const locationEl = document.getElementById("location");
const locationBtnEl = document.getElementById("locationBtn");
const currentCityEl = document.querySelector(".currentLocation");
const currentDateEl = document.querySelector(".currentDate");
const currentTempEl = document.querySelector(".currentTemp");
const currentWindEl = document.querySelector(".currentWind");
const currentHumidityEl = document.querySelector(".currentHumidity");
const currentIconEl = document.querySelector(".currentIcon");
const previousSearchesEl = document.querySelector(".previousSearches");
const previousSearches = [];
const searchDivEl = document.querySelector(".previousSearches");


async function getCoordinatesByName(userInput) {
    let url = "http://api.openweathermap.org/geo/1.0/direct?";
    const params = new URLSearchParams({
        q: userInput,
        appid: "d5039772842e201a8402984e0a92e4eb"
    });
    url += params.toString();
    console.log(url);
    console.log(locationEl.value);

    const response = await fetch(url);
    // Check if response was actually loaded successfully. If not log the whole object.
    if (!response.ok) {
        console.log(response);
        return;
    }
    const data = await response.json();
    console.log(data[0].lat)
    return {
        lat: data[0].lat,
        lon: data[0].lon,
    };
}

async function renderPage(city) {
    let searchedCity = await getCoordinatesByName(city);
    console.log(searchedCity.lat);
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    const params = new URLSearchParams({
        lat: searchedCity.lat,
        lon: searchedCity.lon,
        cnt: 1,
        units: "imperial",
        appid: "d5039772842e201a8402984e0a92e4eb"
    });
    weatherUrl += params.toString();
    console.log(weatherUrl);

    const response = await fetch(weatherUrl);
    // Check if response was actually loaded successfully. If not log the whole object.
    if (!response.ok) {
        console.log(response);
        return;
    }

    const data = await response.json();
    console.log("THIS" + data);
    const cityName = data.city.name;
    const icon = data.list[0].weather[0].icon;
    currentIconEl.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");
    currentIconEl.setAttribute("alt", "weather icon");


    console.log(cityName);
    currentCityEl.textContent = cityName;

    // Get today's date from the API's data
    currentDateEl.textContent = data.list[0].dt_txt;

    const temp = data.list[0].main.temp;
    console.log(temp);
    currentTempEl.textContent = temp;

    const wind = data.list[0].wind.speed;
    console.log(wind);
    currentWindEl.textContent = wind;

    const humidity = data.list[0].main.humidity;
    console.log(humidity);
    currentHumidityEl.textContent = humidity;
}

async function newSearch(e) {
    e.preventDefault();
    let userInput = locationEl.value;
    if (userInput !== "") {
        addWeatherBtn(userInput);
    }
    await renderPage(userInput);
}

async function oldSearch(e) {
    e.preventDefault();
    previousSearch(previousSearchBtnEl);

}

// Get city from local storage for a specific button
async function previousSearch(btn) {
    console.log("inside previous search");
    console.log(btn.id);
    // get required city from local storage using clicked button ID
    const city = localStorage.getItem(btn.id);
    await renderPage(city);
}

function addWeatherBtn(city) {
    // create a new btn element
    const cityBtn = document.createElement("button");
    // add space for styling
    const br = document.createElement("br");
    // display the searched city on the button
    cityBtn.textContent = city;
    // get the section where to append the button
    const searchDivEl = document.querySelector(".locationSearchSection");
    // create a random id for a new button to fetch the stored city
    const id = Math.random();
    cityBtn.setAttribute("id", id.toString());
    //create a class for the previous search button
    cityBtn.classList.add("previousSearchBtn");
    // store city in local storage with a unique ID attached to the button
    localStorage.setItem(id.toString(), city);
    // style button
    cityBtn.classList.add("mt-2");
    cityBtn.classList.add("mb-2");
    cityBtn.classList.add("col-12");
    // on button click, show previous search
    // cityBtn.addEventListener("click", previousSearch(cityBtn));

    searchDivEl.append(cityBtn);
    searchDivEl.append(br);
    // const previousSearchBtnEl = document.querySelector(".previousSearchBtn");
    // return previousSearchBtnEl;
}

// function forecast(){
//     const div = document.createElement("div");
//     // display the searched city on the button
//     cityBtn.textContent = city;
//     // get the section where to append the button
//     const searchDivEl = document.querySelector(".locationSearchSection");
//     // create a random id for a new button to fetch the stored city
//     const id = Math.random();
//     cityBtn.setAttribute("id", id.toString());
//     //create a class for the previous search button
//     cityBtn.classList.add("previousSearchBtn");
//     // store city in local storage with a unique ID attached to the button
//     localStorage.setItem(id.toString(), city);
//     // style button
//     cityBtn.classList.add("mt-2");
//     cityBtn.classList.add("mb-2");
//     cityBtn.classList.add("col-12");
//     // on button click, show previous search
//     // cityBtn.addEventListener("click", previousSearch(cityBtn));
//
//     searchDivEl.append(cityBtn);
//     searchDivEl.append(br);
//     const previousSearchBtnEl = document.querySelector(".previousSearchBtn");
// }

locationBtnEl.addEventListener("click", newSearch);
document.addEventListener("click", function (e){
    const target = e.target.closest(".previousSearchBtn");
    console.log(target);
    if(target) {
        previousSearch(target);
    }
});



