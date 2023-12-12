import classNames from 'classnames/bind';
import styles from './EventItem.module.scss';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import ticketService from '../../../apiServices/ticketService';
import { format, min } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import showtimeService from '../../../apiServices/showtimeService';
import { faCalendar, faCalendarDay, faCalendarDays, faGrip, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function EventItem({ data }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const listPrice = data.ticketTypes.map((item) => item.price);
    const minPrice = Math.min(...listPrice);
    const dateTime = new Date(data.showtimes[0].startAt);
    let time;
    if (data.showtimes.length > 1) {
        time = format(dateTime, 'MMMM.yyyy');
    } else time = format(dateTime, 'dd, MMMM.yyyy');

    return (
        <a target="_blank" href={`/events/${data._id}/`} className={cx('wrapper')}>
            <img className={cx('header')} alt="" src={data.coverImage} />
            <div className={cx('body')}>
                <p className={cx('title')}>{data.eventName}</p>
                <div className={cx('information')}>
                    <div className={cx('price')}>
                        <span>
                            From <span style={{ color: '#2DC275', fontWeight: 'bold' }}>{minPrice} VND</span>
                        </span>
                        <div className={cx('time')}>
                            <FontAwesomeIcon color="#2DC275" style={{ marginRight: 8 }} icon={faCalendarDays} />
                            {time}
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="d-flex align-items-center">
                            <FontAwesomeIcon color="#ccc" style={{ marginRight: 8 }} icon={faGrip} />
                            <div style={{ color: '#666666', fontSize: 12 }}>{data.eventType.join(' & ')}</div>
                        </div>
                        <div className={cx('location')}>
                            <FontAwesomeIcon color="#ccc" style={{ marginRight: 6 }} icon={faLocationDot} />
                            {data.address.province}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    );
}

export default EventItem;
