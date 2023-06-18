let timeNow = new Date();

/*
to see if i get the right time
console.log(timeNow);
console.log(timeNow.getMilliseconds());
console.log(timeNow.getHours());
console.log(timeNow.getMinutes());
*/

// Current time displayed

function formatDate(date) {
  let year = timeNow.getFullYear();
  let hour = timeNow.getHours();
  let hours = timeNow.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = timeNow.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[timeNow.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[timeNow.getMonth()];

  let today = `${day} ${hour}:${minutes}`;
  return today;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formatDate();

// Change city by submitting a city in the form.

function displayWeatherCondition(response) {
  //console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML =
    response.data.main.humidity + "%";
  document.querySelector("#feel-temperature").innerHTML =
    Math.round(response.data.main.feels_like) + "°C";
  document.querySelector("#clouds").innerHTML =
    response.data.weather[0].description;
}

function submittedCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchCity(city) {
  let apiKey = "b24c131549be27d20ad94a09ceedc7cb";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "b24c131549be27d20ad94a09ceedc7cb";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let cityForm = document.querySelector("#search-form");
cityForm.addEventListener("submit", submittedCity);

// Temperature change 1 : Click on Celcius (F to C)

function changeToC() {
  let changedTemp1 = document.querySelector("#current-temp");
  changedTemp1.innerHTML = "20";
}

// Temperature change 2 : Click on Fahrenheit (C to F)
function changeToF() {
  let changedTemp2 = document.querySelector("#current-temp");
  changedTemp2.innerHTML = "68";
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("New York");
