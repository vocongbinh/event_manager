import { useEffect, useRef, useState } from 'react';
import EventItem from './EventItem';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import * as eventServices from '../../apiServices/eventService';

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
                const binh = await eventServices.headerEvents();
                console.log(binh);
                setEvents(binh);
            } catch (err) {
                console.log('loi');
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

                <div className={cx('header-devide')}>
                    <img src={Images.headingLeft} alt="" />
                    Feature events
                    <img src={Images.headingRight} alt="" />
                </div>
                <div className="row">
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
