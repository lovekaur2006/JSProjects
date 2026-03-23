document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeather = document.getElementById('get-weather-btn');
    const WeatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const API_KEY = '7fc0cfdca4892ac0eb0d4383eaf48952'

    getWeather.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        //it may throw an error
        //server/database is always in another continent
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city) {
        //get the data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);

        console.log(typeof response);
        console.log(" RESPONSE", response);
        if (!response.ok) {
            throw new Error("Cty not found");
        }

        const data = await response.json();
        return data;


    }

    function displayWeatherData(data) {
        //display

        console.log(data);
        const { name, main, weather } = data;
        cityName.textContent = name;
        temperature.textContent = `Temperature : ${main.temp}`;
        description.textContent = `Weather : ${weather[0].description}`;


        //unloack the display
        WeatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');


    }
    function showError() {
        WeatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden')
    }

});