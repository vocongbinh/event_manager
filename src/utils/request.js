import axios from 'axios';

export const eventRequest = axios.create({
    baseURL: 'https://3e91dcc4-da1f-417b-b1d4-f808f7588f00.mock.pstmn.io/',
});
export const addressRequest = axios.create({
    baseURL: 'https://624adbea-eae6-4432-8c88-d4693f0d67dd.mock.pstmn.io/',
});
export const stageRequest = axios.create({
    baseURL: 'https://b8b446c3-c71c-43f5-963e-44aa2718e173.mock.pstmn.io/',
});
export const myRequest = axios.create({
    baseURL: 'https://26ba083f-3e7e-4f12-ae0e-9e2662c66bc8.mock.pstmn.io/',
});

export const request = axios.create({
    baseURL: 'http://localhost:5001/',
});
