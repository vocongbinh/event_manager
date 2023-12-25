import { useEffect, useRef, useState } from 'react';
import EventItem from './EventItem';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import eventServices from '../../apiServices/eventService';

import Button from '../../components/layouts/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Images from '../../assets/images';
import SlickComponent from '../../components/SlickComponent';
import Spinner from 'react-bootstrap/Spinner';
import spinnerStyles from '../../styles/spinner.module.scss';
import LazyLoad from 'react-lazy-load';

function Home() {
    const cx = classNames.bind(styles);
    const spinnerCx = classNames.bind(spinnerStyles);
    const [events, setEvents] = useState([]);
    const [headerEvents, setHeaderVents] = useState([]);
    const slickRef = useRef(null);
    const [loading, setLoading] = useState(false);
    const handleLeftSlick = () => {
        slickRef?.current?.slickPrev();
    };
    const handleRightSlick = () => {
        slickRef?.current?.slickNext();
    };
    useEffect(() => {
        const getListEvents = async () => {
            try {
                setLoading(true);
                const eventsData = await eventServices.allEvents();
                const headerData = await eventServices.headerEvents();
                setEvents(eventsData || []);
                setHeaderVents(headerData);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log('error');
            }
        };
        getListEvents();
    }, []);
    return (
        <div className="container">
            <div className={cx('wrapper')}>
                <div className={cx('header')}>
                    <Button type="circle" onClick={handleLeftSlick} className={cx('chevron-icon')}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </Button>
                    <div className={cx('slick')}>
                        {' '}
                        <SlickComponent ref={slickRef} data={headerEvents} />
                    </div>

                    <Button type="circle" onClick={handleRightSlick} className={cx('chevron-icon')}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </Button>
                </div>

                <div className="d-flex align-items-center justify-content-center">
                    <div className={cx('header-devide')}>
                        {Images.headingLeft}
                        Feature events
                        {Images.headingRight}
                    </div>
                </div>
                <div className="row" style={{ marginTop: 40, paddingBottom: 40 }}>
                    {events.map((eventItem, index) => (
                        <div className="col-3">
                            <LazyLoad key={index}>
                                <EventItem data={eventItem} />
                            </LazyLoad>
                        </div>
                    ))}
                </div>
                <div className={cx('see-more-layout')}>
                    <Button to="/events/typeEvent" className={cx('see-more-btn')}>
                        See More
                    </Button>
                </div>
                {loading && <Spinner className={spinnerCx('spinner')} animation="grow" variant="success" />}
            </div>
        </div>
    );
}

export default Home;
