import styles from './DetailEvent.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBars,
    faCheck,
    faChevronRight,
    faEnvelope,
    faFile,
    faLocationDot,
    faPhone,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
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
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from './indexing/Calendar';
import showtimeService from '../../apiServices/showtimeService';
import { Modal, Spinner } from 'react-bootstrap';
import spinnerStyles from '../../styles/spinner.module.scss';
import modalStyles from '../../styles/modal.module.scss';
import { useAuthContext } from '../../utils/authContext';
function DetailEvent({ children }) {
    const cx = classNames.bind(styles);
    const modalCx = classNames.bind(modalStyles);
    const navigate = useNavigate();
    const [showModalContact, setShowModalContact] = useState(false);
    const spinnerCx = classNames.bind(spinnerStyles);
    const [activeIndex, setActiveIndex] = useState(0);
    const aboutRef = useRef(null);
    const informationRef = useRef(null);
    const calendarRef = useRef(null);
    const organizerRef = useRef(null);
    const recommendRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const [formValue, setFormvalue] = useState({
        content: '',
        email: '',
        message: '',
    });
    const scrollHandler = (ref, index) => {
        window.scrollTo({ top: ref.current.offsetTop - 70, behavior: 'smooth' });
    };
    const params = useParams();
    const [event, setEvent] = useState({});
    const [ticketTypes, setTicketTypes] = useState([]);
    const [statusBookBtn, setStatusBookBtn] = useState({
        content: '',
        onClick: () => {},
    });
    const [showtimes, setShowtimes] = useState([]);
    const [options, setOptions] = useState([]);
    const authContext = useAuthContext();
    const contentOptions = [
        'Event Content',
        'Ticket',
        'Business Opportunity',
        'Promotion Plan',
        'Check-in',
        'General questions',
    ];
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
    const changeHandler = (e) => {
        setFormvalue({
            ...formValue,
            [e.target.name]: e.target.value,
        });
    };
    const sendHandler = () => {
        if (formValue.content !== '' && formValue.email !== '' && formValue.message !== '') {
            const email = event.organizer.email;
        } else alert('Please select question type, enter your message and check your email address.');
    };
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
                setEvent(event);
                const showtimes = await showtimeService.getShowtimeOfEvent(params.id);
                setShowtimes(showtimes);
                let status;
                console.log(showtimes);
                let expireShowtimes = showtimes.filter((showtime) => new Date(showtime.startAt) < new Date());
                if (expireShowtimes.length === showtimes.length) {
                    status = {
                        content: 'This event is over',
                        onClick: () => {},
                    };
                } else {
                    if (showtimes.length > 1) {
                        status = {
                            content: 'Select showtime',
                            onClick: () => scrollHandler(calendarRef, 2),
                        };
                    } else {
                        status = {
                            content: 'Book',
                            onClick: () => {
                                let path = authContext.getUser()
                                    ? `book/${Object.keys(event).length > 0 ? event.showtimes[0]._id : ''}/step1`
                                    : '/auth/login';
                                navigate(path);
                            },
                        };
                    }
                }

                setStatusBookBtn(status);

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
            <Header />
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
                        <div className={cx('interact')}>
                            <Button
                                className={cx({
                                    expired: statusBookBtn.content === 'This event is over',
                                })}
                                type="highlight"
                                size="max"
                                onClick={statusBookBtn.onClick}
                            >
                                {statusBookBtn.content}
                            </Button>
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
                                        <Organizer
                                            ref={organizerRef}
                                            data={event.organizer}
                                            show={showModalContact}
                                            setShow={setShowModalContact}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-4">
                                <div
                                    className={cx('sub-detail', {
                                        dock: activeIndex >= 2 && activeIndex < 3,
                                    })}
                                >
                                    <p className={cx('sub-header')}>{event.eventName}</p>
                                    <p className={cx('sub-time-location')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                                        {event.startTime}
                                    </p>
                                    <p className={cx('sub-time-location')}>
                                        <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                                        {event.address}
                                    </p>
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
                                        onClick={statusBookBtn.onClick}
                                        className={cx('sub-book-btn', {
                                            expired: statusBookBtn.content === 'This event is over',
                                        })}
                                        type="highlight"
                                        size="max"
                                    >
                                        {statusBookBtn.content}
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <div className={cx('recommended')}>
                            <Recommended ref={recommendRef} types={event.eventType} />
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
            <Modal
                dialogClassName={cx('modal')}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showModalContact}
                onHide={() => setShowModalContact(false)}
            >
                <Modal.Header style={{ backgroundColor: '#eee' }} className={modalCx('modal-header')} closeButton>
                    <Modal.Title
                        style={{ textAlign: 'center', flex: 1, color: '#666', fontWeight: '700' }}
                        className={modalCx('title')}
                    >
                        Contact the organizer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('body')}>
                    <div className={cx('body-layout')}>
                        <div style={{ display: 'flex', alignItems: 'center', padding: '0px 10px' }}>
                            <FontAwesomeIcon color="#ccc" icon={faBars} />
                            <select name="content" onChange={changeHandler}>
                                <option value="">Select Topic</option>
                                {contentOptions.map((content, index) => (
                                    <option value={content} key={index}>
                                        {content}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={cx('modal-input')}>
                            <FontAwesomeIcon color="#ccc" icon={faEnvelope} />
                            <input name="email" placeholder="Your email address" onChange={changeHandler} />
                        </div>
                        <div className={cx('modal-textarea')}>
                            <FontAwesomeIcon color="#ccc" icon={faFile} />
                            <textarea name="message" placeholder="Your message" onChange={changeHandler} />
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={modalCx('footer')}>
                    <Button className={cx('save-btn')} onClick={sendHandler}>
                        Send messages
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DetailEvent;
