import { format } from 'date-fns';
import styles from './EventItem.module.scss';
import classNames from 'classnames/bind';
function EventItem({ data }) {
    const cx = classNames.bind(styles);
    const time = data.showtimes[0]?.startAt || null;
    const startTime = format(new Date(time), 'dd/MM/yyyy');

    return (
        <a target="_blank" href={`/events/${data._id}/`} className={cx('wrapper')}>
            <img className={cx('content-img')} src={data.coverImage} />
            <p className={cx('name')}>{data.eventName}</p>
            <p className={cx('time')}>{startTime}</p>
            <p className={cx('type')}>{data.eventType.join(' & ')}</p>
        </a>
    );
}

export default EventItem;
