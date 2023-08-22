import { separator } from './templates/hourSeparator.js';

export const redirectTo = (url) => {
  document.location.href = url;
};

export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const isValidLogin = (input) => {
  const phonePattern = /^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{2}-?\d{2}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phonePattern.test(input)) return true;
  if (emailPattern.test(input)) return true;

  return false;
};

export const toggleBorder = (elem, toggle = true) => {
  if (toggle) {
    return (elem.style.border = '1px solid #990000');
  }
  return (elem.style.border = '1px solid #15171a');
};

export const toggleDisplay = (elem, toggle = true) => {
  if (toggle) {
    return (elem.style.display = 'flex');
  }
  return (elem.style.display = 'none');
};

export const getCurrentDate = () => {
  const date = new Date();

  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date;
};

export const correctTimeFormat = () => {
  const now = new Date();
  let hour = now.getHours();
  const minute = now.getMinutes();
  const prepand = hour >= 12 ? 'PM' : 'AM';
  hour = hour >= 12 ? hour - 12 : hour;
  return `${hour}:${minute} ${prepand}`;
};

export const correctTime = (time) => {
  let hour = time.slice(0, 2);

  const minute = time.slice(3, 5);
  const prepand = hour >= 12 ? 'PM' : 'AM';
  hour = hour >= 12 ? hour - 12 : hour;
  return `${hour}:${minute} ${prepand}`;
};

export const getWeatherIcon = (weatherData, i) => {
  const weatherIcon = weatherData.list[i].weather[0].main;
  if (weatherIcon === 'Thunderstorms') return '/src/icons/thunderstorm.png';
  if (weatherIcon === 'Drizzle') return '/src/icons/drizzle.png';
  if (weatherIcon === 'Rain') return '/src/icons/rain.png';
  if (weatherIcon === 'Snow') return '/src/icons/snow.png';
  if (weatherIcon === 'Mist') return '/src/icons/mist.png';
  if (weatherIcon === 'Clear') return '/src/icons/clear.png';
  if (weatherIcon === 'Clouds') return '/src/icons/clouds.png';
};

export const displayCorrectWeather = (weatherData) => {
  const cityName = document.getElementById('cityName');
  const updateTime = document.getElementById('updateTime');
  const time = weatherData.list[0].dt_txt.slice(11, 16);
  const now = correctTimeFormat(time);
  const temp = document.querySelector('.celsius');
  const windSpeed = document.querySelector('.windSpeed');
  const humidity = document.querySelector('.humidity');
  const hourElements = document.querySelectorAll('.hour__element');
  const hourSeparator = document.querySelector('.hour__separator');

  let i = 0;

  if (hourSeparator) hourSeparator.remove();
  cityName.textContent = weatherData.city.name;
  updateTime.textContent = 'Update time ' + now;
  temp.textContent = '+' + Math.round(weatherData.list[0].main.temp) + '°';
  windSpeed.textContent = weatherData.list[0].wind.speed + ' km/h';
  humidity.textContent = weatherData.list[0].main.humidity + '%';

  hourElements.forEach((elem) => {
    if (correctTime(weatherData.list[i].dt_txt.slice(11, 18)) === '9:00 PM') {
      elem.insertAdjacentHTML('afterend', separator);
    }

    elem.children[0].textContent = correctTime(weatherData.list[i].dt_txt.slice(11, 18));
    elem.children[1].src = getWeatherIcon(weatherData, i);
    elem.children[2].textContent = '+' + Math.round(weatherData.list[i].main.temp) + '°';
    i += 2;
  });
};
