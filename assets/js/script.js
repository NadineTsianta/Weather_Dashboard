let api = "cb5a40ddc61a1f20b1cd2e9a2d9b8222";
//API for the weather forecast
let queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + api;
let userInput = document.querySelector('.form-input').value;

//need to insert the selection of the city
let geocoding = `"https://api.openweathermap.org/geo/1.0/direct?q=${userInput},{state code},{country code}&limit={limit}&appid="`;


// A variable for the user's input 
// I need an array to save the user searches and so I can later diplay them as buttons
let cities = [];

let cityBtn = $('.list-group')

//need this loop to create button after user input
for (let i = 0; i < cities.length; i++) {
    let city = cities[i];
    let btn = $('<button>');
    btn.text(city)

    cityBtn.append(btn)
}


$('.search-button').on('click', function (event) {
    event.preventDefault();

    // Get user input
    let userInput = document.querySelector('.form-input').value;

    // Update geocoding URL with the latest user input
    let geocoding = `https://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit={limit}&appid=${api}`;

    // Add the user input to the cities array if it doesn't already exist
    if (!cities.includes(userInput)) {
        cities.push(userInput);
    }

    // Clear the existing buttons
    cityBtn.empty();

    // Create buttons for each city in the array
    for (let i = 0; i < cities.length; i++) {
        let city = cities[i];
        let btn = $('<button>');
        btn.text(city)
        cityBtn.append(btn)
    }

    // Now you can use the updated userInput to fetch the weather data
    fetch(geocoding)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // Handle the response data here
            console.log(data);
        });
});


