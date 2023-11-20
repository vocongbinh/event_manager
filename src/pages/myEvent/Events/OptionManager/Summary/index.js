import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Summary.module.scss';
import classNames from 'classnames/bind';
import { faCheck, faClockFour, faLocationDot, faXmark } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import Button from '../../../../../components/layouts/components/Button';
import 'react-datepicker/dist/react-datepicker.css';
import eventService from '../../../../../apiServices/eventService';
import ticketService from '../../../../../apiServices/ticketService';
import Chart, { Colors } from 'chart.js/auto';
import { format } from 'date-fns';

function Summary() {
    const moment = extendMoment(Moment);
    const graph = document.getElementById('ticket-chart');
    let labels = [];
    const [chart, setChart] = useState();
    const cx = classNames.bind(styles);
    const [event, setEvents] = useState(null);
    const params = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const navigate = useNavigate();
    const [showId, setShowId] = useSearchParams();
    const [ticketTypes, setTicketTypes] = useState([]);
    let totalCount = 0;
    let totalPrice = 0;
    let startTime;
    let listShowtime = [];
    const showtimeId = showId.get('showId');

    if (event != null) {
        const datetime = Date.parse(event.showtimes[0].startAt);
        let time = new Date(datetime);
        startTime = format(time, 'HH:mm dd/MM/yyyy');
        listShowtime = event.showtimes.map((element) => {
            let timeShow = new Date(Date.parse(element.startAt));
            let startShowTime = format(timeShow, 'ccc dd/MM/yyyy HH:mm');
            return {
                ...element,
                startShowTime,
            };
        });
    }
    const handleApply = () => {
        const range = moment.range(startDate, endDate);
        const labelsConfig = Array.from(range.by('day')).map((x) => x.format('DD/MM'));
        labels = Array.from(range.by('day')).map((x) => x.format('DD-MM-yyyy'));
        let datasets = [];

        ticketTypes.forEach((type) => {
            let data = {};
            data.label = type.ticketName;
            let dataOfset = [];
            labels.forEach((label) => {
                let count = 0;
                type.ticketsales.forEach((ticket) => {
                    console.log(format(new Date(Date.parse(ticket.createdAt)), 'dd-MM-yyyy'), label);
                    if (format(new Date(Date.parse(ticket.createdAt)), 'dd-MM-yyyy') === label) {
                        count++;
                    }
                });
                dataOfset.push(count * type.price);
            });
            data.data = dataOfset;
            datasets.push(data);
        });
        const config = {
            type: 'line',
            data: {
                labels: labelsConfig,
                datasets,
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Ticket sale by date',
                    },
                },
            },
        };
        if (chart) {
            chart.destroy();
            setChart(new Chart(graph, config));
        } else {
            setChart(new Chart(graph, config));
        }
    };

    useEffect(() => {
        const fetchApi = async () => {
            const event = await eventService.getEventById(params.id);
            setEvents(event);
            const typesData = await ticketService.getTypeSummary(showtimeId);
            setTicketTypes(typesData);
        };

        fetchApi();
    }, [params.id, showtimeId]);

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
                <Button onClick={handleApply} className={cx('apply-btn')}>
                    Apply
                </Button>
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
                <p className={cx('summary-header')}>Ticket summary</p>
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
                                <p>Total Tickets</p>
                            </th>
                        </tr>
                    </thead>

                    {ticketTypes.map((type) => {
                        totalCount += type.countTicket;
                        totalPrice += type.totalPrice;
                        return (
                            <tr>
                                <td></td>
                                <td style={{ color: '#39B54A' }}>{type.ticketName}</td>
                                <td style={{ textAlign: 'right' }}>{type.price}</td>
                                <td style={{ textAlign: 'right' }}>{type.countTicket}</td>

                                <td style={{ textAlign: 'right' }}>{type.totalPrice}</td>
                            </tr>
                        );
                    })}
                    <tr>
                        <td colSpan={3}>
                            <p style={{ color: '#474747', fontWeight: 700 }}>Total</p>
                        </td>
                        <td style={{ textAlign: 'right' }}>{totalCount}</td>
                        <td style={{ textAlign: 'right' }}>{totalPrice}</td>
                    </tr>
                </table>
            </div>
            <div className={cx('chart')}>
                <canvas id="ticket-chart"></canvas>
            </div>
        </div>
    );
}

export default Summary;
