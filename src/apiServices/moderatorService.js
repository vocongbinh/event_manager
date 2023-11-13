import { request } from '../utils/request';
const moderatorService = {
    addModerator: async (eventId, data) => {
        try {
            const res = await request.post(`api/moderator/${eventId}/create`, data);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    getAll: async () => {
        try {
            const res = await request.get('/api/moderator');
            return res.json();
        } catch (err) {
            throw new Error(err);
        }
    },
};
export default moderatorService;
