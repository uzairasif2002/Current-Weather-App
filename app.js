//Select Elements
const iconElement = document.querySelector(".weather-icon")
const tempElement = document.querySelector(".temp-value p")
const descElement = document.querySelector(".weather-description p")
const locationElement = document.querySelector(".location p")
const notificationElement =document.querySelector(".notification")

const weather = {};
weather.temprature = {
    unit : "celcius"
}

const KELVIN = 273;

const key = '82005d27a116c2880c8f0fcb866998a0';

//Check if the browser supports GeoLocation
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition ,showError)
}
else{
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p> The Browser does not Support GeoLocation </p>';
}

//Get user Position
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude ,longitude);
}

function showError(error){
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message}`;
}

//Get data from Api 

function getWeather(latitude ,longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
    fetch(api)
    .then(function (response){
        let data = response.json()
        return data;
    })
    .then(function(data){
        weather.temprature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    })
}
//Display weather to Screen
function displayWeather(){
    iconElement.innerHTML = `<img src="assets/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temprature.value} &deg <span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `<img src="assets/geo-alt-fill.svg"> ${weather.city} , ${weather.country}`;
}









/*
// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

 //WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
 tempElement.addEventListener("click", function(){
    if(weather.temprature.value === undefined) return;
    
    if(weather.temprature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temprature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temprature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temprature.value}°<span>C</span>`;
        weather.temprature.unit = "celsius"
    }
});
*/