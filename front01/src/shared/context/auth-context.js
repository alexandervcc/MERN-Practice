import { createContext } from 'react';

//Context
export const AuthContext = createContext({
    isLoggedIn: false,
    login: () => { },
    logout: () => { }
});
