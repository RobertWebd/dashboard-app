import { removeUser, getAuthUser } from '../../users.js';
import { Routes } from '../../constants.js';
import { redirectTo, toggleDisplay } from '../../utils.js';

const userName = document.querySelector('.user__name');
const userEmail = document.querySelector('.user__email');
const logoutBtn = document.querySelector('.profile__logout');
const profileMenu = document.querySelector('.profile__menu');
const navbarProfile = document.querySelector('.navbar__profile');

let isOpen = false;

const setUserData = () => {
  const user = getAuthUser();

  userName.textContent = user.name;
  userEmail.textContent = user.email;
};

setUserData();

logoutBtn.addEventListener('click', () => {
  removeUser();
  redirectTo(Routes.Auth);
});

navbarProfile.addEventListener('click', (e) => {
  const eventSection = e.target.closest('.section');
  const targetSection = navbarProfile.querySelector('.section');

  if (eventSection === targetSection) {
    e.stopPropagation();
    toggleDisplay(profileMenu, !isOpen);
    isOpen = !isOpen;
  }
});

document.addEventListener('click', (e) => {
  if (isOpen && e.target !== profileMenu) {
    toggleDisplay(profileMenu, false);
    isOpen = false;
  }
});
