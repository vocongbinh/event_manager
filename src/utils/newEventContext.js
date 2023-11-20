import { set } from 'date-fns';
import { createContext, useContext, useState } from 'react';
const NewEventFormContext = createContext({});

export const NewEventFormProvider = ({ children }) => {
    const [newEvent, setNewEvent] = useState({});
    const updateNewEvent = (data) => {
        console.log(data);
        setNewEvent((prev) => ({
            ...prev,
            ...data,
        }));
    };
    return <NewEventFormContext.Provider value={{ newEvent, updateNewEvent }}>{children}</NewEventFormContext.Provider>;
};
export const useNewEventFormContext = () => {
    return useContext(NewEventFormContext);
};
