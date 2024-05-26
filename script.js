"use strict";

const API_KEY = "81efd49b0be053aecd506b5fb8a8d754";
const BASE_API_URL = "https://api.openweathermap.org/data/2.5/weather";

const content = {
  mainGrid: document.querySelector(".grid-item:first-child"),
  locationName: document.querySelector(".location"),
  temp: document.querySelector(".temp"),
  unit: document.querySelector(".unit"),
  desc: document.querySelector(".desc"),
  max: document.querySelector(".max"),
  min: document.querySelector(".min"),
  feelsLike: document.querySelector(".feels-like"),
  humidity: document.querySelector(".humidity"),
  windSpeed: document.querySelector(".wind-speed"),
  pressure: document.querySelector(".pressure"),
  weatherImage: document.querySelector(".weather-image"),
};

const searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", onSearchFormSubmit);

async function onSearchFormSubmit(e) {
  e.preventDefault();

  const locationName = searchForm.search.value.trim();
  if (!locationName) {
    alert("Please enter a city, state or country name.");
    return;
  }

  const isImperial = document.getElementById("unitType").checked === false;

  const unitType = isImperial ? "imperial" : "metric";

  try {
    const data = await getWeatherByLocation(locationName, unitType);

    if (data.cod === "404") {
      alert("Location not found.");
      return;
    }

    displayWeatherData(data, isImperial);
  } catch (error) {
    console.error("Error on form submit.", error);
  }

  searchForm.reset();
}

async function getWeatherByLocation(locationName, unitType) {
  const apiUrl = `${BASE_API_URL}?q=${locationName}&appid=${API_KEY}&units=${unitType}`;

  return await fetchData(apiUrl);
}

async function getWeatherByPosition(lat, lon, unitType) {
  const apiUrl = `${BASE_API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitType}`;

  return await fetchData(apiUrl);
}

async function fetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data.", error);
    throw error;
  }
}

function displayWeatherData(data, isImperial) {
  const { weather, main, wind, sys, name } = data;
  console.log(data);

  // set units
  const tempUnit = isImperial ? "°F" : "°C";
  const windSpeedUnit = isImperial ? "mph" : "m/s";
  const pressureUnit = isImperial ? "inHg" : "hPa";

  // set data
  // content.locationName.textContent = name;
  // content.temp.textContent = main.temp;
}
