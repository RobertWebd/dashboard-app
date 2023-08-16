import {getToastComponent} from './templates/toastComponent.js';

export const showToast = (error) => {
  const toastPageLoc = document.querySelector('.toast__pageLocation');
  const toastComponent = getToastComponent(error);

  toastPageLoc.insertAdjacentHTML('beforeend', toastComponent);

  const timer = setTimeout(() => {
    const firstToast = toastPageLoc.firstChild;

    if (firstToast) {
      const parent = firstToast.parentElement;
      parent.removeChild(firstToast);
    }
  }, 5000);

  const lastCreatedToast = toastPageLoc.lastChild;
  const closeButton = lastCreatedToast.querySelector('.content__closeButton');
  
  closeButton.addEventListener('click', (e) => {
    const elem = e.target.closest('.toast__wrapper');
    const parent = elem.parentElement;
    parent.removeChild(elem);
    clearTimeout(timer);
  })
};
