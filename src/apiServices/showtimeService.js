import { request } from '../utils/request';

export const getShowtimeOfEvent = async (value) => {
    try {
        const res = await request.get(`api/showtime/event`, {
            params: {
                event_id: value,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
