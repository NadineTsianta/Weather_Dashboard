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

    weatherData(userInput);

    function updateCityButtons() {
        let cityBtn = document.querySelector('.list-group');
        cityBtn.innerHTML = '';
    
        for (let i = 0; i < cities.length; i++) {
            let city = cities[i];
            let btn = document.createElement('button');
            btn.textContent = city;
            cityBtn.appendChild(btn);
    
            btn.addEventListener('click', function(){
                weatherData(city);
            });
        }
    }
    
    function weatherData(city){
        fetch(geocoding)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            console.log(data);

            let lat = data[0].lat;
            let lon = data[0].lon;

            console.log(lat);
            console.log(lon);

            let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${api}&units=metric`;



            fetch(queryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {


                    console.log(data);
                    let todaysWeather = data.list[0].main.temp; // Temperature in Kelvin
                    let todaysWind = data.list[0].wind.speed; // Wind speed in m/s
                    let todaysHumidity = data.list[0].main.humidity;
                    console.log(todaysWeather);
                    console.log(todaysWind);
                    console.log(todaysHumidity);

                    let now = dayjs();



                    let todaySectionEl = document.querySelector("#today");
                    let cardElement = document.createElement("div");
                    //card element
                    cardElement.className = "card mb-3 text-white bg-dark bg-gradient bg-opacity-75";
                    cardElement.style = "width: 100%; height: 300px"; 

                    //  card body
                    let cardBodyElement = document.createElement("div");
                    cardBodyElement.className = "card-body";

                    // Add the content to the card body
                    cardBodyElement.innerHTML = `  
                    <h2 class="card-text"> ${now.format('dddd MM-DD-YY  HH:mm')}</h2>
                    <img src="./assets/images/temperature-half-solid.svg" width="35px"alt="Temperature Icon">
                    <p class="card-text">Temperature: ${todaysWeather.toFixed(2)} °C</p>
                    <p class="card-text">Humidity: ${todaysHumidity}%</p>
                    <p class="card-text">Wind Speed: ${todaysWind.toFixed(2)} km/ph</p>
                    `;
                     
                    // Append the card body to the card
                    cardElement.appendChild(cardBodyElement);

                    // Append the card to the #today section
                    todaySectionEl.appendChild(cardElement);

                    // let forecastSectionEl = document.querySelector("#forecast");
                    // forecastSectionEl.innerHTML = ""; // Clear previous forecast

                    // // Forecast for next days
                    // for (let i = 0; i <= 4; i++) {
                    //     let daysForecast = data.list[i];
                    //     let forecastTemp = daysForecast.main.temp; // Temperature in Kelvin

                    //     // Convert temperature from Kelvin to Celsius
                    //     // let forecastTempCelsius = forecastTemp - 273.15;

                    //     forecastSectionEl.innerHTML += `
                    //         <p>${i} day: ${forecastTemp.toFixed(2)} °C</p>
                    //     `;
                    // }
                })

        })

    }

    

});

