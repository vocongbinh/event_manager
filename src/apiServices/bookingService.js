import { request } from '../utils/request';
export async function createHoldTickets({ tickets, eventKey, holdToken }) {
    try {
        console.log(eventKey);
        console.log(tickets);
        if (tickets.length == 0) throw Error('tickets is empty');
        const holdTickets = await request.post(`api/booking/holdTickets`, {
            tickets,
            eventKey,
            holdToken,
        });
        console.log(JSON.stringify(holdTickets));
        return { holdTickets };
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}
export async function createPayTickets({ bookings, discounts, eventKey, holdToken }) {
    try {
        if (bookings.length == 0 || !eventKey) throw Error('bookings is empty or eventkey is not exist');
        const payTickets = await request.post(`api/booking/payTickets`, {
            bookings,
            eventKey,
            holdToken,
            discounts,
        });
        console.log(JSON.stringify(payTickets));
        return { payTickets };
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

export async function createHoldToken() {
    try {
        console.log('get token');
        const res = await request.get('/api/booking/holdToken');
        return res.data.holdToken;
    } catch (err) {
        console.log(err);
    }
}
