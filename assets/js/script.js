const locationEl = document.getElementById("location");
const locationBtnEl = document.getElementById("locationBtn");
const currentCityEl = document.querySelector(".currentLocation");
const currentDateEl = document.querySelector(".currentDate");
const currentTempEl = document.querySelector(".currentTemp");
const currentWindEl = document.querySelector(".currentWind");
const currentHumidityEl = document.querySelector(".currentHumidity");
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
// Finish this
async function getCoordinatesByZip(userInput){
    let url = "http://api.openweathermap.org/geo/1.0/zip?zip=";
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

}

function getCoordsFromQuery(userInput){
    let zipCodeInput = /\d/.test(userInput);
    if (zipCodeInput) {
        return getCoordinatesByZip(userInput);
    } else {
        return getCoordinatesByName(userInput);
    }
}

function addWeatherBtn(city) {
    // create a new btn element
    const cityBtn = document.createElement("button");
    cityBtn.textContent = city;
    const searchDivEl = document.querySelector(".previousSearches");
    searchDivEl.append(cityBtn);
}

async function getWeather(e){
    e.preventDefault();
    let userInput = await getCoordsFromQuery(locationEl.value);
    console.log(userInput.lat);
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    const params = new URLSearchParams({
        lat: userInput.lat,
        lon: userInput.lon,
        units: "imperial",
        cnt: "5",
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
    const cityName = data.city.name;
    console.log(cityName);
    currentCityEl.textContent = cityName;
    addWeatherBtn(cityName);

    const date = data.list[0].dt_txt;
    console.log(date);
    currentDateEl.textContent = date;

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


locationBtnEl.addEventListener("click", getWeather);

