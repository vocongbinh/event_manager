import { request } from '../utils/request';
export const create = async (data) => {
    try {
        const res = await request.post('api/discount', data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAll = async (showtimeId) => {
    try {
        const res = await request.get(`api/discount/showtime`, {
            params: { showtime_id: showtimeId },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getById = async (id) => {
    try {
        const res = await request.get(`api/discount/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const deleteDiscount = async (id) => {
    try {
        const res = await request.delete(`api/discount/${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateDiscount = async (id, data) => {
    try {
        console.log(data);
        const res = await request.patch(`api/discount/${id}`, data);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const findAll = async () => {
    try {
        const res = await request.get(`api/discount`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getDiscountOfEvent = async (id) => {
    try {
        const res = await request.get(`/api/discount/event/${id}`);
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err?.response);
    }
};
