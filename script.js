var btn = document.querySelector("#btn-search");
var containerSearchHistory = document.querySelector("#search-history");
var containerCurrentWeather = document.querySelector("#inputCity");
var containerFiveDayForecast = document.querySelector("#forecastCity");
var dataStore = JSON.parse(localStorage.getItem('cities')) || [];
var openWeatherIcon;
    if (location.protocol === 'http:') {
        openWeatherIcon = 'http://openweathermap.org/img/wn/';
     } else {
        openWeatherIcon = 'https://openweathermap.org/img/wn/';
     }
var weatherCondition = [];

function start() {
    loadCity();
}

var loadCity = function(){
    blankElement(containerSearchHistory);

        if(dataStore){
            var ulElement = document.createElement("ul");
            ulElement.classList.add("list-unstyled");
            ulElement.classList.add("w-100");
            for(var i = 0; i < dataStore.length; i++){
                
                var liElement = document.createElement("li");
                liElement.innerHTML = "<button type='button' class='list-group-item list-group-item-action' attr='"+dataStore[i]+"'>" + dataStore[i] + "</button>";
                ulElement.appendChild(liElement);
                }

                containerSearchHistory.appendChild(ulElement); 
            }
};


$(document).on("click", ".list-group-item", function(event) {

    event.preventDefault();
    var city = $(this).attr("attr");
    callApiFetch(city);
});

var blankElement = function(element){
    element.innerHTML = "";
};

var converTemp = function(temp){
    return (Math.floor((parseFloat(temp) -32) * (5/9))).toString();
};

var convertWSpeed = function(speed){
    return (Math.floor(parseFloat(speed) * 1.609)).toString();
};

var weatherHTML = function (city) {
    blankElement(containerCurrentWeather);
    blankElement(containerFiveDayForecast); 
    var container1 = document.createElement("div");                         
    container1.classList.add("col-6");                                      
    var container2 = document.createElement("div");                   
    container2.classList.add("col-6");                                     
    var cityEl = document.createElement("h2");
    var imageCurrent = document.createElement("img");
    cityEl.textContent = city + " (" + weatherCondition[0].dateT +")";
    imageCurrent.setAttribute("src", weatherCondition[0].icon);                       
    imageCurrent.classList.add("bg-info");                          
    container1.appendChild(cityEl);
    container2.appendChild(imageCurrent);
    var container3  = document.createElement("div");                        
    container3.classList.add("col-12");                      
    container3.innerHTML =    "<p>Temperature: " + weatherCondition[0].temp + " °F " + 
                        "<p>Humidity: " + weatherCondition[0].humidity + "% </p>" +
                        "<p>Wind Speed: " + weatherCondition[0].speed + " MPH";
    containerCurrentWeather.appendChild(container1);
    containerCurrentWeather.appendChild(container2);
    containerCurrentWeather.appendChild(container3);
    var container6 = document.createElement("div");        
    container6.classList.add("row");                      
    var container7 = document.createElement("div");         
    container7.classList.add("col-12");                     
    container7.innerHTML = "<h2>5-Day Forecast</h2>";
    container6.appendChild(container7);
    containerFiveDayForecast.appendChild(container6);
    var container8 = document.createElement("div");         
    container8.classList.add("d-flex");                     

    for(var i=1; i<weatherCondition.length; i++){    
        var container4  = document.createElement("div");                       
        container4.classList.add("card");                                  
        container4.classList.add("text-black");                            
        container4.classList.add("mr-2");                    
        container4.classList.add("flex-fill")
        var container5  = document.createElement("div");
        container5.classList.add("card-body");
        var title = document.createElement("h6");
        title.classList.add("card-title");
        var imageForecast = document.createElement("img");
        title.textContent = weatherCondition[i].dateT;
        imageForecast.setAttribute("src", weatherCondition[i].icon);
        var pEL1 = document.createElement("p");
        var pEL2 = document.createElement("p");
        var pEL3 = document.createElement("p");
        pEL1.classList.add("small");
        pEL1.textContent =   "Temperature: " + weatherCondition[i].temp + " °F";
        pEL2.classList.add("small");
        pEL2.textContent =  "Humidity: " + weatherCondition[i].humidity + "%";
        pEL3.classList.add("small");
        pEL3.textContent =  "Wind Speed: " + weatherCondition[i].speed + " MPH";
        container5.appendChild(title);
        container5.appendChild(imageForecast);
        container5.appendChild(pEL1);
        container5.appendChild(pEL2);
        container5.appendChild(pEL3);
        container4.appendChild(container5);        
        container8.appendChild(container4);
    }
    containerFiveDayForecast.appendChild(container8);
};

var saveCity = function(city){
  var exists = dataStore && dataStore.includes(city);
  if(exists){
  } else {
      dataStore.push(city);
      localStorage.setItem("cities",JSON.stringify(dataStore));
      loadCity();
  }
}

var searchForDate9AM = function (str) {
    var hour = str.split(" ")[1].split(":")[0];
    var flag = false;
    
    if(hour === "09"){
        flag = true;
    }        
    
    return flag;
}

var formatDate = function(strDate){
  var newDate = strDate.split(" ")[0].split("-");
  return (newDate[1] + "/" + newDate[2] + "/" + newDate[0]);
};


var createDataObject = function(list, position){
    if(weatherCondition.length)
        weatherCondition = [];
    var obj = {
        dateT : formatDate(list[0].dt_txt),
        humidity : list[0].main.humidity,
        speed: list[0].wind.speed,
        temp: list[0].main.temp,
        icon : openWeatherIcon + list[0].weather[0].icon + ".png",
        lat : position.lat,
        lon: position.lon
    };
    weatherCondition.push(obj);
    for(var i=1; i<list.length; i++){
        if(searchForDate9AM(list[i].dt_txt)){
            obj = {
                dateT : formatDate(list[i].dt_txt),
                humidity : list[i].main.humidity,
                speed: list[i].wind.speed,
                temp: list[i].main.temp,
                icon : openWeatherIcon + list[i].weather[0].icon + ".png",
                lat : position.lat,
                lon: position.lon
            };
            weatherCondition.push(obj);
        }
    }

};

var displayAlertMessage = function(msg) {
    alert(msg);
};

var callApiFetch = function(city){
    var url;
    if (location.protocol === 'http:') {
        url = 'http://api.openweathermap.org/data/2.5/forecast?appid=b4148f60988f2ad1e2369a15677ad5b8&units=imperial&q='+city;
     } else {
        url = 'https://api.openweathermap.org/data/2.5/forecast?appid=b4148f60988f2ad1e2369a15677ad5b8&units=imperial&q='+city;
     }
    fetch(url)
    .then(function(weatherResponse) {
        return weatherResponse.json();
     })
    .then(function(weatherResponse) {
        if (weatherResponse.cod != "200") {
            displayAlertMessage("Unable to find "+ city +" in OpenWeathermap.org");
            return;
        } else {
            createDataObject(weatherResponse.list, weatherResponse.city.coord);
            saveCity(city);
            weatherHTML(city);
        }
    })
    .catch(function(error) {
        displayAlertMessage("Unable to connect to OpenWeathermap.org");
        return;
    });
};

var search = function(event){
    event.preventDefault();
    var inputElement = document.querySelector("#searchCity");
    var textInput = inputElement.value.trim();
    if(inputElement.value === ""){
        alert("Weather Dashbord\n   You must enter a City");
        return;
    }
    else{
   
        callApiFetch(textInput);

    }
};

start();
btn.addEventListener("click", search);