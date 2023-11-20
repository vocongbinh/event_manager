import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownButton from '../../components/layouts/components/DropdownButton';
import styles from './TypeEvent.module.scss';
import classNames from 'classnames/bind';
import { faLocation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import FilterItem from './FilterItem';
import FilterType from './FilterType';
import { createContext, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import eventService from '../../apiServices/eventService';
import EventItem from './EventItem';
import Tippy from '@tippyjs/react/headless';
import { useDebounce } from '../../hooks';
import SearchItem from '../../components/layouts/components/SearchLayout/SearchItem';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
function TypeEvent() {
    const cx = classNames.bind(styles);
    const listLocation = ['All locations', 'Ho Chi Minh', 'Ha Noi', 'Other locations'];
    const listPrices = ['All prices', 'Free', 'Paid'];
    const [events, setEvents] = useState([]);
    const [results, setResults] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const debounceValue = useDebounce(valueSearch, 500);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useQuery(
        'type-event',
        async () => {
            const eventData = await eventService.allEvents();
            console.log(eventData);
            setEvents(eventData);
        },
        {
            refetchOnWindowFocus: false,
            retry: false,
        },
    );
    const handlePriceChange = async (value) => {
        let newParams = {};
        if (searchParams.has('price')) {
            searchParams.delete('price');
        }
        searchParams.forEach((va, k) => (newParams[k] = va));
        if (value !== 'All prices') {
            newParams.price = value;
        }
        setSearchParams(newParams);
        const data = await eventService.filterEvent(newParams);
        setEvents(data);
    };
    const handleLocationChange = async (value) => {
        let newParams = {};
        if (searchParams.has('address')) {
            searchParams.delete('address');
        }
        searchParams.forEach((va, k) => (newParams[k] = va));
        if (value !== 'All locations') {
            newParams.address = value;
        }
        setSearchParams(newParams);
        const data = await eventService.filterEvent(newParams);
        setEvents(data);
    };
    useEffect(() => {
        if (!debounceValue.trim()) {
            setResults([]);
            return;
        }
        const fetchApi = async () => {
            const data = await eventService.searchEvent(debounceValue);
            setResults(data);
        };
        fetchApi();
    }, [debounceValue]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-layout')}>
                <div className={cx('header')}>
                    <img
                        alt=""
                        className={cx('logo')}
                        src={'https://bloganchoi.com/wp-content/uploads/2022/12/stt-hoang-hon-hay-tam-trang-2.jpg'}
                    />
                    <DropdownButton />
                </div>
                <div className={cx('search')}>
                    <p className={cx('search-title')}>Discover upcoming events</p>
                    <Tippy
                        visible
                        interactive
                        placement="bottom"
                        maxWidth="100%"
                        className={cx('test')}
                        render={(attrs) => (
                            <div className={cx('tippy-wrapper')} tab {...attrs}>
                                {results.length > 0 && (
                                    <div>
                                        {results.map((result) => (
                                            <SearchItem data={result} />
                                        ))}
                                        <a className={cx('see-all-btn')} href="/">
                                            See all results...
                                        </a>
                                    </div>
                                )}
                            </div>
                        )}
                    >
                        <div className={cx('search-layout')}>
                            <input
                                value={valueSearch}
                                onChange={(e) => {
                                    if (!e.target.value.startsWith(' ')) {
                                        setValueSearch(e.target.value);
                                    }
                                }}
                                placeholder="Search for events, shows, courses..."
                            />
                            <FontAwesomeIcon color="#ccc" size="2x" icon={faMagnifyingGlass} />
                        </div>
                    </Tippy>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('container-header')}>
                    <div className={cx('filter-layout')}>
                        <select onChange={(e) => handleLocationChange(e.target.value)}>
                            {listLocation.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                        <FilterItem setEvents={setEvents} />
                        <FilterType setEvents={setEvents} />
                        <select onChange={(e) => handlePriceChange(e.target.value)}>
                            {listPrices.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className={cx('event-layout')}>
                    <div className="container">
                        <div className="row">
                            {events.map((event) => {
                                return (
                                    <div className="col-4">
                                        <EventItem data={event} />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TypeEvent;
