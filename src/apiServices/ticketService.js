import { request } from '../utils/request';

export const getTicketOfEvent = async (eventId) => {
    try {
        const res = await request.get(`api/ticket/event`, {
            params: {
                event_id: eventId,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getTicketOfShowtime = async (showtimeId) => {
    try {
        const res = await request.get(`api/ticket/showtime`, {
            params: {
                showtime_id: showtimeId,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
//summary
export const getTypeSummary = async (showtimeId) => {
    try {
        const res = await request.get(`api/ticket/summary`, {
            params: {
                showtime_id: showtimeId,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
