import axios from 'axios';

export const eventRequest = axios.create({
    baseURL: 'https://3e91dcc4-da1f-417b-b1d4-f808f7588f00.mock.pstmn.io/',
});
export const addressRequest = axios.create({
    baseURL: 'https://provinces.open-api.vn/',
});
export const stageRequest = axios.create({
    baseURL: 'https://b8b446c3-c71c-43f5-963e-44aa2718e173.mock.pstmn.io/',
});
export const myRequest = axios.create({
    baseURL: 'https://26ba083f-3e7e-4f12-ae0e-9e2662c66bc8.mock.pstmn.io/',
});
const request = axios.create({
    baseURL: 'http://localhost:8000/',
});
request.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken');
        if (token) {
            config.headers['token'] = `Bearer ${token}`;
        }
        return config;
    },

    // (error) => {
    //     return Promise.reject(error);
    // },
);
export { request };
