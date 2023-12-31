import { setUsers, saveUser } from '../../users.js';
import { login } from '../../api.js';
import { Errors, Routes } from '../../constants.js';
import { isValidLogin, toggleBorder, toggleDisplay, redirectTo } from '../../utils.js';
import { showToast } from '../../toast.js';

setUsers();

const loginButton = document.getElementById('auth__button');
const userPassword = document.getElementById('auth__password');
const userLogin = document.getElementById('auth__login');

const loader = document.querySelector('.loader');
const enter__text = document.querySelector('.enter__text');

const handleLogin = async () => {
  const userLoginValue = userLogin.value;
  const userPasswordValue = userPassword.value;
  const isLoginEmpty = userLoginValue === '';
  const isPassEmpty = userPasswordValue === '';

  toggleBorder(userLogin, false);
  toggleBorder(userPassword, false);

  toggleDisplay(loader, false);

  if (isLoginEmpty || isPassEmpty) {
    showToast(Errors.InvalidData);

    if (isLoginEmpty) toggleBorder(userLogin);
    if (isPassEmpty) toggleBorder(userPassword);

    return;
  }

  if (!isValidLogin(userLoginValue)) {
    toggleBorder(userLogin);
    return showToast(Errors.InvalidLogin);
  }

  toggleDisplay(enter__text, false);
  toggleDisplay(loader);

  loginButton.setAttribute('disabled', 'true');

  const user = await login({ login: userLoginValue, password: userPasswordValue });

  if (user) {
    saveUser(user);
    redirectTo(Routes.App);
  } else {
    showToast(Errors.InvalidLoginOrPassword);
  }

  toggleDisplay(enter__text);
  toggleDisplay(loader, false);
  loginButton.removeAttribute('disabled');
};

loginButton.addEventListener('click', handleLogin);
userPassword.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleLogin();
});

// Просмотр пароля пароля
const viewIcon = document.querySelector('.password__wrapper_viewIcon');
const viewIcon__open = document.querySelector('.viewIcon__open');
const viewIcon__close = document.querySelector('.viewIcon__close');

viewIcon.addEventListener('click', () => {
  if (userPassword.getAttribute('type') === 'password') {
    userPassword.setAttribute('type', 'text');
    toggleDisplay(viewIcon__open, false);
    toggleDisplay(viewIcon__close);
  } else {
    userPassword.setAttribute('type', 'password');
    toggleDisplay(viewIcon__close, false);
    toggleDisplay(viewIcon__open);
  }
});
