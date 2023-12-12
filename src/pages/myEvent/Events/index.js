import classNames from 'classnames/bind';
import styles from './Events.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCheck, faMagnifyingGlass, faPlus, faSortDown } from '@fortawesome/free-solid-svg-icons';
import eventService from '../../../apiServices/eventService';
import Button from '../../../components/layouts/components/Button';
import { useEffect, useState } from 'react';
import * as myService from '../../../apiServices/myService';
import MyEventItem from './MyEventItem';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../utils/authContext';
function Events() {
    const cx = classNames.bind(styles);

    const maxCountPage = 10;
    const [maxPageDisplay, setMaxPageDisplay] = useState(10);
    const [events, setEvents] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [typeSearch, setTypeSearch] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    let displayPage;
    //page navigation
    const navigate = useNavigate();
    const indexOfLastRecord = currentPage * maxPageDisplay;
    const indexOfFirstRecord = indexOfLastRecord - maxPageDisplay;
    const nPages = Math.ceil(events.length / maxPageDisplay);
    displayPage = events.slice(indexOfFirstRecord, indexOfLastRecord);
    const authContext = useAuthContext();
    const handleSetActive = (count) => {
        setCurrentPage(1);
        setMaxPageDisplay(count);
    };
    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };
    const handleNextPage = () => {
        if (currentPage < nPages) setCurrentPage((prev) => prev + 1);
    };
    const handleCreateEvent = () => {
        navigate('/newEvent');
    };
    useEffect(() => {
        const fetchApi = async () => {
            const events = await myService.allEvents(authContext.getUser()._id);
            console.log(events);
            setEvents(events);
        };
        fetchApi();
    }, []);

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            const result = await myService.searchEvents(searchValue, authContext.getUser()._id);
            setEvents(result);
        }
    };
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
                <Button
                    onClick={handleCreateEvent}
                    className={cx('create-btn')}
                    size="min"
                    preIcon={<FontAwesomeIcon icon={faPlus} />}
                >
                    Create event
                </Button>
            </div>
            <div className={cx('search-container')}>
                <div className={cx('search')}>
                    <div className={cx('search-layout')}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('search-icon')} />
                        <input
                            onKeyDown={handleKeyDown}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            type="text"
                            placeholder="Search event name"
                        />
                    </div>
                    <div onClick={() => setTypeSearch('past')} className={cx('number-layout', 'past', 'selected')}>
                        <div className={cx('number-block')}>{events.length}</div>
                        <p>past</p>
                    </div>
                </div>
            </div>
            <div className={cx('page-wrapper')}>
                <div className={cx('page-container')}>
                    <Button onClick={handlePrevPage} className={cx('change-page-btn')}>
                        Privious
                    </Button>
                    <p>
                        {currentPage}/{nPages}
                    </p>
                    <Button onClick={handleNextPage} className={cx('change-page-btn')}>
                        Next
                    </Button>
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
                            <h3>{maxPageDisplay}</h3>
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
                {displayPage.map((event) => (
                    <MyEventItem data={event} />
                ))}
            </div>
        </div>
    );
}

export default Events;
