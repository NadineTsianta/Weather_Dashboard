let api = "cb5a40ddc61a1f20b1cd2e9a2d9b8222";
let cities = JSON.parse(localStorage.getItem('cities')) || [];

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

    showLoadingIndicator();

    weatherData(userInput);

    function showLoadingIndicator() {
        // Display a loading message while waiting for the data
        let todaySectionEl = document.querySelector("#today");
        todaySectionEl.innerHTML = '<p>Loading...</p>';
    }

    function updateCityButtons() {
        // Clear existing content before adding new buttons
        let cityBtn = document.querySelector('.list-group');
        cityBtn.innerHTML = '';

        // Add buttons for each city
        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];
            let btn = document.createElement('button');
            btn.className = "cityBtn btn btn-outline-secondary"
            btn.textContent = city;
            cityBtn.appendChild(btn);

            btn.addEventListener('click', function () {
                // Display loading when clicking a city button
                showLoadingIndicator();
                weatherData(city);
            });
        }
    }

    function weatherData(city) {
        // Fetch weather data for the selected city
        fetchWeatherData(city)
            .then(function (data) {
                // Update the card with the fetched data
                updateCard(data);
            })
            .catch(function (error) {
                console.error('Error fetching weather data:', error);
            });
    }

    function fetchWeatherData(city) {
        // Fetch weather data from the OpenWeatherMap API
        let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api}&units=metric`;
        return fetch(url)
            .then(function (response) {
                return response.json();
            });
    }

    function updateCard(data) {
        // Update the card with the weather data
        let cityName = data.city.name;
        let todaysWeather = data.list[0].main.temp;
        let todaysWind = data.list[0].wind.speed;
        let todaysHumidity = data.list[0].main.humidity;

        let now = dayjs();

        // Get the container for today's weather
        let todaySectionEl = document.querySelector("#today");
        todaySectionEl.innerHTML = '';

        // Create a new card
        let cardElement = document.createElement("div");
        cardElement.className = "card mb-3 text-white bg-dark bg-gradient bg-opacity-75";
        cardElement.style = "width: 100%; height: 300px";

        // Create card body
        let cardBodyElement = document.createElement("div");
        cardBodyElement.className = "card-body";

        // Add content to the card body
        cardBodyElement.innerHTML = `<h2 class="card-text">${cityName}</h2>
            <h4 class="card-text"> ${now.format('dddd MM-DD-YY  HH:mm')}</h4>
            <img src="./assets/images/temperature-half-solid.svg" width="35px" alt="Temperature Icon">
            <p class="card-text">Temperature: ${todaysWeather.toFixed(2)} °C</p>
            <p class="card-text">Humidity: ${todaysHumidity}%</p>
            <p class="card-text">Wind Speed: ${todaysWind.toFixed(2)} km/ph</p>`;

        // Append the card body to the card
        cardElement.appendChild(cardBodyElement);

        // Append the card to the container for today's weather
        todaySectionEl.appendChild(cardElement);
    }
});
