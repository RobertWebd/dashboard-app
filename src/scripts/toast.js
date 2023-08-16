import {getToastComponent} from './templates/toastComponent.js';

export const showToast = (error) => {
  const toastId = Math.random();
  const toastPageLoc = document.querySelector('.toast__pageLocation');
  const toastComponent = getToastComponent(error, toastId);

  toastPageLoc.insertAdjacentHTML('beforeend', toastComponent);

  const timer = setTimeout(() => {
    const currentToast = document.getElementById(`toast-${toastId}`);

    if (currentToast) {
      toastPageLoc.removeChild(currentToast);
    }
  }, 5000);

  const lastCreatedToast = toastPageLoc.lastChild;
  const closeButton = lastCreatedToast.querySelector('.content__closeButton');
  
  closeButton.addEventListener('click', () => {
    const currentToast = document.getElementById(`toast-${toastId}`);
    toastPageLoc.removeChild(currentToast);
    clearTimeout(timer);
  })
};
