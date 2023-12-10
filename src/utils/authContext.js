import { set } from 'date-fns';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [registerData, setRegister] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const logIn = (values) => {
        console.log(values);
        if (values.userToken) localStorage.setItem('userToken', values.userToken);
        localStorage.setItem('user', JSON.stringify(userInfo));
        setUserInfo(values);
    };

    const logOut = () => {
        setUserInfo({});
        localStorage.removeItem('user');
    };
    const register = (data) => {
        setRegister(data);
    };
    return (
        <AuthContext.Provider value={{ userInfo, registerData, logIn, logOut, register, setUserInfo }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    return useContext(AuthContext);
};
