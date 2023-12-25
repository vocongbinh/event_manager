import classNames from 'classnames/bind';
import styles from './CouponItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTicketSimple } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
function CouponItem({ data }) {
    const cx = classNames.bind(styles);
    const start = format(new Date(data.startAt), 'MMMM dd, yyyy');
    const end = format(new Date(data.endAt), 'MMMM dd, yyyy');
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div>
                    <div className="d-flex align-items-start">
                        <span style={{ fontSize: '5rem', fontWeight: 700 }}>{data.amount}</span>
                        <span style={{ fontSize: '1.8rem' }}>%</span>
                    </div>
                    <p>DISCOUNT</p>
                </div>

                <span style={{ textTransform: 'uppercase', fontSize: '2rem' }}>
                    {data.showtimeId.eventId.eventName}
                </span>
            </div>
            <div className={cx('footer')}>
                <span style={{ textTransform: 'uppercase' }}>
                    <FontAwesomeIcon icon={faTicketSimple} /> {data.code}
                </span>

                <div className={cx('time')}>
                    <span className={cx('time-item')}>
                        <span style={{ marginRight: 10 }}>From:</span>
                        <FontAwesomeIcon icon={faClock} /> {start}
                    </span>
                    <span className={cx('time-item')}>
                        <span style={{ marginRight: 10 }}>To:</span>
                        <FontAwesomeIcon icon={faClock} /> {end}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default CouponItem;
