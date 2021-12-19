let now = new Date();

let date = document.querySelector("#current-date");

let hours = now.getHours();
let minutes = now.getMinutes();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day} ${hours}:${minutes}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      let max = Math.round(forecastDay.temp.max);
      let min = Math.round(forecastDay.temp.min);
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="forecast-day-week">
            ${formatDay(forecastDay.dt)}
          </div>
          <img src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png" height="70"
          />
          <div class="forecast-temperatures">
            <span class="forecast-temp-max">${max}º</span>
            <span class="forecast-temp-min">${min}º</span>
          </div>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + ` </div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "c7dca84c0fd098022472de54bb75f43a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function getImperialForecast(coordinates) {
  let apiKey = "c7dca84c0fd098022472de54bb75f43a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function getWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let degrees = document.querySelector("#degrees-value");
  degrees.innerHTML = `${temperature}`;
  let celsius = document.querySelector("#celsius-degrees");
  celsius.innerHTML = "ºC";
  let fahrenheit = document.querySelector("#fahrenheit-degrees");
  fahrenheit.innerHTML = "ºF";
  let description = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = `${description}`;
  windMetric = response.data.wind.speed;
  let wind = Math.round(windMetric);
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let humidityvalue = document.querySelector("#humidity");
  humidityvalue.innerHTML = `Humidity: ${humidity}%`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = `${searchedCity.value}`;
  let apiKey = "c7dca84c0fd098022472de54bb75f43a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getWeather);
}

function getWeatherImperial(response) {
  getImperialForecast(response.data.coord);
}

function searchCityImperial(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = `${searchedCity.value}`;
  let apiKey = "c7dca84c0fd098022472de54bb75f43a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=imperial&appid=${apiKey}`;

  axios.get(apiUrl).then(getWeatherImperial);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
let search = document.querySelector("#search-button");
search.addEventListener("click", searchCity);

//the following part was originally needed for the search of the current city.
//leaving it here to always have a reference of the code I wrote

function getCurrent(response) {
  let city = response.data.name;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = `${city}`;
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let degrees = document.querySelector("#degrees-value");
  degrees.innerHTML = `${temperature}`;
  let description = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = `${description}`;
  windMetric = response.data.wind.speed;
  let wind = Math.round(windMetric);
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let humidityvalue = document.querySelector("#humidity");
  humidityvalue.innerHTML = `Humidity: ${humidity}%`;
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function showCurrent(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "c7dca84c0fd098022472de54bb75f43a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getCurrent);
}

function showCurrentCity() {
  navigator.geolocation.getCurrentPosition(showCurrent);
}

// let current = document.querySelector("#current-city");
// current.addEventListener("click", showCurrentCity);

//end of the "current city" part

function convertFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#degrees-value");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
  let windspeed = document.querySelector("#wind");
  let windImperial = Math.round(windMetric * 0.621371);
  windspeed.innerHTML = `Wind: ${windImperial} mph`;
}

function convertCelsius(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  let temperature = document.querySelector("#degrees-value");
  temperature.innerHTML = Math.round(celsiusTemperature);
  let windspeed = document.querySelector("#wind");
  let windKM = Math.round(windMetric);
  windspeed.innerHTML = `Wind: ${windKM} km/h`;
}

let celsiusTemperature = null;
let windMetric = null;
let fahrenheitLink = document.querySelector("#fahrenheit-degrees");
fahrenheitLink.addEventListener("click", convertFahrenheit);
fahrenheitLink.addEventListener("click", searchCityImperial);

let celsiusLink = document.querySelector("#celsius-degrees");
celsiusLink.addEventListener("click", convertCelsius);
celsiusLink.addEventListener("click", searchCity);
