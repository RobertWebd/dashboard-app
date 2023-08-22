import { getUsers } from './users.js';
import { delay } from './utils.js';

export const login = async ({ login, password }) => {
  await delay(1000);

  const users = getUsers();
  const targetUser = users.find((user) => {
    const phoneNumber = user.phoneNumber;
    const email = user.email;
    const userPassword = user.password;
    const difNumVar = login.slice(-10) === phoneNumber.slice(-10) && (login.slice(0, 1) === '8' || login.slice(0, 1) === '7' || login.slice(0, 2) === '+7');
    return (difNumVar || phoneNumber === login || email === login) && userPassword === password;
  });

  return targetUser ?? null;
};

export const getWeatherByCity = async (cityName) => {
  return await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cfcc1c1455c0b1b5fea66d932790aacd`).then((data) => data.json());
};

export const getWeatherByCoords = async (latitude, longitude) => {
  return await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=cfcc1c1455c0b1b5fea66d932790aacd&units=metric&lang=en`).then((data) => data.json());
};
