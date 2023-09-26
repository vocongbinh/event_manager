import styles from './EventItem.module.scss';
import classNames from 'classnames/bind';
function EventItem({ data }) {
    const cx = classNames.bind(styles);
    return (
        <a className={cx('wrapper')}>
            <img className={cx('content-img')} src={data.image} />
            <p className={cx('name')}>{data.name}</p>
            <p className={cx('time')}>{data.time}</p>
            <p className={cx('type')}>{data.type}</p>
        </a>
    );
}

export default EventItem;
