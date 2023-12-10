import { set } from 'date-fns';
import { createContext, useContext, useState } from 'react';
const NewEventFormContext = createContext({});

export const NewEventFormProvider = ({ children }) => {
    const [eventTypes, setEventTypes] = useState([]);
    const [eventInfor, setEventInfor] = useState({});
    const [showtimes, setShowTimes] = useState([]);
    const [tickets, setTickets] = useState([]);
    return (
        <NewEventFormContext.Provider
            value={{ eventTypes, setEventTypes, eventInfor, setEventInfor, showtimes, setShowTimes }}
        >
            {children}
        </NewEventFormContext.Provider>
    );
};
export const useNewEventFormContext = () => {
    return useContext(NewEventFormContext);
};
