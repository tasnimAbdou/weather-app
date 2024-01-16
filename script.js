
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAOpWU-l45feTQcHAGN6e3FXPVmjTV_hJc",
    authDomain: "weather-app-26770.firebaseapp.com",
    databaseURL: "https://weather-app-26770-default-rtdb.firebaseio.com",
    projectId: "weather-app-26770",
    storageBucket: "weather-app-26770.appspot.com",
    messagingSenderId: "658838805002",
    appId: "1:658838805002:web:a42fc6e166d8f5147f5df3",
    measurementId: "G-WTR2LM6QZS"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
const durationElement=document.getElementById("duration"); 
const skyElement=document.getElementById("sky"); 
const twinklingElement=document.getElementById("twinkling"); 
const cloudsElement=document.getElementById("clouds"); 
const rainElement=document.getElementById("rain"); 

const notificationElement=document.querySelector(".notification");
const iconIlement=document.querySelector(".weathIcon");
const tempElement=document.querySelector(".tempValue p");
const maxtempElement=document.querySelector(".maxtempValue p");
const mintempElement=document.querySelector(".mintempValue p");
const feelslikeElement=document.querySelector(".feelslike p");

const descriptionElement=document.querySelector(".tempDescription p");
const locationElement=document.querySelector(".location p");
const pressureElement=document.querySelector(".pressure p");
const humidityElement=document.querySelector(".humidity p");

const key='56229803131c161d0e66ab9525a7dc47';
const weather={};
weather.temperature={unit:"celsius"};

if("geolocation" in navigator){
navigator.geolocation.getCurrentPosition(setPosition,showError);


}
else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser Doesn't Support Geolocation</p>";
}


function setPosition(position){
    let long = position.coords.longitude;
    let lat = position.coords.latitude;
    getWeather(lat,long);

    console.log(lat);

    
}
function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p> ${error.message}<p>`;

}
function getWeather(lat,long){
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${key}`;
   console.log(api);
    fetch(api).then(function(response){
    let data=response.json();
    return data;
    
    }).then(function(data){
    weather.temperature.value=Math.floor(data.main.temp - 273);
    weather.feelslike=Math.floor(data.main.feels_like - 273);
    weather.maxTemp=Math.floor(data.main.temp_max - 273);
    weather.minTemp=Math.floor(data.main.temp_min - 273);
    weather.pressure=data.main.pressure;
    weather.humidity=data.main.humidity;
    weather.description=data.weather[0].description;
    weather.iconId=data.weather[0].icon;
    weather.city=data.name;
    weather.country=data.sys.country;
    
    
    }).then(function(){displayWeather();
    });
    

}
function displayWeather(){

    iconIlement.innerHTML=`<img src="icons/${weather.iconId}.png">`;
    tempElement.innerHTML=`${weather.temperature.value}<span>°C</span>`;
    descriptionElement.innerHTML=weather.description;
    locationElement.innerHTML=weather.city+weather.country;
    pressureElement.innerHTML=`<span>Pressure : </span>${weather.pressure}<span> hPa.</span>`;
    feelslikeElement.innerHTML=`<span>Feels-like : </span>${weather.feelslike}<span> °C.</span>`;
    humidityElement.innerHTML=`<span>Humidity : </span>${weather.humidity}<span> %.</span>`;
    maxtempElement.innerHTML=`${weather.maxTemp}<span>°C</span>`;
    mintempElement.innerHTML=`${weather.minTemp}<span>°C</span>`;
    dayOrNight();
}
function dayOrNight(){
if(weather.iconId){
    if(weather.iconId[2]=="d"){  
          durationElement.className="day";
          skyElement.className="skyDay";
          if(weather.description=="few clouds"||weather.description=="scattered clouds"||weather.description=="rain"||weather.description=="broken clouds")
    {
          cloudsElement.className="cloudsDay";}
          if(weather.description=="shower rain"||weather.description=="rain")

    {   rainElement.className="raind";}

}else{    
    durationElement.className="night";
    skyElement.className="skyNight";
    twinklingElement.className="twinkling";
    if(weather.description=="few clouds"||weather.description=="scattered clouds"||weather.description=="rain"||weather.description=="broken clouds")
    {cloudsElement.className="cloudsNight";}
    if(weather.description=="shower rain"||weather.description=="rain")

    {   rainElement.className="rainn";}

}
}

}







