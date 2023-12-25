import { request } from '../utils/request';
const parameterService = {
    getCommission: async () => {
        try {
            const res = await request.get(`api/parameter/commission`);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    },
    create: async (data) => {
        try {
            const res = await request.post('api/parameter', data);
        } catch (error) {
            console.log(error);
        }
    },
};
export default parameterService;
