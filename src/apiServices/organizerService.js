import axios from 'axios';
import { request } from '../utils/request';

export async function updateOrganizer(values) {
    return new Promise(async (resolve, reject) => {
        try {
            const newOrganizer = await request.post('/api/organizer/newOrganizer', values);
            resolve(newOrganizer.data);
        } catch (err) {
            reject(err?.response);
        }
    });
}

export async function getOrganizerProfile() {
    return new Promise(async (resolve, reject) => {
        try {
            const organizerProfile = await request.get('/api/organizer');
            console.log(organizerProfile);
            resolve(organizerProfile.data);
        } catch (err) {
            reject(err?.response);
        }
    });
}
