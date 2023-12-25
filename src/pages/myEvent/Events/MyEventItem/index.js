import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './MyEventItem.module.scss';
import classNames from 'classnames/bind';
import {
    faBullhorn,
    faChartLine,
    faClockFour,
    faCopy,
    faEdit,
    faGift,
    faLocationDot,
    faPenToSquare,
    faUserGroup,
    faUsersRays,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import showtimeService from '../../../../apiServices/showtimeService';
import { useAuthContext } from '../../../../utils/authContext';
function MyEventItem({ data }) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const [showtime, setShowtime] = useState({});
    const authContext = useAuthContext();
    const userData = authContext.getUser();
    const moderators = data.moderators;
    const user = moderators.find((moderator) => moderator.user === userData._id);

    const listOptions = [
        {
            title: 'Summary',
            icon: <FontAwesomeIcon icon={faChartLine} />,
            path: `./${data._id}/summary?showId=${showtime._id} `,
            role: ['Owner', 'Admin', 'Moderator'],
        },
        {
            title: 'Manage RSVPs',
            icon: <FontAwesomeIcon icon={faUserGroup} />,
            path: `./${data._id}/RSVPs`,
            role: ['Owner', 'Admin'],
        },
        {
            title: 'Promote',
            icon: <FontAwesomeIcon icon={faBullhorn} />,
            path: `./${data._id}/promote`,
            role: ['Owner', 'Admin', 'Moderator', 'Check-in'],
        },
        {
            title: 'Discount',
            icon: <FontAwesomeIcon icon={faGift} />,
            path: `./${data._id}/discount`,
            role: ['Owner', 'Admin'],
        },
        {
            title: 'Edit',
            icon: <FontAwesomeIcon icon={faEdit} />,
            path: `./${data._id}/edit`,
            role: ['Owner', 'Admin'],
        },
    ];
    let countItems = 0;
    listOptions.forEach((option) => {
        if (option.role.includes(user.role)) countItems++;
    });
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
            <div className="d-flex align-items-start justify-content-between">
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
                {(user.role === 'Admin' || user.role === 'Owner') && (
                    <Link to={`./${data._id}/moderator`} target="_blank" className={cx('moderator-btn')}>
                        <FontAwesomeIcon size="xl" icon={faUsersRays} />
                    </Link>
                )}
            </div>

            <div className={cx('footer')}>
                <div className="d-flex">
                    {listOptions.map((option) => {
                        if (option.role.includes(user.role))
                            return (
                                <div style={{ width: `calc(100% / ${countItems} )` }} className={cx('option-item')}>
                                    <Link to={option.path} target="_blank" className={cx('option')}>
                                        {option.icon} {option.title}
                                    </Link>
                                </div>
                            );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MyEventItem;
