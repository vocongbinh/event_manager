import { addressRequest } from '../utils/request';
export async function getProvinces() {
    try {
        const provinces = await addressRequest.get(`api/`);
        console.log(provinces);
        return provinces.data;
    } catch (error) {
        console.log(error);
    }
}
export async function getDistricts(province) {
    try {
        const districts = await addressRequest.get(`api/p/${province}/`, {
            params: { depth: 2 },
        });
        console.log(districts);
        return districts.data.districts;
    } catch (error) {
        console.log(error);
    }
}
export async function getWards(district) {
    try {
        const wards = await addressRequest.get(`api/d/${district}/`, {
            params: { depth: 2 },
        });
        console.log(wards);
        return wards.data.wards;
    } catch (error) {
        console.log(error);
    }
}
