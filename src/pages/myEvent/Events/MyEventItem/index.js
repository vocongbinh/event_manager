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
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as showtimeService from '../../../../apiServices/showtimeService';
function MyEventItem({ data }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState({});
    const listOptions = [
        {
            title: 'Summary',
            icon: <FontAwesomeIcon icon={faChartLine} />,
            path: `./${data._id}/summary?showId=${showtime._id} `,
        },
        { title: 'Manage RSVPs', icon: <FontAwesomeIcon icon={faUserGroup} /> },
        { title: 'Promote', icon: <FontAwesomeIcon icon={faBullhorn} /> },
        {
            title: 'Discount',
            icon: <FontAwesomeIcon icon={faGift} />,
            path: `./${data._id}/discount/`,
        },
        { title: 'Edit', icon: <FontAwesomeIcon icon={faPenToSquare} /> },
        { title: 'Replicate', icon: <FontAwesomeIcon icon={faCopy} /> },
    ];

    const datetime = Date.parse(data.showtimes[0].startAt);
    let time = new Date(datetime);
    const hours = ('0' + time.getHours()).slice(-2);
    const minutes = ('0' + time.getMinutes()).slice(-2);
    const startTime = hours + ':' + minutes + ' ' + time.getDate() + '/' + time.getMonth() + '/' + time.getFullYear();
    useEffect(() => {
        const fetchApi = async () => {
            const showtimes = await showtimeService.getShowtimeOfEvent(data._id);
            setShowtime(showtimes[0]);
        };
        fetchApi();
    });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <img src={data.coverImage} className={cx('event-img')} alt="" />
                <div className={cx('content')}>
                    <p className={cx('name-event')}>{data.eventName}</p>
                    <p className={cx('time-location')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                        {startTime}
                    </p>
                    <p className={cx('time-location')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                        {data.stageId.stageName}
                    </p>
                </div>
            </div>
            <table className={cx('footer')}>
                <tr>
                    {listOptions.map((option) => (
                        <td className={cx('option-item')}>
                            <Link to={option.path} target="_blank" className={cx('option')}>
                                {option.icon} {option.title}
                            </Link>
                        </td>
                    ))}
                </tr>
            </table>
        </div>
    );
}

export default MyEventItem;
