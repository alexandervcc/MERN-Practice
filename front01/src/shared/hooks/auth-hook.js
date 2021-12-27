import { useEffect, useState, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
    const [tokenExpirationpDate, setTokenExpirationDate] = useState();
    const [userId, setUserId] = useState(false);
    const [token, setToken] = useState(false);

    const login = useCallback((uid, token, expDate) => {
        setToken(token);
        setUserId(uid);
        const tokenExpDate = expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
        setTokenExpirationDate(tokenExpDate);
        localStorage.setItem("userData",
            JSON.stringify({
                userId: uid,
                token: token,
                expiration: tokenExpDate.toISOString()
            }));
    }, []);

    const logout = useCallback(() => {
        setToken(false);
        setTokenExpirationDate(null);
        setUserId(null);
        localStorage.removeItem("userData")
    }, []);

    useEffect(() => {
        if (token && tokenExpirationpDate) {
            const remainingTime = tokenExpirationpDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(logout, remainingTime);
        } else {
            clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationpDate]);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem("userData"));
        if (storedData &&
            storedData.token &&
            new Date(storedData.expiration) > new Date()
        ) {
            login(storedData.userId, storedData.token, new Date(storedData.expiration));
        }
    }, [login]);

    return { token, login, logout, userId };
};