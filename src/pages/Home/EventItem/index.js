import { format } from 'date-fns';
import styles from './EventItem.module.scss';
import classNames from 'classnames/bind';
import LazyLoad from 'react-lazy-load';
import { Spinner } from 'react-bootstrap';
function EventItem({ data }) {
    const cx = classNames.bind(styles);
    const time = data.showtimes[0]?.startAt || null;
    const startTime = format(new Date(time), 'dd/MM/yyyy');

    return (
        <a target="_blank" href={`/events/${data._id}/`} className={cx('wrapper')}>
            <LazyLoad
                once={true}
                placeholder={
                    <img
                        className={cx('content-img')}
                        src="https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-loading-icon-vector-transparent-png-image_5687537.png"
                    />
                }
            >
                <img alt="" className={cx('content-img')} src={data.coverImage} />
            </LazyLoad>

            <p className={cx('name')}>{data.eventName}</p>
            <p className={cx('time')}>{startTime}</p>
            <p className={cx('type')}>{data.eventType.join(' & ')}</p>
        </a>
    );
}

export default EventItem;
