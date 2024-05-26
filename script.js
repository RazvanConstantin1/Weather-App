"use strict";

const API_KEY = "81efd49b0be053aecd506b5fb8a8d754";
const BASE_URL_API = "https://api.openweathermap.org/data/2.5/weather";

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
      alert("Location Not Found");
      return;
    }

    displayWeatherData(data, isImperial);
  } catch (error) {
    console.error("Error on form submit", error);
  }

  searchForm.reset();
}

async function getWeatherByLocation(locationName, unitType) {
  const apiUrl = `${BASE_URL_API}?q=${locationName}&appid=${API_KEY}&units=${unitType}`;

  return await fetch(apiUrl);
}

async function getWeatherByPosition(lat, lon, unitType) {
  const apiUrl = `${BASE_URL_API}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unitType}`;

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
  const tempUnit = isImperial ? "°F" : "°C";
  const windSpeedUnit = isImperial ? "mph" : "m/s";
  const pressureUnit = isImperial ? "inHg" : "hPa";
}
