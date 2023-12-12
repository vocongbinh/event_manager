import { format } from 'date-fns';
import styles from './SearchItem.module.scss';
import classNames from 'classnames/bind';
function SearchItem({ data }) {
    const cx = classNames.bind(styles);
    console.log(data);
    const time = data.showtimes[0]?.startAt || null;
    const startTime = format(new Date(time), 'dd/MM/yyyy');
    return (
        <div className={cx('wrapper')}>
            <a target="_blank" href={`/events/${data._id}`}>
                <p className={cx('name')}>{data.eventName}</p>
                <p className={cx('time-location')}>
                    {data.address.province}
                    <span>-</span>
                    {startTime}
                </p>
            </a>
        </div>
    );
}

export default SearchItem;
