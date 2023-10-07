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
import { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import * as eventService from '../../../src/apiServices/eventService';
import * as ticketService from '../../../src/apiServices/ticketService';
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
    };
    const params = useParams();
    const [event, setEvent] = useState({});
    const [ticketTypes, setTicketTypes] = useState([]);
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
                setEvent(event);
                const ticketTypes = await ticketService.getTicketOfEvent(params.id);
                setTicketTypes(ticketTypes);
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
                <img
                    className={cx('background-event')}
                    src="https://lh3.googleusercontent.com/yt5FGbyvBSoAYuOAh7zW-R91NtRXs4HTR1uggdhNuWb3WdkfAEUGKbCGERsCGdgww_l2JdVbYcOtVnfZawyW2vV3IjxDx8s29M7hHvxJthCRFA=s2400-rj"
                />

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
                                        <TicketInformation ref={informationRef} data={ticketTypes} />
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
                                        From <span style={{ fontWeight: 700 }}>1.400.000 VND</span>
                                        <FontAwesomeIcon
                                            className={cx('icon')}
                                            style={{ float: 'right', marginTop: '2px' }}
                                            icon={faChevronRight}
                                        />
                                    </p>
                                    <Button className={cx('sub-book-btn')} type="highlight" size="max">
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
