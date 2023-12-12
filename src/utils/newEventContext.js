import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateEvent } from '../lib/react-query/useQueryAndMutation';
const NewEventFormContext = createContext({});
const NewEventStepContext = createContext({});
export const NewEventStepProvider = ({ children }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);

    const path = {
        0: '',
        1: 'eventInfo',
        2: 'stage',
        3: 'tickets',
        4: 'showtimes',
    };
    const handleGoStep = (step) => {
        setStep(step);
        navigate(path[step]);
        console.log('current step' + step);
    };
    return (
        <NewEventStepContext.Provider value={{ step, setStep, handleGoStep }}>{children}</NewEventStepContext.Provider>
    );
};
export const NewEventFormProvider = ({ children }) => {
    const [eventTypes, setEventTypes] = useState([]);
    const [eventInfor, setEventInfor] = useState({});
    const [address, setAddress] = useState({});
    const [showtimes, setShowTimes] = useState([]);
    const [tickets, setTickets] = useState([]);
    const [chart, setChart] = useState('');
    const [isChartCreated, setIsChartCreated] = useState(false);
    const { mutateAsync: createNewEvent } = useCreateEvent();
    const createEvent = () => {
        createNewEvent({
            ...eventInfor,
            address,
            chartId: chart,
            tickets,
            showtimes,
            eventTypes,
        });
    };

    return (
        <NewEventFormContext.Provider
            value={{
                eventTypes,
                setEventTypes,
                eventInfor,
                setEventInfor,
                showtimes,
                setShowTimes,
                tickets,
                setTickets,
                chart,
                setChart,
                isChartCreated,
                setIsChartCreated,
                createEvent,
                address,
                setAddress,
            }}
        >
            {children}
        </NewEventFormContext.Provider>
    );
};
export const useNewEventFormContext = () => {
    return useContext(NewEventFormContext);
};
export const useNewEventStepContext = () => {
    return useContext(NewEventStepContext);
};
