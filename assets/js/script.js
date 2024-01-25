// I need an array to save the user searches and so I can later diplay them as buttons
let cities =[]; 

let cityBtn = $('.list-group')

//need this loop to create button after user input
for (let i=0; i<cities.length; i++){
    let city = cities[i];
    let btn = $('<button>');
    btn.text(city)

    cityBtn.append(btn)
}

//API for the weather forecast
let api = "cb5a40ddc61a1f20b1cd2e9a2d9b8222";
//need to insert the selection of the city
let queryURL = "api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=" + api ; 

// A variable for the user's input 

$('.search-button').on('click', function (event){
    //  Once function created I need to insert event.preventdefault at the top to stop the refresh
    event.preventDefault();

    let userInput = $('.form-input').val()
    console.log(userInput);

})


