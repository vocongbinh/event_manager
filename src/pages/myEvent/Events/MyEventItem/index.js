import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MyEventItem.module.scss';
import classNames from 'classnames/bind';
import {
    faBullhorn,
    faChartLine,
    faClockFour,
    faCopy,
    faGift,
    faLocationDot,
    faPenToSquare,
    faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

function MyEventItem({ data }) {
    const cx = classNames.bind(styles);
    const listOptions = [
        { title: 'Summary', icon: <FontAwesomeIcon icon={faChartLine} /> },
        { title: 'Manage RSVPs', icon: <FontAwesomeIcon icon={faUserGroup} /> },
        { title: 'Promote', icon: <FontAwesomeIcon icon={faBullhorn} /> },
        { title: 'Discount', icon: <FontAwesomeIcon icon={faGift} /> },
        { title: 'Edit', icon: <FontAwesomeIcon icon={faPenToSquare} /> },
        { title: 'Replicate', icon: <FontAwesomeIcon icon={faCopy} /> },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <img src={data.coverImage} className={cx('event-img')} alt="" />
                <div className={cx('content')}>
                    <p className={cx('name-event')}>{data.eventName}</p>
                    <p className={cx('time-location')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                        {data.startTime}
                    </p>
                    <p className={cx('time-location')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                        {data.address}
                    </p>
                </div>
            </div>
            <table className={cx('footer')}>
                <tr>
                    {listOptions.map((option) => (
                        <td className={cx('option-item')}>
                            <div className={cx('option')}>
                                {option.icon} {option.title}
                            </div>
                        </td>
                    ))}
                </tr>
            </table>
        </div>
    );
}

export default MyEventItem;
