import classNames from 'classnames/bind';
import styles from './Events.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck, faMagnifyingGlass, faPlus, faSortDown } from '@fortawesome/free-solid-svg-icons';

import Button from '../../../components/layouts/components/Button';
import { useEffect, useState } from 'react';
import * as myService from '../../../apiServices/myService';
import MyEventItem from './MyEventItem';
function Events() {
    const cx = classNames.bind(styles);
    const [countPage, setCountPage] = useState(1);
    const maxCountPage = 2;
    const [maxPageDisplay, setMaxPageDisplay] = useState(null);
    const [events, setEvents] = useState([]);
    const handleSetActive = (count) => {
        setMaxPageDisplay(count);
    };
    useEffect(() => {
        const fetchApi = async () => {
            const events = await myService.allEvents();
            console.log(events);
            setEvents(events);
        };
        fetchApi();
    }, []);
    const displayPages = [
        {
            value: 10,
            handleActive: () => handleSetActive(10),
            className: cx({ active: maxPageDisplay === 10 }),
        },
        {
            value: 20,
            handleActive: () => handleSetActive(20),
            className: cx({ active: maxPageDisplay === 20 }),
        },
        {
            value: 50,
            handleActive: () => handleSetActive(50),
            className: cx({ active: maxPageDisplay === 50 }),
        },
        {
            value: 100,
            handleActive: () => handleSetActive(100),
            className: cx({ active: maxPageDisplay === 100 }),
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-container')}>
                <h3>Events you manage</h3>
                <Button className={cx('create-btn')} size="min" preIcon={<FontAwesomeIcon icon={faPlus} />}>
                    Create event
                </Button>
            </div>
            <div className={cx('search-container')}>
                <div className={cx('search')}>
                    <div className={cx('search-layout')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                        <input type="text" placeholder="Search event name" />
                    </div>
                    <div className={cx('number-layout', 'past')}>
                        <div className={cx('number-block')}>3</div>
                        <p>past</p>
                    </div>
                    <div className={cx('number-layout', 'draft')}>
                        <div className={cx('number-block')}>11</div>
                        <p>draft</p>
                    </div>
                </div>
            </div>
            <div className={cx('page-wrapper')}>
                <div className={cx('page-container')}>
                    <Button className={cx('change-page-btn')}>Privious</Button>
                    <p>
                        {countPage}/{maxCountPage}
                    </p>
                    <Button className={cx('change-page-btn')}>Next</Button>
                </div>
                <div className={cx('per-page')}>
                    <h3>Display per page</h3>
                    <div class="dropdown">
                        <button
                            className={`btn dropdown-toggle ${cx('page-btn')}`}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <h3>20</h3>
                            <span mar>
                                <FontAwesomeIcon icon={faSortDown} />
                            </span>
                        </button>
                        <ul className={`dropdown-menu ${cx('dropdown-menu')}`} aria-labelledby="dropdownMenuButton1">
                            {displayPages.map((item) => (
                                <li onClick={item.handleActive} className={`dropdown-item ${item.className}`}>
                                    {item.value}
                                    <FontAwesomeIcon icon={faCheck} className={cx('checked')} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className={cx('list-event')}>
                {events.map((event) => (
                    <MyEventItem data={event} />
                ))}
            </div>
        </div>
    );
}

export default Events;
