let api = "cb5a40ddc61a1f20b1cd2e9a2d9b8222";


let userInput = document.querySelector('.form-input').value;

let cities = [];
let cityBtn = document.querySelector('.list-group');

for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    let btn = document.createElement('button');
    btn.textContent = city;

    cityBtn.appendChild(btn);
}

document.querySelector('.search-button').addEventListener('click', function (event) {
    event.preventDefault();

    let userInput = document.querySelector('.form-input').value;

    if (!userInput.trim()) {
        console.error('Please enter a valid city name');
        return;
    }

    let geocoding = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&appid=${api}`;

    if (!cities.includes(userInput)) {
        cities.push(userInput);
    }

    cityBtn.innerHTML = '';

    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let btn = document.createElement('button');
        btn.textContent = city;
        cityBtn.appendChild(btn);
    }

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

            let queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api}`;
        
            fetch(queryURL)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    let todaysWeather = data.list[0].main.temp;
                    let todaysWind = data.list[0].wind.speed;
                    console.log(todaysWeather);
                    console.log(todaysWind);
                })


        });


    
    // let todaySectionEl = document.querySelector("#today");
    // todaySectionEl.textContent


}

);
