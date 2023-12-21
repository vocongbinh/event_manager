import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './RSVPs.module.scss';
import classNames from 'classnames/bind';
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import eventService from '../../../../../apiServices/eventService';
import ticketService from '../../../../../apiServices/ticketService';
import { useParams } from 'react-router-dom';
import format from 'date-fns/format';
import { useSearchParams } from 'react-router-dom';
import Orders from './tabs/Orders';
import Tickets from './tabs/Tickets';
function ComponentRPVPs() {
    const cx = classNames.bind(styles);
    //set state
    const [event, setEvent] = useState(null);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [showId, setShowId] = useSearchParams();
    const params = useParams();
    const [stid, setStid] = useState();
    const [selectedTab, setSelectedTab] = useState(0);
    const tabContents = [
        {
            index: 0,
            title: 'Orders',
            component: <Orders showtimeId={stid} />,
        },
        {
            index: 1,
            title: 'Tickets',
            component: <Tickets showtimeId={stid} />,
        },
    ];
    let listShowtime = [];
    if (event != null) {
        listShowtime = event.showtimes.map((element) => {
            let timeShow = new Date(Date.parse(element.startAt));
            let startShowTime = format(timeShow, 'ccc dd/MM/yyyy HH:mm');
            return {
                ...element,
                startShowTime,
            };
        });
    }
    const showtimeId = showId.get('showId');
    useEffect(() => {
        const fetchApi = async () => {
            const eventData = await eventService.getEventById(params.id);
            setEvent(eventData);
            const typesData = await ticketService.getTicketOfShowtime(showtimeId);
            setTicketTypes(typesData);
        };
        fetchApi();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p>{event && event.eventName}</p>
                <span>
                    <FontAwesomeIcon icon={faLockOpen} /> Published
                </span>
            </div>
            <div className={cx('container')}>
                <div className={cx('time')}>
                    <div className={cx('time-select')}>
                        <span>Shows In</span>
                        <select
                            onChange={(e) => {
                                setStid(e.target.value);
                            }}
                            className={cx('selection')}
                        >
                            <option value="">--please select a date--</option>
                            {listShowtime.map((showtime) => (
                                <option value={showtime._id}>{showtime.startShowTime}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cx('content')}>
                    <div className={cx('tab-content')}>
                        {tabContents.map((tab, index) => (
                            <button
                                onClick={() => setSelectedTab(tab.index)}
                                key={index}
                                className={cx({
                                    active: tab.index === selectedTab,
                                })}
                            >
                                {tab.title}
                            </button>
                        ))}
                    </div>
                    <div className={cx('body-content')}>{tabContents[selectedTab].component}</div>
                </div>
            </div>
        </div>
    );
}

export default ComponentRPVPs;
