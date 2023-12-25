import axios from 'axios';
import { request, myRequest } from '../utils/request';

export const allEvents = async (userId) => {
    try {
        const res = await request.get(`api/my/my_events/${userId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const searchEvents = async (value, id) => {
    try {
        const res = await request.get(`api/my/my_events/${id}/search`, {
            params: {
                q: value,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const myTickets = async () => {
    try {
        const res = await request.get(`api/my/tickets`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const myDiscounts = async () => {
    try {
        const res = await request.get(`api/my/discounts`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
