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

const formatTime = (hour, minute) => {
  const prepand = hour >= 12 ? 'PM' : 'AM';

  hour = hour >= 12 ? hour - 12 : hour;

  if (hour < 10) hour = '0' + hour;
  if (minute < 10) minute = '0' + minute;

  return `${hour}:${minute} ${prepand}`;
};

const getCurrentTime = () => {
  const now = new Date();

  let hour = now.getHours();
  let minute = now.getMinutes();

  return formatTime(hour, minute);
};

const getFormattedTime = (time) => {
  let hour = Number(time.slice(0, 2));
  let minute = Number(time.slice(3, 5));

  return formatTime(hour, minute);
};

const getWeatherIcon = (hourItem) => {
  const weatherIcon = hourItem.weather[0].main;
  return `src/icons/${weatherIcon.toLowerCase()}.png`;
};

const getTemperature = (temp) => {
  let neutralTemp = Math.round(temp) + '°';

  if (temp > 0) {
    neutralTemp = '+' + neutralTemp;
  }

  return neutralTemp;
};

export const displayCorrectWeather = (weatherData) => {
  const cityName = document.getElementById('cityName');
  const updateTime = document.getElementById('updateTime');
  const temp = document.querySelector('.celsius');
  const windSpeed = document.querySelector('.windSpeed');
  const humidity = document.querySelector('.humidity');
  const hourElements = document.querySelectorAll('.hour__element');
  const hourSeparator = document.querySelector('.hour__separator');

  const currentHourItem = weatherData.list[0];
  const { main, wind } = currentHourItem;

  const time = currentHourItem.dt_txt.slice(11, 16);
  const now = getCurrentTime(time);

  if (hourSeparator) hourSeparator.remove();

  cityName.textContent = weatherData.city.name;
  updateTime.textContent = 'Update time ' + now;

  temp.textContent = getTemperature(main.temp);

  windSpeed.textContent = wind.speed + ' km/h';
  humidity.textContent = main.humidity + '%';

  for (let i = 0; i < hourElements.length; i++) {
    const elem = hourElements[i];
    const hourItem = weatherData.list[i * 2];
    const formattedTime = getFormattedTime(hourItem.dt_txt.slice(11, 16));

    if (formattedTime === '9:00 PM') {
      elem.insertAdjacentHTML('afterend', separator);
    }

    elem.children[0].textContent = formattedTime;
    elem.children[1].src = getWeatherIcon(hourItem);
    elem.children[2].textContent = getTemperature(hourItem.main.temp);
  }
};
