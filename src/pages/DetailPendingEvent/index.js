import styles from './DetailEvent.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faEnvelope, faLocationDot, faPhone, faTicket } from '@fortawesome/free-solid-svg-icons';
import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import Button from '../../components/layouts/components/Button';
import About from './indexing/About';
import TicketInformation from './indexing/TicketInformation';
import Organizer from './indexing/Organizer';
import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import eventService from '../../../src/apiServices/eventService';
import ticketService from '../../apiServices/ticketService';
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from './indexing/Calendar';
import showtimeService from '../../apiServices/showtimeService';
import { Spinner } from 'react-bootstrap';
import spinnerStyles from '../../styles/spinner.module.scss';
import { useAuthContext } from '../../utils/authContext';
function DetailPendingEvent({ children }) {
    const cx = classNames.bind(styles);
    const spinnerCx = classNames.bind(spinnerStyles);
    const [activeIndex, setActiveIndex] = useState(0);
    const aboutRef = useRef(null);
    const informationRef = useRef(null);
    const calendarRef = useRef(null);
    const organizerRef = useRef(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const scrollHandler = (ref, index) => {
        window.scrollTo({ top: ref.current.offsetTop - 70, behavior: 'smooth' });
    };
    const params = useParams();
    const [event, setEvent] = useState({});
    const [ticketTypes, setTicketTypes] = useState([]);
    const [showtimes, setShowtimes] = useState([]);
    const [options, setOptions] = useState([]);
    const authContext = useAuthContext();
    const cancelHandler = async (id) => {
        await eventService.rejectEvent(id);
        navigate('/admin');
    };
    const approveHandler = async (id) => {
        await eventService.approveEvent(id);
        navigate('/admin');
    };
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
    ];
    const scrollEvent = () => {
        const offset = window.scrollY + 60;
        for (let i = 0; i < listOption.length; i++) {
            if (listOption[i].ref.current !== null) {
                if (offset <= listOption[i].ref.current.offsetTop + listOption[i].ref.current.clientHeight) {
                    setActiveIndex(i);
                    break;
                }
            }
        }
    };
    useEffect(() => {
        if (document.readyState !== 'loading') {
            window.addEventListener('scroll', scrollEvent);
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                window.addEventListener('scroll', scrollEvent);
            });
        }
        const fetchAPi = async () => {
            try {
                setLoading(true);
                const event = await eventService.detailEvent(params.id);
                console.log(event);
                setEvent(event);
                const showtimes = await showtimeService.getShowtimeOfEvent(params.id);
                console.log(showtimes);
                setShowtimes(showtimes);

                const ticketTypes = await ticketService.getTicketOfEvent(params.id);
                setLoading(false);
                setTicketTypes(ticketTypes);
            } catch (error) {
                setLoading(false);

                console.log(error);
            }
        };
        fetchAPi();
        return () => {
            window.removeEventListener('scroll', () => scrollEvent());
        };
    }, []);
    const listPrices = ticketTypes.map((item) => item.ticketTypePrice);
    const minPrice = Math.min(...listPrices);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {event.coverImage && <img alt="" className={cx('background-event')} src={event.coverImage} />}
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
                                {event.address}
                            </p>
                        </div>
                    </div>
                </div>
                <div className={cx('nav-bar')}>
                    <div className="container">
                        <div className={`mx-auto ${cx('tab-layout')}`}>
                            {listOption.map((option, index) => {
                                if (showtimes.length > 1) {
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
                                } else {
                                    if (option.title !== 'Event calendar') {
                                        return (
                                            <span
                                                className={cx('option', {
                                                    active: index === activeIndex,
                                                })}
                                                onClick={(e) => {
                                                    console.log(index);
                                                    option.handleClick(index);
                                                }}
                                            >
                                                {option.title}
                                            </span>
                                        );
                                    }
                                }
                            })}
                        </div>
                    </div>
                </div>
                <div className={`"container" ${cx('detail')}`}>
                    <div className={`mx-auto ${cx('detail-event')}`}>
                        <div className="row">
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
                            </div>
                        </div>
                        <div className={cx('actionBtn-layout')}>
                            <button onClick={() => cancelHandler(params.id)} className={cx('cancel-btn')}>
                                Reject
                            </button>
                            <button onClick={() => approveHandler(params.id)} className={cx('approve-btn')}>
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {loading && <Spinner className={spinnerCx('spinner')} animation="grow" variant="success" />}
            <footer className={cx('footer')}>
                <div className={cx('footer-content')}>
                    <div className="row">
                        <div className="col-6">
                            <p className={cx('title-footer')}>about</p>
                            <p>
                                Website Ticket Box is an online platform that provides online ticketing services for
                                cultural, entertainment, sports events and many other types of events. With a friendly
                                interface and diverse features, Ticket Box helps users easily search, buy tickets and
                                manage information about the events they are interested in.
                            </p>
                        </div>
                        <div className="col-3">
                            <p className={cx('title-footer')}>for customer</p>
                            <b style={{ color: '#c9c9c9' }}>Help center</b>
                            <p className={cx('sub-title-footer')}>Frequently asked questions</p>
                        </div>
                        <div className="col-3 d-flex flex-column">
                            <p className={cx('title-footer')}>Contact</p>
                            <b style={{ color: '#c9c9c9' }}>Hotline</b>
                            <p className={cx('sub-title-footer')}>
                                <span style={{ marginRight: 10 }}>
                                    <FontAwesomeIcon icon={faPhone} />
                                </span>
                                Monday - Friday (8.30 AM - 6:30 PM)
                            </p>
                            <b style={{ color: '#2DC275', fontSize: '1.6rem' }}>1900.6408</b>

                            <b style={{ color: '#c9c9c9', marginTop: 12 }}>email</b>
                            <p className={cx('sub-title-footer')}>
                                <span style={{ marginRight: 10 }}>
                                    <FontAwesomeIcon icon={faEnvelope} />
                                </span>
                                support@ticketbox.vn
                            </p>
                            <b style={{ color: '#c9c9c9', marginTop: 12 }}>Office</b>
                            <p className={cx('sub-title-footer')}>
                                <span style={{ marginRight: 10 }}>
                                    <FontAwesomeIcon icon={faLocationDot} />
                                </span>
                                52 Ut Tich, Ward 4, Tan Binh District, HCMC
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default DetailPendingEvent;
