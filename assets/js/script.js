let api = "cb5a40ddc61a1f20b1cd2e9a2d9b8222";
let cities = JSON.parse(localStorage.getItem('cities')) || [];

// Move updateCityButtons outside the DOMContentLoaded event listener
function updateCityButtons() {
    let cityBtn = document.querySelector('.list-group');
    cityBtn.innerHTML = '';

    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let btn = document.createElement('button');
        btn.className = "cityBtn btn btn-outline-secondary";
        btn.textContent = city;
        cityBtn.appendChild(btn);

        btn.addEventListener('click', function () {
            weatherData(city);
        });
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Initial rendering of city buttons
    updateCityButtons();
});

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
        localStorage.setItem('cities', JSON.stringify(cities));
        updateCityButtons();
    }

    weatherData(userInput);
});

function weatherData(city) {
    let geocoding = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api}`;

    fetch(geocoding)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let lat = data[0].lat;
            let lon = data[0].lon;
            let cityName = data[0].name;

            let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${api}&units=metric`;

            fetch(queryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    let todaysWeather = data.list[0].main.temp;
                    let todaysWind = data.list[0].wind.speed;
                    let todaysHumidity = data.list[0].main.humidity;

                    let now = dayjs();

                    let todaySectionEl = document.querySelector("#today");
                    todaySectionEl.innerHTML = '';

                    let cardElement = document.createElement("div");
                    cardElement.className = "card mb-3 text-white bg-dark bg-gradient bg-opacity-75";
                    cardElement.style = "width: 100%; height: 300px";

                    let cardBodyElement = document.createElement("div");
                    cardBodyElement.className = "card-body";

                    cardBodyElement.innerHTML = `<h2 class="card-text">${cityName}</h2>
                        <h4 class="card-text"> ${now.format('dddd MM-DD-YY  HH:mm')}</h4>
                        <img src="./assets/images/temperature-half-solid.svg" width="35px" alt="Temperature Icon">
                        <p class="card-text">Temperature: ${todaysWeather.toFixed(2)} °C</p>
                        <p class="card-text">Humidity: ${todaysHumidity}%</p>
                        <p class="card-text">Wind Speed: ${todaysWind.toFixed(2)} km/ph</p>`;

                    cardElement.appendChild(cardBodyElement);
                    todaySectionEl.appendChild(cardElement);
                });
        });
}

document.querySelector('.list-group').addEventListener('click', function (event) {
    if (event.target.classList.contains('cityBtn')) {
        let city = event.target.textContent;
        weatherData(city);
    }
});
