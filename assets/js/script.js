let locationEl = document.getElementById("location");
let locationBtnEl = document.getElementById("locationBtn");
const previousSearches = [];

async function getCoordinatesByName() {
    let url = "http://api.openweathermap.org/geo/1.0/direct?";
    const params = new URLSearchParams({
        q: locationEl.value,
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

    let locationCoordinates;

    // // Loop over the data, return lat lob objects
}

async function getCoordinatesByZip(){
    let url = "http://api.openweathermap.org/geo/1.0/zip?zip=";
    const params = new URLSearchParams({
        q: locationEl.value,
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

function hasNumbers(userInput){
    let zipCodeInput = /\d/.test(userInput);
    if (zipCodeInput) {
        // call getCoordinatesByZip
    } else {
        // call getCoordinatesByName
    }
}

async function getWeather(){
    let weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";

    const params = new URLSearchParams({
        q: "",
        units: "imperial",
        appid: "d5039772842e201a8402984e0a92e4eb"
    });
    weatherUrl += params.toString();
    console.log(weatherUrl);
}

locationBtnEl.addEventListener("click");

