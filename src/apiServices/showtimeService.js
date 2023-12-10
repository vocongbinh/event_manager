import { request } from '../utils/request';

const showtimeService = {
    getShowtimeOfEvent: async (value) => {
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
    },
    getShowtime: async (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await request.get(`api/showtime/${id}`);
                resolve(res.data);
            } catch (err) {
                console.log(err);
            }
        });
    },
};
export default showtimeService;
