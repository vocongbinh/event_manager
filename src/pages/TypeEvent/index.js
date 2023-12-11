import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownButton from '../../components/layouts/components/DropdownButton';
import styles from './TypeEvent.module.scss';
import classNames from 'classnames/bind';
import { faLocation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import FilterItem from './FilterItem';
import FilterType from './FilterType';
import { createContext, createRef, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import eventService from '../../apiServices/eventService';
import EventItem from './EventItem';
import Tippy from '@tippyjs/react/headless';
import { useDebounce } from '../../hooks';
import SearchItem from '../../components/layouts/components/SearchLayout/SearchItem';
import { Link, createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { keyboard } from '@testing-library/user-event/dist/keyboard';
function TypeEvent() {
    const cx = classNames.bind(styles);
    const listLocation = ['All locations', 'Ho Chi Minh', 'Ha Noi', 'Other locations'];
    const searchRef = createRef();
    const [searchFocus, setSearchFocus] = useState(false);
    const [tippyHide, setTippyHide] = useState(false);
    const listPrices = ['All prices', 'Free', 'Paid'];
    const [events, setEvents] = useState([]);
    const [results, setResults] = useState([]);
    const [location, setLocation] = useState();
    const [listChecked, setListChecked] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
    const debounceValue = useDebounce(valueSearch, 500);
    const [searchParams, setSearchParams] = useSearchParams();
    const { data } = useQuery({
        queryKey: ['type-event'],
        queryFn: async () => {
            let params = {};
            searchParams.forEach((va, k) => (params[k] = va));
            if (params.address) {
                setLocation(params.address);
            }
            if (params.types) {
                setListChecked([params.types]);
            } else {
                setListChecked(['All Categories']);
            }
            if (params.query) {
                setValueSearch(params.query);
            }

            const eventData = await eventService.filterEvent(params);
            console.log(eventData);
            setEvents(eventData);
        },
        refetchOnWindowFocus: false,
        retry: false,
    });
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
        setLocation(value);
        setSearchFocus(false);
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
    const handleSearchInputChange = async (value) => {
        let newParams = {};
        if (searchParams.has('query')) {
            searchParams.delete('query');
        }
        searchParams.forEach((va, k) => (newParams[k] = va));
        if (value !== '') {
            newParams.query = value;
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
        if (searchFocus) fetchApi();
    }, [debounceValue]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-layout')}>
                <div className={cx('header')}>
                    <Link to="/">
                        <img
                            alt=""
                            className={cx('logo')}
                            src={'https://bloganchoi.com/wp-content/uploads/2022/12/stt-hoang-hon-hay-tam-trang-2.jpg'}
                        />
                    </Link>
                    <DropdownButton />
                </div>
                <div className={cx('search')}>
                    <p className={cx('search-title')}>Discover upcoming events</p>
                    <Tippy
                        visible={!tippyHide && valueSearch.length > 0}
                        interactive
                        onClickOutside={(ins) => {
                            setTippyHide(true);
                            ins.hide();
                        }}
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
                                    </div>
                                )}
                            </div>
                        )}
                    >
                        <div className={cx('search-layout')}>
                            <input
                                ref={searchRef}
                                value={valueSearch}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSearchInputChange(valueSearch);
                                        searchRef.current.blur();
                                    }
                                }}
                                onChange={(e) => {
                                    if (!searchFocus) setSearchFocus(true);
                                    if (!e.target.value.startsWith(' ')) {
                                        setValueSearch(e.target.value);
                                        setTippyHide(false);
                                    }
                                }}
                                placeholder="Search for events, shows, courses..."
                            />
                            <FontAwesomeIcon
                                onClick={() => {
                                    handleSearchInputChange(valueSearch);
                                    searchRef.current.blur();
                                }}
                                color="#ccc"
                                size="2x"
                                icon={faMagnifyingGlass}
                            />
                        </div>
                    </Tippy>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('container-header')}>
                    <div className={cx('filter-layout')}>
                        <select value={location} onChange={(e) => handleLocationChange(e.target.value)}>
                            {listLocation.map((item) => (
                                <option value={item}>{item}</option>
                            ))}
                        </select>
                        <FilterItem setEvents={setEvents} />
                        <FilterType setEvents={setEvents} listChecked={listChecked} setListChecked={setListChecked} />
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
