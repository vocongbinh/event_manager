import { request } from '../utils/request';
const authService = {
    checkPhoneNumber: async (phoneNumber) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { status, data } = await request.post(`api/checkPhoneNumber`, {
                    phoneNumber: phoneNumber,
                });
                resolve({ status, data });
            } catch (error) {
                reject(error);
            }
        });
    },
    postOtp: async (phoneNumber, password, otp) => {
        return new Promise(async (resolve, reject) => {
            try {
                console.log(phoneNumber, password, otp);
                const { status, data } = await request.post(`api/verifyOtp`, {
                    phoneNumber,
                    password,
                    otp,
                });
                resolve({ status, data });
            } catch (error) {
                reject(error);
            }
        });
    },
    register: async (phoneNumber, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const { status, data } = await request.post(`api/register`, {
                    phoneNumber,
                    password,
                });
                resolve({ status, data });
            } catch (error) {
                reject(error);
            }
        });
    },
    login: (phoneNumber, password) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await request.post(`api/login`, {
                    phoneNumber: phoneNumber,
                    password: password,
                });
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    },
    editProfile: (values) => {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await request.post(`api/user/editProfile`, {
                    ...values,
                });
                console.log(res.data);
                resolve(res.data);
            } catch (error) {
                reject(error);
            }
        });
    },
    // register: async (phoneNumber, password) => {
    //     try {
    //         const res = await request.get(`api/auth/login`, {
    //             params: {
    //                 phoneNumber: phoneNumber,
    //                 password: password,
    //             },
    //         });
    //         return res.data;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // },
};
export default authService;
