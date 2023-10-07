import styles from './SearchItem.module.scss';
import classNames from 'classnames/bind';
function SearchItem({ data }) {
    const cx = classNames.bind(styles);
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <a target="_blank" href={`/events/${data._id}`}>
                <p className={cx('name')}>{data.eventName}</p>
                <p className={cx('time-location')}>
                    {data.stage}
                    <span>-</span>
                    {data.startTime}
                </p>
            </a>
        </div>
    );
}

export default SearchItem;
