import { displayCorrectWeather, toggleDisplay } from '../../utils.js';
import { getWeatherByCoords, getWeatherByCity } from '../../api.js';

const contentWeather = document.querySelector('.content__weather');
const loader = document.querySelector('.loader');

toggleDisplay(loader);

if ('geolocation' in navigator) {
  navigator.geolocation.getCurrentPosition(async (data) => {
    const { latitude, longitude } = data.coords;
    const weatherData = await getWeatherByCoords(latitude, longitude);

    displayCorrectWeather(weatherData);
    toggleDisplay(contentWeather);
    toggleDisplay(loader, false);
  });
} else {
  console.log('не могу получить данные о погоде');
}

const searchCityBtn = document.querySelector('.searchIcon');
const locationInput = document.querySelector('.locationInput');

const handleLoadWeather = async () => {
  toggleDisplay(contentWeather, false);
  toggleDisplay(loader);

  const city = locationInput.value;
  const dataWeather = await getWeatherByCity(city);
  const { lat, lon } = dataWeather.coord;
  const weatherData = await getWeatherByCoords(lat, lon);

  displayCorrectWeather(weatherData);
  toggleDisplay(contentWeather);
  toggleDisplay(loader, false);
};

searchCityBtn.addEventListener('click', handleLoadWeather);
locationInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLoadWeather();
});
