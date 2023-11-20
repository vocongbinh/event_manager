import { set } from 'date-fns';
import { createContext, useContext, useState } from 'react';
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [userData, setUser] = useState({});
    const [registerData, setRegister] = useState({});
    const logIn = (values) => {
        setUser(values);
    };
    const logOut = () => {
        setUser({});
    };
    const register = (data) => {
        setRegister(data);
    };
    return (
        <AuthContext.Provider value={{ userData, registerData, logIn, logOut, register }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    return useContext(AuthContext);
};
