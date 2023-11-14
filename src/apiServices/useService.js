import { request } from '../utils/request';
const userService = {
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
};
export default userService;
