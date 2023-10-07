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
