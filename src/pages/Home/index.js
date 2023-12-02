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

function Home() {
    const cx = classNames.bind(styles);
    const [events, setEvents] = useState([]);
    const slickRef = useRef(null);
    const handleLeftSlick = () => {
        slickRef?.current?.slickPrev();
    };
    const handleRightSlick = () => {
        slickRef?.current?.slickNext();
    };
    useEffect(() => {
        const getListEvents = async () => {
            try {
                const eventsData = await eventServices.allEvents();
                setEvents(eventsData);
            } catch (err) {
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
                        <SlickComponent ref={slickRef} data={events} />
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
                <div className="row mt-5;">
                    {events.map((eventItem) => (
                        <div className="col-3">
                            <EventItem data={eventItem} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
