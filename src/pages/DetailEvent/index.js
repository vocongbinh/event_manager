import styles from './DetailEvent.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import Button from '../../components/layouts/components/Button';
import About from './indexing/About';
import TicketInformation from './indexing/TicketInformation';
import Organizer from './indexing/Organizer';
import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import * as eventService from '../../../src/apiServices/eventService';
import Recommended from './indexing/Recommended';
import { useParams } from 'react-router-dom';

function DetailEvent({ children }) {
    const cx = classNames.bind(styles);
    const [activeIndex, setActiveIndex] = useState(0);
    const aboutRef = useRef(null);
    const informationRef = useRef(null);
    const organizerRef = useRef(null);
    const recommendRef = useRef(null);
    const scrollHandler = (ref, index) => {
        window.scrollTo({ top: ref.current.offsetTop - 70, behavior: 'smooth' });
        setActiveIndex(index);
    };
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const params = useParams();
    const [event, setEvent] = useState({});
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const offsetTop = window.scrollY + 60;
            if (offsetTop <= aboutRef.current.offsetTop + aboutRef.current.clientHeight) {
                setActiveIndex(0);
            } else if (offsetTop < informationRef.current.offsetTop + informationRef.current.clientHeight) {
                setActiveIndex(1);
            } else if (offsetTop < organizerRef.current.offsetTop + organizerRef.current.clientHeight) {
                setActiveIndex(2);
            } else setActiveIndex(3);
        });

        const fetchAPi = async () => {
            try {
                let event = await eventService.detailEvent(params.id);
                //console.log(event.organizer.logoImage);
                console.log('1');
                setEvent(event);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAPi();
    }, []);

    const listOption = [
        {
            title: 'About',
            handleClick: (index) => {
                scrollHandler(aboutRef, index);
            },
        },
        {
            title: 'Ticket Information',
            handleClick: (index) => {
                scrollHandler(informationRef, index);
            },
        },
        {
            title: 'Organizer',
            handleClick: (index) => {
                scrollHandler(organizerRef, index);
            },
        },
        {
            title: 'Recommend for you',
            handleClick: (index) => {
                scrollHandler(recommendRef, index);
            },
        },
    ];
    console.log('2');
    //date time
    let startTime = Date.parse(event.startTime);
    let time = new Date(startTime);
    const hours = ('0' + time.getHours()).slice(-2);
    const minutes = ('0' + time.getMinutes()).slice(-2);
    const month = months[time.getMonth()];
    const year = time.getFullYear();
    const day = days[time.getDay()];
    const date = time.getDate();
    startTime = `${day}, ${date} ${month} ${year} (${hours}:${minutes})`;

    return (
        <div className={`container-fluid ${cx('wrapper')}`}>
            <Header />
            <div className={cx('container')}>
                <img
                    className={cx('background-event')}
                    src="https://lh3.googleusercontent.com/yt5FGbyvBSoAYuOAh7zW-R91NtRXs4HTR1uggdhNuWb3WdkfAEUGKbCGERsCGdgww_l2JdVbYcOtVnfZawyW2vV3IjxDx8s29M7hHvxJthCRFA=s2400-rj"
                />

                <div className="container">
                    <div className={cx('infor-event')}>
                        <div className={cx('calendar')}>
                            <p className={cx('month')}>{month}</p>
                            <p className={cx('date')}>{date}</p>
                            <p className={cx('day')}>{day}</p>
                        </div>
                        <div className={`col-sm-7 ${cx('content-event')}`}>
                            <p className={cx('title')}>{event.eventName}</p>
                            <p className={cx('time-location')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                                {startTime}
                            </p>
                            <p className={cx('time-location')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                                {event.stage}
                            </p>
                            <p className={cx('address')}>{event.address}</p>
                        </div>
                        <div className={cx('interact')}>
                            <Button type="highlight" size="max">
                                Book now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('nav-bar')}>
                    <div className="container">
                        <div className={`mx-auto ${cx('tab-layout')}`}>
                            {listOption.map((option, index) => (
                                <span
                                    className={cx('option', {
                                        active: index === activeIndex,
                                    })}
                                    onClick={(e) => {
                                        option.handleClick(index);
                                    }}
                                >
                                    {option.title}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`"container" ${cx('detail')}`}>
                    <div className={`mx-auto ${cx('detail-event')}`}>
                        <div className="row">
                            <div className="col-8">
                                <div className={cx('detail-content')}>
                                    <div className={cx('detail-item')}>
                                        <About ref={aboutRef} data={event.description} />
                                    </div>
                                    <div className={cx('detail-item')}>
                                        <TicketInformation ref={informationRef} />
                                    </div>

                                    <div className={cx('detail-item')}>
                                        <Organizer ref={organizerRef} data={event.organizer} />
                                    </div>
                                    <div className={cx('detail-item')}>
                                        <Recommended ref={recommendRef} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div className={cx('sub-detail')}>
                                    <p className={cx('sub-header')}>
                                        2023-2024 BamBam THE 1ST WORLD TOUR [AREA 52] In HO CHI MINH
                                    </p>
                                    <p className={cx('sub-time-location')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                                        Saturday, 28 October 2023 (07:00 PM - 11:00 PM)
                                    </p>
                                    <p className={cx('sub-time-location')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                                        Nhà thi đấu Quân khu 7
                                    </p>
                                    <p className={cx('sub-address')}>Nhà thi đấu Quân khu 7</p>
                                    <p className={cx('sub-ticket')}>From 1.400.000 VND</p>
                                    <Button type="highlight" size="max">
                                        Book now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailEvent;
