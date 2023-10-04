import axios from 'axios';
import { request } from '../utils/request';

export const allEvents = async () => {
    try {
        const res = await request.get('api/my/my_events');
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
