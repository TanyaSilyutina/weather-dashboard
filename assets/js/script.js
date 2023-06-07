const locationEl = document.getElementById("location");
const locationBtnEl = document.getElementById("locationBtn");
const currentCityEl = document.querySelector(".currentLocation");
const currentDateEl = document.querySelector(".currentDate");
const currentTempEl = document.querySelector(".currentTemp");
const currentWindEl = document.querySelector(".currentWind");
const currentHumidityEl = document.querySelector(".currentHumidity");
const currentIconEl = document.querySelector(".currentIcon");
const futureForecastEl = document.querySelector(".futureForecast")
const previousSearchesEl = document.querySelector(".previousSearches")
const weatherViewSectionEl = document.querySelector(".weatherViewSection")


const futureDateEl1 = document.querySelector(".futureDate1");
const futureTempEl1 = document.querySelector(".futureTemp1");
const futureWindEl1 = document.querySelector(".futureWind1");
const futureHumidityEl1 = document.querySelector(".futureHumidity1");
const futureIconEl1 = document.querySelector(".futureIcon1");

const futureDateEl2 = document.querySelector(".futureDate2");
const futureTempEl2 = document.querySelector(".futureTemp2");
const futureWindEl2 = document.querySelector(".futureWind2");
const futureHumidityEl2 = document.querySelector(".futureHumidity2");
const futureIconEl2 = document.querySelector(".futureIcon2");

const futureDateEl3 = document.querySelector(".futureDate3");
const futureTempEl3 = document.querySelector(".futureTemp3");
const futureWindEl3 = document.querySelector(".futureWind3");
const futureHumidityEl3 = document.querySelector(".futureHumidity3");
const futureIconEl3 = document.querySelector(".futureIcon3");

const futureDateEl4 = document.querySelector(".futureDate4");
const futureTempEl4 = document.querySelector(".futureTemp4");
const futureWindEl4 = document.querySelector(".futureWind4");
const futureHumidityEl4 = document.querySelector(".futureHumidity4");
const futureIconEl4 = document.querySelector(".futureIcon4");

const futureDateEl5 = document.querySelector(".futureDate5");
const futureTempEl5 = document.querySelector(".futureTemp5");
const futureWindEl5 = document.querySelector(".futureWind5");
const futureHumidityEl5 = document.querySelector(".futureHumidity5");
const futureIconEl5 = document.querySelector(".futureIcon5");


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
    futureForecastEl.classList.remove("d-none");
    previousSearchesEl.classList.remove("d-none");
    weatherViewSectionEl.classList.remove("d-none");

    let searchedCity = await getCoordinatesByName(city);
    console.log(searchedCity.lat);
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?";
    const params = new URLSearchParams({
        lat: searchedCity.lat,
        lon: searchedCity.lon,
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
    forecast(data);
}

function forecast(data) {
    console.log(data);
    let icon;

    futureDateEl1.textContent = data.list[0].dt_txt;
    futureTempEl1.textContent = data.list[0].main.temp;
    futureWindEl1.textContent = data.list[0].wind.speed;
    futureHumidityEl1.textContent = data.list[0].main.humidity;
    icon = data.list[0].weather[0].icon;
    futureIconEl1.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");
    futureIconEl1.setAttribute("alt", "weather icon");


    futureDateEl2.textContent = data.list[8].dt_txt;
    futureTempEl2.textContent = data.list[8].main.temp;
    futureWindEl2.textContent = data.list[8].wind.speed;
    futureHumidityEl2.textContent = data.list[8].main.humidity;
    icon = data.list[8].weather[0].icon;
    futureIconEl2.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");
    futureIconEl2.setAttribute("alt", "weather icon");

    futureDateEl3.textContent = data.list[16].dt_txt;
    futureTempEl3.textContent = data.list[16].main.temp;
    futureWindEl3.textContent = data.list[16].wind.speed;
    futureHumidityEl3.textContent = data.list[16].main.humidity;
    icon = data.list[16].weather[0].icon;
    futureIconEl3.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");
    futureIconEl3.setAttribute("alt", "weather icon");

    futureDateEl4.textContent = data.list[24].dt_txt;
    futureTempEl4.textContent = data.list[24].main.temp;
    futureWindEl4.textContent = data.list[24].wind.speed;
    futureHumidityEl4.textContent = data.list[24].main.humidity;
    icon = data.list[32].weather[0].icon;
    futureIconEl4.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");
    futureIconEl4.setAttribute("alt", "weather icon");

    futureDateEl5.textContent = data.list[32].dt_txt;
    futureTempEl5.textContent = data.list[32].main.temp;
    futureWindEl5.textContent = data.list[32].wind.speed;
    futureHumidityEl5.textContent = data.list[32].main.humidity;
    icon = data.list[32].weather[0].icon;
    futureIconEl5.setAttribute("src", "https://openweathermap.org/img/w/" + icon + ".png");
    futureIconEl5.setAttribute("alt", "weather icon");

    // dynamic?
    // for (let j = 0; j < 40; j += 8) {
    //     // const icon = data.list[j].weather[j].icon;
    //
    //     const date = data.list[j].dt_txt;
    //     console.log(date + j);
    //
    //     // const temp = data.list[j].main.temp;
    //     // console.log(temp);
    //     //
    //     // const wind = data.list[j].wind.speed;
    //     // console.log(wind);
    //     //
    //     // const humidity = data.list[j].main.humidity;
    //     // console.log(humidity);
    // }
}

async function newSearch(e) {

    e.preventDefault();
    let userInput = locationEl.value;
    if (userInput !== "") {
        addWeatherBtn(userInput);
    }
    await renderPage(userInput);
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


locationBtnEl.addEventListener("click", newSearch);
document.addEventListener("click", async function (e) {
    const target = e.target.closest(".previousSearchBtn");
    console.log(target);
    if (target) {
        await previousSearch(target);
    }
});



