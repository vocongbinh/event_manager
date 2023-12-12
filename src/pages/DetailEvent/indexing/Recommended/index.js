import { forwardRef, memo, useEffect, useState } from 'react';
import styles from './Recommended.module.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import eventService from '../../../../apiServices/eventService';
import EventItem from '../../../TypeEvent/EventItem';
import Images from '../../../../assets/images';

const Recommended = forwardRef(({ types }, ref) => {
    const cx = classNames.bind(styles);
    const [events, setEvents] = useState([]);
    useEffect(() => {
        const fetchAPi = async () => {
            if (types) {
                console.log(types);
                const data = await eventService.suggestEvent(types);
                setEvents(data);
            }
        };
        fetchAPi();
    }, [types]);
    return (
        <div ref={ref} className={cx('wrapper')}>
            <div className="d-flex align-items-center">
                <span style={{ marginRight: 10 }}>
                    <img width={24} height={24} alt="" src={Images.home} />
                </span>
                <h1>Recommended for you</h1>
            </div>
            <div className={cx('event-layout')}>
                <div className="container">
                    <div className="row">
                        {events &&
                            events.map((event, index) => {
                                return (
                                    <div key={index} className="col-4">
                                        <EventItem data={event} />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default memo(Recommended);
