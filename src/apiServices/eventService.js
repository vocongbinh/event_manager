import axios from 'axios';
import { eventRequest, request } from '../utils/request';
export const eventSErvice = {};
const eventService = {
    allEvents: async () => {
        try {
            const res = await request.get('api/event');

            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    headerEvents: async () => {
        try {
            const res = await eventRequest.get('api/event', {
                params: {
                    limit: 5,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    detailEvent: async (id) => {
        try {
            const res = await request.get(`api/event/detail/${id}`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    searchEvent: async (value) => {
        try {
            const res = await request.get(`api/event/search`, {
                params: {
                    q: value,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    getEventById: async (id) => {
        try {
            console.log('gggg');
            const res = await request.get(`api/event/${id}`);
            console.log(res.data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    addModerator: async (eventId, data) => {
        try {
            const res = await request.post(`api/event/${eventId}/createModerator`, data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    filterEvent: async ({ address, start, end, price, types }) => {
        try {
            console.log(types);
            const res = await request.get('api/event/filter', {
                params: {
                    address: address,
                    start: start,
                    end: end,
                    price: price,
                    types: types,
                },
                paramsSerializer: {
                    indexes: null,
                },
            });
            console.log(res.data);
            return res.data;
        } catch (e) {
            console.log(e);
        }
    },
};
export default eventService;
