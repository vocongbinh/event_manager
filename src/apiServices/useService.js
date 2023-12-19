import { request } from '../utils/request';
const userService = {
    getAllUsers: async () => {
        try {
            const res = await request.get(`api/user`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    getUserByEmail: async (email) => {
        try {
            const res = await request.get(`api/user/getBy`, {
                params: {
                    email: email,
                },
            });
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    sendMailModerator: async ({ eventId, userId, role }) => {
        try {
            const data = {
                userId,
                role,
            };
            const res = await request.post(`api/user/${eventId}/confirmModerator`, data);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    },
};

export default userService;
