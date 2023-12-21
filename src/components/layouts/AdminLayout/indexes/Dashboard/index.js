import { Chart } from 'chart.js';
import eventService, { eventSErvice } from '../../../../../apiServices/eventService';
import styles from './Dashboard.module.scss';
import spinnerStyles from '../../../../../styles/spinner.module.scss';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import Button from '../../../components/Button';
import Moment from 'moment';
import { format } from 'date-fns';
import { extendMoment } from 'moment-range';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartSimple, faCoins } from '@fortawesome/free-solid-svg-icons';
import userService from '../../../../../apiServices/useService';
import ticketService from '../../../../../apiServices/ticketService';
import { Spinner } from 'react-bootstrap';
import CustomNumberFormat from '../../../../../utils/FormatNumber';
import formatNumber from '../../../../../utils/FormatNumber';
function Dashboard() {
    const cx = classNames.bind(styles);
    const moment = extendMoment(Moment);
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [events, setEvents] = useState([]);
    const [createdChart, setCreatedChart] = useState();
    const [countUser, setCountUser] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);
    const [loading, setLoading] = useState(false);
    const spinnerCx = classNames.bind(spinnerStyles);
    useEffect(() => {
        const fetchAPI = async () => {
            setLoading(true);
            const eventData = await eventService.allEvents();
            setEvents(eventData);
            const userData = await userService.getAllUsers();
            setCountUser(userData.length);
            const ticketData = await ticketService.getAllTicket();
            let total = 0;
            console.log(ticketData);
            let count = 0;
            ticketData.map((item) => {
                if (item.ticketType) {
                    total += item.ticketType.ticketTypePrice;
                }
            });
            console.log(count);
            setTotalIncome(total);
            let chart;
            try {
                const hotEventData = await eventService.hotEvents();
                console.log(hotEventData);
                const labelsConfig = hotEventData.map((event) => event._id.name);
                let data = [];
                const graph = document.getElementById('hotEvent-chart');
                hotEventData.forEach((event) => {
                    data.push(event.countSeats);
                });
                const config = {
                    type: 'bar',
                    data: {
                        labels: labelsConfig,
                        datasets: [
                            {
                                label: 'hot events',
                                data: data,
                            },
                        ],
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: false,
                            },
                        },
                    },
                };
                setLoading(false);
                let oldChart = Chart.getChart('hotEvent-chart');
                if (oldChart) {
                    oldChart.destroy();
                    chart = new Chart(graph, config);
                } else chart = new Chart(graph, config);
            } catch (e) {
                throw e;
            }
        };
        fetchAPI();
    }, []);
    const applyHandler = () => {
        const range = moment.range(startDate, endDate);
        const labelsConfig = Array.from(range.by('month')).map((x) => x.format('MM/yyyy'));
        console.log(labelsConfig);
        let data = [];
        const graph = document.getElementById('createdEvent-chart');
        labelsConfig.forEach((label) => {
            let count = 0;
            events.forEach((event) => {
                console.log(format(new Date(Date.parse(event.createdAt)), 'MM/yyyy'), label);
                if (format(new Date(Date.parse(event.createdAt)), 'MM/yyyy') === label) {
                    console.log('binh');
                    count++;
                }
            });
            data.push(count);
        });
        console.log(data);

        const config = {
            type: 'line',
            data: {
                labels: labelsConfig,
                datasets: [
                    {
                        label: 'created events',
                        data: data,
                        backgroundColor: '#1de97f',
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                backgroundColor: '#ffffff',
                fill: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: false,
                    },
                },
            },
        };
        if (createdChart) {
            createdChart.destroy();
            setCreatedChart(new Chart(graph, config));
        } else {
            setCreatedChart(new Chart(graph, config));
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div style={{ width: '100%' }} className="d-flex">
                    <div className={cx('hot-events-layout')}>
                        <div className={cx('header')}>The most purchased events in the last 30 days</div>
                        <canvas id="hotEvent-chart"></canvas>
                    </div>
                    <div className={cx('overview-layout')}>
                        <div className={cx('overview-item')}>
                            <div
                                style={{ height: '100%', width: '60%', flex: 1 }}
                                className="d-flex flex-column justify-content-between"
                            >
                                <p className={cx('overview-header')}>Number of users</p>
                                <span className={cx('data')}>{countUser}</span>
                            </div>
                            <FontAwesomeIcon color="#6BDCFF" icon={faChartSimple} size="8x" />
                        </div>
                        <div className={cx('overview-item')}>
                            <div
                                style={{ height: '100%', width: '60%', flex: 1 }}
                                className="d-flex flex-column justify-content-between"
                            >
                                <p className={cx('overview-header')}>Total Income</p>
                                <span style={{ fontSize: '3rem' }} className={cx('data')}>
                                    {formatNumber(totalIncome)} VND
                                </span>
                            </div>
                            <FontAwesomeIcon color="#FFC988" icon={faCoins} size="7x" />
                        </div>
                    </div>
                </div>
                <div className={cx('created-event-layout')}>
                    <p className={cx('header')}>Statistics on the number of events created by day</p>
                    <div className={cx('header-created')}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                onChange={(e) => setStartDate(e)}
                                label={'"month" and "year"'}
                                views={['month', 'year']}
                            />
                        </LocalizationProvider>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                onChange={(e) => setEndDate(e)}
                                label={'"month" and "year"'}
                                views={['month', 'year']}
                            />
                        </LocalizationProvider>
                        <Button className={cx('applyBtn')} onClick={applyHandler}>
                            Apply
                        </Button>
                    </div>

                    <canvas id="createdEvent-chart"></canvas>
                </div>
            </div>
            {loading && <Spinner className={spinnerCx('spinner')} animation="grow" variant="success" />}
        </div>
    );
}

export default Dashboard;
