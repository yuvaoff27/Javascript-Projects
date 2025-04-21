const apiKey = "fdb198348c918bc192142bd2eff56da4";
const geoApiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
const oneCallApiUrl = "https://api.openweathermap.org/data/2.5/onecall";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function getCoordinates(city) {
    const geoRes = await fetch(`${geoApiUrl}${city}&limit=1&appid=${apiKey}`);
    const geoData = await geoRes.json();

    if (!geoData || geoData.length === 0) {
        alert("City not found!");
        return null;
    }

    return {
        lat: geoData[0].lat,
        lon: geoData[0].lon,
        name: geoData[0].name
    };
}

async function checkWeather(city) {
    const location = await getCoordinates(city);
    if (!location) return;

    const apiUrl = `${oneCallApiUrl}?lat=${location.lat}&lon=${location.lon}&units=metric&exclude=hourly,minutely,alerts&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    document.querySelector(".city").innerHTML = location.name;
    document.querySelector(".temp").innerHTML = Math.round(data.current.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
    document.querySelector(".wind").innerHTML = data.current.wind_speed + " km/h";

    const weatherMain = data.current.weather[0].main;
    if (weatherMain == "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (weatherMain == "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (weatherMain == "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (weatherMain == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherMain == "Mist") {
        weatherIcon.src = "images/mist.png";
    } else {
        weatherIcon.src = "images/clear.png";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
