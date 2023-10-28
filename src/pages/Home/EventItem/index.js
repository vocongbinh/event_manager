import styles from './EventItem.module.scss';
import classNames from 'classnames/bind';
function EventItem({ data }) {
    const cx = classNames.bind(styles);
    console.log(data);
    return (
        <a target="_blank" href={`/events/${data._id}/`} className={cx('wrapper')}>
            <img className={cx('content-img')} src={data.coverImage} />
            <p className={cx('name')}>{data.eventName}</p>
            <p className={cx('time')}>{data.showtimes[0].startAt}</p>
            <p className={cx('type')}>{data.eventType}</p>
        </a>
    );
}

export default EventItem;
