import axios from 'axios';
import { eventRequest, request } from '../utils/request';

export const allEvents = async () => {
    try {
        const res = await eventRequest.get('api/event');

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const headerEvents = async () => {
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
};
export const detailEvent = async (id) => {
    try {
        const res = await request.get(`api/event/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
