export const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};

export const isValidLogin = (input) => {
  // Паттерн для проверки номера телефона
  const phonePattern = /^\+?\d{1,3}-?\d{3}-?\d{3}-?\d{2}-?\d{2}$/;

  // Паттерн для проверки адреса электронной почты
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (phonePattern.test(input)) return true;
  if (emailPattern.test(input)) return true;

  return false;
};

export const toggleBorder = (elem, toggle = true) => {
    if (toggle) {
        return elem.style.border = '1px solid red';
    }
    return elem.style.border = '1px solid #15171a';
};

export const toggleDisplay = (elem, toggle = true) => {
    if (toggle) {
      return (elem.style.display = 'flex');
    }
    return (elem.style.display = 'none');
};
