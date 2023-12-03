import { request } from '../utils/request';

const ticketService = {
    getTicketOfEvent: async (eventId) => {
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
    },
    getTicketOfShowtime: async (showtimeId) => {
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
    },
    getTypeSummary: async (showtimeId) => {
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
    },
    filterTicket: async (showtimeId, { type, sort }) => {
        try {
            const res = await request.get(`api/ticket/${showtimeId}/filter`, {
                params: {
                    type: type,
                    sort: sort,
                },
            });
            return res.data;
        } catch (e) {
            throw e;
        }
    },
};
export default ticketService;
