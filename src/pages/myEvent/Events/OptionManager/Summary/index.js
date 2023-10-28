import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Summary.module.scss';
import classNames from 'classnames/bind';
import { faCheck, faClockFour, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../../components/layouts/components/Button';
import 'react-datepicker/dist/react-datepicker.css';
import * as eventService from '../../../../../apiServices/eventService';
import * as ticketService from '../../../../../apiServices/ticketService';

function Summary() {
    const cx = classNames.bind(styles);
    const [event, setEvents] = useState(null);
    const params = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const navigate = useNavigate();
    const [showId, setShowId] = useSearchParams();
    const [ticketTypes, setTicketTypes] = useState([]);
    let startTime;
    let listShowtime = [];
    const showtimeId = showId.get('showId');
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    if (event != null) {
        const datetime = Date.parse(event.showtimes[0].startAt);
        let time = new Date(datetime);
        const hours = ('0' + time.getHours()).slice(-2);
        const minutes = ('0' + time.getMinutes()).slice(-2);
        startTime = hours + ':' + minutes + ' ' + time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear();
        listShowtime = event.showtimes.map((element) => {
            let timeShow = new Date(Date.parse(element.startAt));
            const hours = ('0' + timeShow.getHours()).slice(-2);
            const minutes = ('0' + timeShow.getMinutes()).slice(-2);
            let startShowTime =
                days[timeShow.getDay()] +
                ' ' +
                timeShow.getDate() +
                '/' +
                timeShow.getMonth() +
                '/' +
                timeShow.getFullYear() +
                ' (' +
                hours +
                ':' +
                minutes +
                ')';
            return {
                ...element,
                startShowTime,
            };
        });
    }
    useEffect(() => {
        const fetchApi = async () => {
            const events = await eventService.getEventById(params.id);
            setEvents(events[0]);
            const typesData = await ticketService.getTicketOfShowtime(showtimeId);
            console.log(typesData);
            setTicketTypes(typesData);
        };
        fetchApi();
    }, [showtimeId]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('information')}>
                    <img src={event && event.coverImage} className={cx('event-img')} alt="" />
                    <div className={cx('content')}>
                        <p className={cx('name-event')}>{event && event.eventName}</p>
                        <p className={cx('time-location')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                            {event && startTime}
                        </p>
                        <p className={cx('time-location')}>
                            <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                            {event && event.stageId.stageName}
                        </p>
                    </div>
                </div>
                <div className={cx('showIn')}>
                    <p>Show in</p>
                    <select onChange={(e) => navigate(`?showId=${e.target.value}`)} className={cx('selection')}>
                        <option>--please select a date--</option>
                        {listShowtime.map((showtime) => (
                            <option value={showtime._id}>{showtime.startShowTime}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className={cx('price')}>
                <div className={`d-flex ${cx('total')}`}>
                    <div className=" w-50">
                        <p>Total income</p>
                    </div>
                    <div className=" w-50">
                        <p className={cx('total-value')}>0 VND</p>
                    </div>
                </div>
                <div className={cx('price-detail')}>
                    <div className="d-flex p-2">
                        <div className=" w-50">
                            <p>Paid Tickets:</p>
                        </div>
                        <div className=" w-50">
                            <p>0 VND</p>
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div className=" w-50">
                            <p>Ticketbox's rate:</p>
                        </div>
                        <div className=" w-50">
                            <p>0 VND</p>
                        </div>
                    </div>
                    <div className="d-flex p-2">
                        <div className=" w-50">
                            <p>Service fee:</p>
                        </div>
                        <div className=" w-50">
                            <p>0 VND</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('time-select')}>
                <p>From</p>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
                <p>To</p>
                <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                <Button className={cx('apply-btn')}>Apply</Button>
            </div>
            <div className={cx('status-layout')}>
                <div className={cx('status-item', 'paid')}>
                    <FontAwesomeIcon className={cx('status-icon')} icon={faCheck} />
                    <div className={cx('status-content')}>
                        <p className={cx('count')}>0</p>
                        <p className={cx('status')}>Paid</p>
                    </div>
                </div>
                <div className={cx('status-item', 'cancel')}>
                    <FontAwesomeIcon className={cx('status-icon')} icon={faXmark} />
                    <div className={cx('status-content')}>
                        <p className={cx('count')}>0</p>
                        <p className={cx('status')}>Cancelled</p>
                    </div>
                </div>
                <div className={cx('status-item', 'expire')}>
                    <FontAwesomeIcon className={cx('status-icon')} icon={faXmark} />
                    <div className={cx('status-content')}>
                        <p className={cx('count')}>0</p>
                        <p className={cx('status')}>Expired</p>
                    </div>
                </div>
            </div>
            <div className={cx('ticket-summary')}>
                <table>
                    <thead>
                        <tr>
                            <th style={{ width: 20, padding: 5 }}>
                                <input checked type="checkbox" />
                            </th>
                            <th style={{ width: 250 }}>
                                <p>Ticket Type</p>
                            </th>
                            <th>
                                <span style={{ fontWeight: 400 }}>Sold Price</span>
                                <p>VND</p>
                            </th>
                            <th>
                                <p>Paid Tickets</p>
                            </th>
                            <th>
                                <p>Processing Tickets</p>
                            </th>
                            <th>
                                <p>Total Tickets</p>
                            </th>
                        </tr>
                    </thead>

                    {ticketTypes.map((type) => (
                        <tr>
                            <td></td>
                            <td style={{ color: '#39B54A' }}>{type.ticketName}</td>
                            <td style={{ textAlign: 'right' }}>0</td>
                            <td style={{ textAlign: 'right' }}>0</td>
                            <td style={{ textAlign: 'right' }}>0</td>
                            <td style={{ textAlign: 'right' }}>0</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={3}>
                            <p style={{ color: '#474747', fontWeight: 700 }}>Total</p>
                        </td>
                        <td style={{ textAlign: 'right' }}>0</td>
                        <td style={{ textAlign: 'right' }}>0</td>
                        <td style={{ textAlign: 'right' }}>0</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}

export default Summary;
