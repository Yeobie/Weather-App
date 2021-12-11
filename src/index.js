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
  "Saturday"
];
let day = days[now.getDay()];

if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}

date.innerHTML = `${day} ${hours}:${minutes}`;

function getWeather(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let degrees = document.querySelector("#degrees-value");
  degrees.innerHTML = `${temperature}`;
  let description = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = `${description}`;
  let wind = Math.round(response.data.wind.speed);
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let humidityvalue = document.querySelector("#humidity");
  humidityvalue.innerHTML = `Humidity: ${humidity}%`;
  let weatherIcon = document.querySelector("#icon")
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
weatherIcon.setAttribute("alt", response.data.weather[0].description )}

function searchCity(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-city-input");
  let city = document.querySelector("#city-name");
  city.innerHTML = `${searchedCity.value}`;
  let apiKey = "c7dca84c0fd098022472de54bb75f43a";

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedCity.value}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(getWeather);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchCity);
let search = document.querySelector("#search-button")
search.addEventListener("click", searchCity)

function getCurrent(response) {
  let city = response.data.name;
  let h1 = document.querySelector("#city-name");
  h1.innerHTML = `${city}`;
  let temperature = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#degrees-value");
  degrees.innerHTML = `${temperature}`;
  let description = response.data.weather[0].description;
  let weather = document.querySelector("#weather-description");
  weather.innerHTML = `${description}`;
  let wind = Math.round(response.data.wind.speed);
  let windspeed = document.querySelector("#wind");
  windspeed.innerHTML = `Wind: ${wind} km/h`;
  let humidity = response.data.main.humidity;
  let humidityvalue = document.querySelector("#humidity");
  humidityvalue.innerHTML = `Humidity: ${humidity}%`;
    let weatherIcon = document.querySelector("#icon")
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
weatherIcon.setAttribute("alt", response.data.weather[0].description )
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

let current = document.querySelector("#current-city");
current.addEventListener("click", showCurrentCity);

function convertFahrenheit(event){
  event.preventDefault()
  let temperature = document.querySelector("#degrees-value")
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature)

}

let celsiusTemperature = null;
let fahrenheitLink = document.querySelector("#fahrenheit-degrees");
fahrenheitLink.addEventListener("click", convertFahrenheit)