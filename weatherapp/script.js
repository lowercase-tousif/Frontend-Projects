document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('city-input');
    const btn = document.getElementById('get-weather');
    const weatherContainer = document.getElementById("weather-container");
    const cityName = document.querySelector('.city-name');
    const cityWeather = document.querySelector('.city-weather');
    const cityDesc = document.querySelector('.city-desc');
    const errorMessage = document.getElementById("error-message");

    const API_KEY = 'b97e32cd30583caaff30a7b2f718d9ae';
    const base_url = 'https://api.openweathermap.org/data/2.5/weather';

    const fetchWeather = async (city) => {
        try {
            const response = await fetch(`${base_url}?q=${city}&appid=${API_KEY}&units=metric`);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            displayWeather(data);
            errorMessage.classList.add('hidden');
        } catch (error) {
            weatherContainer.classList.add('hidden');
            errorMessage.classList.remove('hidden');
        }
    };

    const displayWeather = (data) => {
        const { name, weather, main } = data;
        cityName.textContent = `City: ${name}`;
        cityWeather.textContent = `Temperature: ${main.temp}°C`;
        cityDesc.textContent = `Condition: ${weather[0].description}`;
        weatherContainer.classList.remove('hidden');
    };

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const city = inputField.value.trim();
        if (city === "") {
            errorMessage.textContent = 'Please enter a city name';
            errorMessage.classList.remove('hidden');
            return;
        }
        fetchWeather(city);
    });
});
