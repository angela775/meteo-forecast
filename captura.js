function refreshW(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windspeedElement = document.querySelector("#windspeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="weather-app-icon"/>`;

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  temperatureElement.innerHTML = Math.round(temperature);
  windspeedElement.innerHTML = `${response.data.wind.speed}km/hr`;
  getforecast(response.data.city);
}
function searchCity(city) {
  let apiKey = "3t3af9bf15fb2a631460b188a266fbao";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiURL).then(refreshW);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDate()];

  return `${day} ${hours}:${minutes}`;
}
function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return days[date.getDay()];
}
function getforecast(city) {
  let apiKey = "3t3af9bf15fb2a631460b188a266fbao";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayforecast);
  console.log(apiURL);
}
function displayforecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
     <div class="wheather-forecast-day">
              <div class="wheat-fdate">${formatDay(day.time)}</div>
                <div class="wheat-ficon">
                <img src="${day.condition.icon_url}"/>
                </div>
                <div class="wheat-ftemps">
                   <div class="wheat-ftemp"><strong>${Math.round(
                     day.temperature.maximum
                   )}° </strong>
                   </div>
                   <div class="wheat-ftemp">${Math.round(
                     day.temperature.minimum
                   )}°</div>
                </div>       
      </div>
`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("paris");
