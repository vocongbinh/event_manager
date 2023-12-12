import { set } from 'date-fns';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [registerData, setRegister] = useState({});
    // const [userInfo, setUserInfo] = useState({});
    const logIn = (values) => {
        console.log(values);
        if (values.userToken) localStorage.setItem('userToken', values.userToken);
        localStorage.setItem('user', JSON.stringify(values));
        // setUserInfo(values);
    };
    const getUser = () => {
        const user = localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        }
        return undefined;
    };

    const logOut = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('user');
        window.location.reload();
    };
    const register = (data) => {
        setRegister(data);
    };
    return (
        <AuthContext.Provider value={{ registerData, logIn, logOut, register, getUser }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    return useContext(AuthContext);
};
