import { set } from 'date-fns';
import { createContext, useContext, useEffect, useState } from 'react';
import { getOrganizerProfile } from '../apiServices/organizerService';

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
    const setOrganizer = (values) => {
        console.log(values);
        localStorage.setItem('organizer', JSON.stringify(values));
    };
    const getOrganizer = () => {
        const organizer = localStorage.getItem('organizer');
        if (organizer) return JSON.parse(organizer);
        else return null;
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
        <AuthContext.Provider value={{ registerData, logIn, logOut, register, getUser, setOrganizer, getOrganizer }}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuthContext = () => {
    return useContext(AuthContext);
};
