import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../../components/layouts/components/Button';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalculator,
    faCalendar,
    faCaretDown,
    faLocation,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FilterItem.module.scss';
import { useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { createSearchParams, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import eventService from '../../../apiServices/eventService';

function FilterItem({ setEvents }) {
    const date = new Date();
    const startDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const endOfTodayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 0);
    const tomorrowStart = new Date(startDate);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);
    const tomorrowEnd = new Date(endOfTodayDate.getDate() + 1);
    const [startCustom, setStartCustom] = useState();
    const [endCustom, setEndCustom] = useState();
    const [searchParams, setSearchParams] = useSearchParams();
    const listDate = [
        {
            title: 'All dates',
        },
        {
            title: 'All upcoming dates',
            from: startDate,
            to: '',
        },
        {
            title: 'Today',
            from: startDate,
            to: endOfTodayDate,
        },
        {
            title: 'Tomorrow',
            from: tomorrowStart,
            to: tomorrowEnd,
        },
        {
            title: 'Custom date',
            from: startCustom,
            to: endCustom,
        },
    ];
    const [selected, setSelected] = useState(listDate[0]);
    const cx = classNames.bind(styles);
    const handleChangeTime = async ({ from, to }) => {
        let newParams = {};
        if (searchParams.has('start')) {
            searchParams.delete('start');
        }
        if (searchParams.has('end')) {
            searchParams.delete('end');
        }
        if (from) newParams.start = from;
        if (to) newParams.end = to;
        searchParams.forEach((va, k) => (newParams[k] = va));
        setSearchParams(newParams);
        const data = await eventService.filterEvent(newParams);
        setEvents(data);
    };
    return (
        <Dropdown className={cx('wrapper')}>
            <Dropdown.Toggle>
                <div className="d-flex align-items-center">
                    <div className={cx('icon')}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    {/* <PrevIcon className={cx('icon')} icon={faMagnifyingGlass} /> */}
                    <span>
                        {selected.title === 'Custom date' && startCustom && endCustom
                            ? `${format(startCustom, 'dd/MM/yyyy')} - ${format(endCustom, 'dd/MM/yyyy')}`
                            : selected.title}
                    </span>
                </div>

                <FontAwesomeIcon className={cx('icon', 'suf-Icon')} icon={faCaretDown} />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ width: '100%', fontSize: '1.4rem' }}>
                {listDate.map((item) => (
                    <Dropdown.Item
                        className={cx('item')}
                        onClick={(e) => {
                            if (item.title === 'Custom date') e.stopPropagation();
                            else {
                                handleChangeTime({ from: item.from, to: item.to });
                                setSelected(item);
                            }
                        }}
                    >
                        <div>
                            <span>{item.title}</span>
                            {item.title === 'Custom date' && (
                                <div className={cx('custom-date')}>
                                    <ReactDatePicker
                                        selected={startCustom}
                                        onChange={(date) => {
                                            setStartCustom(date);
                                            handleChangeTime({ from: date, to: endCustom });
                                        }}
                                    />
                                    <div style={{ height: 10 }} />
                                    <ReactDatePicker
                                        selected={endCustom}
                                        onChange={(date) => {
                                            setEndCustom(date);
                                            handleChangeTime({ from: startCustom, to: date });
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default FilterItem;
