// setting cities and units as variables
let current_city = "Kuala Lumpur";
let units = "metric";

// selectors
let city = document.querySelector(".weather_city")
let date_time = document.querySelector(".weather_date_time")
let weather_forecast = document.querySelector(".weather_forecast")
let weather_temperature = document.querySelector(".weather_temperature")
let weather_icon = document.querySelector(".weather_icon")
let weather_minmax = document.querySelector(".weather_minmax")
let weather_real_feel = document.querySelector(".weather_real_feel")
let weather_humidity = document.querySelector(".weather_humidity")
let weather_wind = document.querySelector(".weather_wind")
let weather_pressure = document.querySelector(".weather_pressure")

// for search function 
document.querySelector(".weather_search").addEventListener('submit', e => {
    let search = document.querySelector(".weather_searchform");
    e.preventDefault();
    current_city = search.value;
    get_weather();
    search.value = ""
})

// for units
document.querySelector(".weather_unit_celcius").addEventListener('click',()=>{
    if(units!== "metric"){
        units = "metric"
        get_weather()
    }
})
document.querySelector(".weather_unit_fahrenheit").addEventListener('click',()=>{
    if(units!== "imperial"){
        units = "imperial"
        get_weather()
    }
})

// convert timezone and time stamp to time and date
function convert_time_zone_stamp(timestamp,timezone){
    const convert_time_zone = timezone/3600;
    const date = new Date(timestamp * 1000)
    const options = {
        weekday: "long",
        day : "numeric",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        timezone: `Etc/GMT${convert_time_zone >= 0 ? "-":"+"}${Math.abs(convert_time_zone)}`,
        hour12 : true
    }
    return date.toLocaleString("en-US",options)
}


// convert country code to name
function convert_country_code(country){
    let region_names = new Intl.DisplayNames(["en"],{type:"region"})
    return region_names.of (country)
}


function get_weather() {
    const API_KEY = "72e523117adfc268a4783002cf650502"
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${current_city}&appid=${API_KEY}&units=${units}`).then(res => res.json()).then(data => {
        city.innerHTML = `${data.name},${convert_country_code(data.sys.country)}`
        date_time.innerHTML = convert_time_zone_stamp(data.dt,data.timezone);
        weather_forecast.innerHTML = `<p>${data.weather[0].main}`
        weather_temperature.innerHTML = `${data.main.temp.toFixed()}&#176`
        weather_icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`
        weather_minmax.innerHTML = `<p>Min:${data.main.temp_min.toFixed()}&#176</p><p>Max:${data.main.temp_max.toFixed()}&#176</p>` 
        weather_real_feel.innerHTML = `${data.main.feels_like.toFixed()}&#176`
        weather_humidity.innerHTML = `${data.main.humidity}%`
        weather_wind.innerHTML = `${data.wind.speed} ${units == "imperial"?"mph":"m/s"}`
        weather_pressure.innerHTML = `${data.main.pressure}hPa`
    })
}

document.body.addEventListener("load",get_weather())