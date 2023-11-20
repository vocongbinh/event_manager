import styles from './DetailEvent.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLocationDot, faTicket } from '@fortawesome/free-solid-svg-icons';
import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import Button from '../../components/layouts/components/Button';
import About from './indexing/About';
import TicketInformation from './indexing/TicketInformation';
import Organizer from './indexing/Organizer';
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import eventService from '../../../src/apiServices/eventService';
import ticketService from '../../apiServices/ticketService';
import Recommended from './indexing/Recommended';
import { useParams } from 'react-router-dom';
import Calendar from './indexing/Calendar';
import showtimeService from '../../apiServices/showtimeService';
function DetailEvent({ children }) {
    const cx = classNames.bind(styles);
    const [activeIndex, setActiveIndex] = useState(0);
    const aboutRef = useRef(null);
    const informationRef = useRef(null);
    const calendarRef = useRef(null);
    const organizerRef = useRef(null);
    const recommendRef = useRef(null);
    const scrollHandler = (ref, index) => {
        window.scrollTo({ top: ref.current.offsetTop - 70, behavior: 'smooth' });
    };
    const params = useParams();
    const [event, setEvent] = useState({});
    const [ticketTypes, setTicketTypes] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    let listOption = [
        {
            title: 'About',
            ref: aboutRef,
            handleClick: (index) => {
                scrollHandler(aboutRef, index);
            },
        },
        {
            title: 'Ticket Information',
            ref: informationRef,
            handleClick: (index) => {
                scrollHandler(informationRef, index);
            },
        },
        {
            title: 'Event calendar',
            ref: calendarRef,
            handleClick: (index) => {
                scrollHandler(calendarRef, index);
            },
        },
        {
            title: 'Organizer',
            ref: organizerRef,
            handleClick: (index) => {
                scrollHandler(organizerRef, index);
            },
        },
        {
            title: 'Recommend for you',
            ref: recommendRef,
            handleClick: (index) => {
                scrollHandler(recommendRef, index);
            },
        },
    ];
    useEffect(() => {
        const scrollEvent = window.addEventListener('scroll', () => {
            const offsetTop = window.scrollY + 60;

            for (let i = 0; i < listOption.length; i++) {
                if (offsetTop <= listOption[i].ref.current.offsetTop + listOption[i].ref.current.clientHeight) {
                    setActiveIndex(i);

                    break;
                }
            }
        });

        const fetchAPi = async () => {
            try {
                const event = await eventService.detailEvent(params.id);
                setEvent(event);
                const showtimes = await showtimeService.getShowtimeOfEvent(params.id);
                setShowtimes(showtimes);
                console.log(showtimes);
                const ticketTypes = await ticketService.getTicketOfEvent(params.id);
                setTicketTypes(ticketTypes);
            } catch (error) {
                console.log(error);
            }
        };
        fetchAPi();
        return () => {
            window.removeEventListener('scroll', scrollEvent);
        };
    }, []);
    if (showtimes.length === 1) {
        listOption.splice(2, 1);
    }
    const listPrices = ticketTypes.map((item) => item.price);
    const minPrice = Math.min(...listPrices);

    //date time
    // let startTime = Date.parse(event.startTime);
    // let time = new Date(startTime);
    // const hours = ('0' + time.getHours()).slice(-2);
    // const minutes = ('0' + time.getMinutes()).slice(-2);
    // const month = months[time.getMonth()];
    // const year = time.getFullYear();
    // const day = days[time.getDay()];
    // const date = time.getDate();
    // startTime = `${day}, ${date} ${month} ${year} (${hours}:${minutes})`;

    return (
        <div className={`container-fluid ${cx('wrapper')}`}>
            <Header />
            <div className={cx('container')}>
                <img className={cx('background-event')} src={event.coverImage} />

                <div className="container">
                    <div className={cx('infor-event')}>
                        <div className={cx('calendar')}>
                            <p className={cx('month')}>{event.month}</p>
                            <p className={cx('date')}>{event.date}</p>
                            <p className={cx('day')}>{event.day}</p>
                        </div>
                        <div className={`col-sm-7 ${cx('content-event')}`}>
                            <p className={cx('title')}>{event.eventName}</p>
                            <p className={cx('time-location')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                                {event.startTime}
                            </p>
                            <p className={cx('time-location')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                                {event.stage}
                            </p>
                            <p className={cx('address')}>{event.address}</p>
                        </div>
                        <div className={cx('interact')}>
                            <Button onClick={() => scrollHandler(calendarRef, 2)} type="highlight" size="max">
                                {showtimes.length > 1 ? 'Select showtime' : 'Book'}
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('nav-bar')}>
                    <div className="container">
                        <div className={`mx-auto ${cx('tab-layout')}`}>
                            {listOption.map((option, index) => {
                                if (option.ref === calendarRef) {
                                    if (showtimes.length > 1)
                                        return (
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
                                        );
                                } else
                                    return (
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
                                    );
                            })}
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
                                        <TicketInformation ref={informationRef} data={ticketTypes} />
                                    </div>
                                    {showtimes.length > 1 && (
                                        <div className={cx('detail-item')}>
                                            <Calendar ref={calendarRef} data={showtimes} />
                                        </div>
                                    )}

                                    <div className={cx('detail-item')}>
                                        <Organizer ref={organizerRef} data={event.organizer} />
                                    </div>
                                    <div className={cx('detail-item')}>
                                        <Recommended ref={recommendRef} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div
                                    className={cx('sub-detail', {
                                        dock: activeIndex >= 2,
                                    })}
                                >
                                    <p className={cx('sub-header')}>{event.eventName}</p>
                                    <p className={cx('sub-time-location')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                                        {event.startTime}
                                    </p>
                                    <p className={cx('sub-time-location')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                                        {event.stage}
                                    </p>
                                    <p className={cx('sub-address')}>{event.address}</p>
                                    <p
                                        onClick={() => scrollHandler(informationRef, 1)}
                                        className={cx('sub-ticket', 'sub-time-location')}
                                    >
                                        <FontAwesomeIcon className={cx('icon')} icon={faTicket} />
                                        From <span style={{ fontWeight: 700 }}>{minPrice} VND</span>
                                        <FontAwesomeIcon
                                            className={cx('icon')}
                                            style={{ float: 'right', marginTop: '2px' }}
                                            icon={faChevronRight}
                                        />
                                    </p>
                                    <Button
                                        onClick={() => scrollHandler(calendarRef, 2)}
                                        className={cx('sub-book-btn')}
                                        type="highlight"
                                        size="max"
                                    >
                                        {showtimes.length > 1 ? 'Select showtime' : 'Book'}
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
