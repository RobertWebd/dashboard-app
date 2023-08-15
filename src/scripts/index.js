import { setUsers, saveUser } from './users.js';
import { login } from './api.js';
import { Errors } from './constants.js';
import { isValidLogin, toggleBorder, toggleDisplay } from './utils.js';

setUsers();

const loginButton = document.getElementById('auth__button');
const userPassword = document.getElementById('auth__password');
const userLogin = document.getElementById('auth__login');

const handleLogin = async () => {
  const lds_ring = document.querySelector('.lds-ring');
  const auth__error = document.getElementById('auth__error');
  const enter__text = document.querySelector('.enter__text');

  const userLoginValue = userLogin.value;
  const userPasswordValue = userPassword.value;
  const isLoginEmpty = userLoginValue === '';
  const isPassEmpty = userPasswordValue === '';

  toggleBorder(userLogin, false);
  toggleBorder(userPassword, false);

  toggleDisplay(auth__error, false);
  toggleDisplay(lds_ring, false);

  if (isLoginEmpty || isPassEmpty) {
    auth__error.textContent = Errors.InvalidData;
    toggleDisplay(auth__error);

    if (isLoginEmpty) return toggleBorder(userLogin);
    if (isPassEmpty) return toggleBorder(userPassword);
  }

  if (!isValidLogin(userLoginValue)) {
    auth__error.textContent = Errors.InvalidLogin;

    toggleBorder(userLogin);
    toggleDisplay(auth__error);

    return;
  }

  toggleDisplay(enter__text, false);
  toggleDisplay(lds_ring);

  const user = await login({ login: userLoginValue, password: userPasswordValue });

  if (user) {
    saveUser(user);
    document.location.href = '/public/app.html';
  } else {
    toggleDisplay(enter__text);
    toggleDisplay(lds_ring, false);
    toggleDisplay(auth__error);

    auth__error.textContent = Errors.InvalidLoginOrPassword;
  }
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
