import axios from 'axios';
import { request } from '../utils/request';

const ticketService = {
    getAllTicket: async () => {
        try {
            const res = await request.get(`api/ticket`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
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
                    showtime_id: '65785a08d075be6a13e55e22',
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
                // const res = await axios.get('http://127.0.0.1:8000/api/ticket/65785a08d075be6a13e55e22/filter', {
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
    getTicketStatistic: async (showtimeId) => {
        try {
            // const res = await request.get(`api/ticket/${showtimeId}/statistic`);
            const res = await axios.get('http://127.0.0.1:8000/api/ticket/65785a08d075be6a13e55e22/statistic');
            return res.data;
        } catch (e) {
            throw e;
        }
    },
};
export default ticketService;
