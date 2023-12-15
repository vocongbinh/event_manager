import { useEffect, useState } from 'react';
import styles from './Events.module.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import eventService from '../../../../../apiServices/eventService';
import EventItem from '../../../../../pages/Home/EventItem';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
function Events() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const {} = useQuery({
        queryKey: ['pendingEvent'],
        queryFn: async () => {
            const data = await eventService.pendingEvent();
            console.log(data);
            setEvents(data);
            return data;
        },
    });
    const titleTables = ['Event Name', 'Organizer', 'Created At', 'Status'];
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <table className={cx('table')}>
                <tr>
                    {titleTables.map((item, index) => (
                        <th>{item}</th>
                    ))}
                </tr>
                {events.map((event, index) => {
                    const createAt = event.createdAt;
                    const time = format(new Date(createAt), 'dd-MM-yyyy HH:mm:ss');
                    return (
                        <tr onClick={() => navigate(`/admin/${event._id}`)} key={index}>
                            <td style={{ textTransform: 'uppercase', fontWeight: 'bold', width: '40%' }}>
                                {event.eventName}
                            </td>
                            <td width="25%">
                                <div className="d-flex">
                                    <img alt="" src={event.organizerId.imageUrl} />
                                    <div>
                                        <span> {event.organizerId.email}</span>
                                        <span> {event.organizerId.phoneNumber}</span>
                                    </div>
                                </div>
                            </td>
                            <td width="20%">{time}</td>
                            <td width="15%">
                                <span
                                    className={cx('status', {
                                        approved: event.status === 'Approved',
                                        pending: event.status === 'Pending',
                                    })}
                                >
                                    {event.status}
                                </span>
                            </td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}

export default Events;
