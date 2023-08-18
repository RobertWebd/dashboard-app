const mockUsers = [
  { name: 'Robert', phoneNumber: '89274372223', email: 'ra.20.z02@mail.ru', password: '44Robert21!' },
  { name: 'Ramil', phoneNumber: '89372908085', email: 'blackRay@mail.ru', password: 'Ramil2119kutak%' },
];

export const setUsers = (users) => {
    if (users) {
        return localStorage.setItem('users', JSON.stringify(users)); 
    };

    const cachedUsers = localStorage.getItem('users');
    if (!cachedUsers) localStorage.setItem('users', JSON.stringify(mockUsers));
};

export const getUsers = () => {
    const cachedUsers = localStorage.getItem('users');
    if (cachedUsers) return JSON.parse(cachedUsers);
    
    return mockUsers;
};

export const saveUser = (user) => {
    sessionStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = () => {
    sessionStorage.removeItem('user');
};

export const getAuthUser = () => {
    return JSON.parse(sessionStorage.getItem('user'));
};