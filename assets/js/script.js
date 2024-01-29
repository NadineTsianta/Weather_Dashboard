let api = "cb5a40ddc61a1f20b1cd2e9a2d9b8222";
let cities = []; // user values inserted

document.querySelector('.search-button').addEventListener('click', function (event) {
    event.preventDefault();

    let userInput = document.querySelector('.form-input').value.trim();

    if (!userInput) {
        console.error('Please enter a valid city name');
        return;
    }

    let geocoding = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${api}`;

    if (!cities.includes(userInput)) {
        cities.push(userInput);
        updateCityButtons();
    }

    fetch(geocoding)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            let lat = data[0].lat;
            let lon = data[0].lon;

            console.log(lat);
            console.log(lon);

            let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`;

            fetch(queryURL)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    let todaysWeather = data.list[0].main.temp; // Temperature in Kelvin
                    let todaysWind = data.list[0].wind.speed; // Wind speed in m/s
                    let todaysHumidity = data.list[0].main.humidity;
                    console.log(todaysWeather);
                    console.log(todaysWind);
                    console.log(todaysHumidity);

                    // Conversion to Celsius
                    let todaysWeatherCelsius = todaysWeather - 273.15;

                    // Convert wind speed from m/s to mph
                    let todaysWindMPH = todaysWind * 2.237;

                    let todaySectionEl = document.querySelector("#today");
                    todaySectionEl.innerHTML = `
                        <p>Temperature: ${todaysWeatherCelsius.toFixed(2)} °C</p>
                        <p>Humidity: ${todaysHumidity}%</p>
                        <p>Wind Speed: ${todaysWindMPH.toFixed(2)} mph</p>
                    `;

                    let forecastSectionEl = document.querySelector("#forecast");
                    forecastSectionEl.innerHTML = ""; // Clear previous forecast

                    // Forecast for next days
                    for (let i = 1; i <= 4; i++) {
                        let daysForecast = data.list[i];
                        let forecastTemp = daysForecast.main.temp; // Temperature in Kelvin

                        // Convert temperature from Kelvin to Celsius
                        let forecastTempCelsius = forecastTemp - 273.15;

                        forecastSectionEl.innerHTML += `
                            <p>${i} day: ${forecastTempCelsius.toFixed(2)} °C</p>
                        `;
                    }
                })
                .catch(error => {
                    console.error('Forecast API error:', error);
                });
        })
        .catch(error => {
            console.error('Geocoding API error:', error);
        });
});

function updateCityButtons() {
    let cityBtn = document.querySelector('.list-group');
    cityBtn.innerHTML = '';

    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let btn = document.createElement('button');
        btn.textContent = city;
        cityBtn.appendChild(btn);
    }
}
