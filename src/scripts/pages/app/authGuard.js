const authGuard = () => {
  const user = sessionStorage.getItem('user');

  if (!user) {
    document.location.href = '/auth.html';
  }
};

authGuard();
