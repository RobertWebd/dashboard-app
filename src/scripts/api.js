import { getUsers } from "./users.js";
import { delay } from "./utils.js";

export const login = async ({login, password}) => {
    await delay(1000);
    
    const users = getUsers();
    const targetUser = users.find(user => {
        const phoneNumber = user.phoneNumber;
        const email = user.email;
        const userPassword = user.password;
        const difNumVar = login.slice(-10) === phoneNumber.slice(-10) && (login.slice(0, 1) === '8' || login.slice(0, 1) === '7' || login.slice(0, 2) === '+7');
        return (difNumVar || phoneNumber === login || email === login) && userPassword === password;
    });

    return targetUser ?? null;
};
