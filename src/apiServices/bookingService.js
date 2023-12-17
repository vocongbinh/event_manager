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
export async function createNewBooking({
    tickets,
    discounts,
    eventKey,
    holdToken,
    showtime,
    receiverName,
    receiverEmail,
    receiverPhoneNumber,
}) {
    try {
        if (tickets.length == 0 || !eventKey) throw Error('bookings is empty or eventkey is not exist');
        const payTickets = await request.post(`api/booking/createNewBooking`, {
            tickets,
            eventKey,
            holdToken,
            discounts,
            receiverEmail,
            receiverName,
            receiverPhoneNumber,
            showtime,
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
        // console.log(localStorage.getItem('userToken'));
        // let config = {
        //     method: 'get',
        //     maxBodyLength: Infinity,
        //     url: '/api/booking/holdToken',
        //     headers: {
        //         Authorization: 'Bearer ' + localStorage.getItem('userToken'),
        //     },
        // };
        const res = await request.get('/api/booking/holdToken');
        return res.data;
    } catch (err) {
        console.log(err);
    }
}
