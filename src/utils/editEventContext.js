import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateEvent, useEditEvent } from '../lib/react-query/useQueryAndMutation';
import eventService from '../apiServices/eventService';
import ticketService from '../apiServices/ticketService';
const EditEventFormContext = createContext({});
const EditEventStepContext = createContext({});
export const EditEventStepProvider = ({ children }) => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const path = {
        0: '',
        1: 'tickets',
        2: 'showtimes',
    };
    const handleGoStep = (step) => {
        setStep(step);
        navigate(path[step]);
        console.log('current step' + step);
    };
    const handleGoBack = (step) => {
        console.log('go back' + step);
        setStep(step);
        navigate(-1);
    };
    return (
        <EditEventStepContext.Provider value={{ step, setStep, handleGoStep, handleGoBack }}>
            {children}
        </EditEventStepContext.Provider>
    );
};
export const EditEventFormProvider = ({ children }) => {
    const navigate = useNavigate();
    const [eventTypes, setEventTypes] = useState([]);
    const [eventInfor, setEventInfor] = useState({});
    const [address, setAddress] = useState({});
    const [showtimes, setShowTimes] = useState([]);
    const [chartId, setChartId] = useState('');
    const [tickets, setTickets] = useState([]);
    const { mutateAsync: editEventMutation } = useEditEvent();
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();
    const eventId = params.id;
    useEffect(() => {
        const fetch = async () => {
            try {
                console.log('edit event' + eventId);
                setIsLoading(true);
                const res = await eventService.detailEvent(eventId);
                const event = {
                    eventName: res.eventName,
                    coverImage: res.coverImage,
                    description: res.description,
                };
                const eventAddress = {
                    provinceCode: res?.stageId?.addressId?.provinceCode,
                    districtCode: res?.stageId?.addressId?.districtCode,
                    wardCode: res?.stageId?.addressId?.wardCode,
                    province: res?.stageId?.addressId?.province,
                    district: res?.stageId?.addressId?.district,
                    ward: res?.stageId?.addressId?.ward,
                    displacePlace: res?.stageId?.addressId?.displacePlace,
                };
                setEventInfor(event);
                setAddress(eventAddress);
                setChartId(res.stageId?.chartId);
                res.showtimes.map((item) => {
                    item.startAt = new Date(item.startAt);
                    item.endAt = new Date(item.endAt);
                    item.startSaleTicketDate = new Date(item.startSaleTicketDate);
                    item.endSaleTicketDate = new Date(item.endSaleTicketDate);
                });
                let showtimes = res.showtimes.filter((item) => item.startAt > new Date());
                console.log(showtimes);
                setShowTimes(showtimes);
                const tickets = await ticketService.getTicketOfEvent(eventId);
                setTickets(tickets);
                console.log(res);
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };
        if (eventId) fetch();
    }, []);

    const editEvent = async (updateShowtimes) => {
        if (!updateShowtimes || updateShowtimes.length == 0) return console.log('hfhfh');
        const createEvent = await editEventMutation({
            ...eventInfor,
            address,
            tickets,
            showtimes: [...updateShowtimes],
            eventId,
            chartId,
        });
        if (!createEvent) return;
        else navigate('/');
    };

    return (
        <EditEventFormContext.Provider
            value={{
                eventTypes,
                setEventTypes,
                eventInfor,
                setEventInfor,
                showtimes,
                setShowTimes,
                tickets,
                setTickets,
                editEvent,
                address,
                setAddress,
                isLoading,
            }}
        >
            {children}
        </EditEventFormContext.Provider>
    );
};
export const useEditEventFormContext = () => {
    return useContext(EditEventFormContext);
};
export const useEditEventStepContext = () => {
    return useContext(EditEventStepContext);
};
