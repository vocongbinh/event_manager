import Dropdown from 'react-bootstrap/Dropdown';
import Button from '../../../components/layouts/components/Button';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalculator,
    faCalendar,
    faCaretDown,
    faCircleCheck,
    faClose,
    faLocation,
    faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './FilterType.module.scss';
import { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { format } from 'date-fns';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { useSearchParams } from 'react-router-dom';
import eventService from '../../../apiServices/eventService';
function FilterType({ setEvents, listChecked, setListChecked }) {
    // const [listChecked, setListChecked] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const listCategories = [
        {
            index: 1,
            title: 'Live music',
        },
        {
            index: 2,
            title: 'Theater Art',
        },
        {
            index: 3,
            title: 'Night life',
        },
        {
            index: 4,
            title: 'Community',
        },
        {
            index: 5,
            title: 'Course',
        },
        {
            index: 6,
            title: 'Attraction',
        },
        {
            index: 7,
            title: 'Sport',
        },
    ];
    const handleRemoveCategory = (item) => {
        let newList;
        if (listChecked.length === 1) {
            newList = ['All Categories'];
        } else newList = listChecked.filter((category) => category !== item);

        handleChangeTypes(newList);
        setListChecked(newList);
    };
    const handleChangeTypes = async (newList) => {
        let newParams = {};

        searchParams.forEach((va, k) => {
            newParams[k] = va;
        });
        if (!newList.includes('All Categories')) {
            newParams.types = newList;
        } else {
            newParams.types = [];
        }
        setSearchParams(newParams);
        const data = await eventService.filterEvent(newParams);
        setEvents(data);
    };
    const handleCheck = async (e) => {
        let newList;
        if (!e.target.checked) {
            if (listChecked.length === 1) {
                newList = ['All Categories'];
            } else newList = listChecked.filter((item) => item !== e.target.value);
        } else {
            newList = [...listChecked, e.target.value];
            newList = newList.filter((item) => item !== 'All Categories');
        }
        console.log(newList);
        handleChangeTypes(newList);
        setListChecked(newList);
    };
    const handleCheckAll = async () => {
        let newList = ['All Categories'];
        handleChangeTypes(newList);
        setListChecked(newList);
    };
    const cx = classNames.bind(styles);
    return (
        <div class={`dropdown ${cx('wrapper')}`}>
            <button
                class="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={(e) => {
                    console.log(1);
                    e.stopPropagation();
                }}
            >
                <div
                    onClick={(e) => {
                        console.log(1);
                        e.stopPropagation();
                    }}
                    className="d-flex align-items-center"
                    style={{ overflow: 'hidden' }}
                >
                    <div className={cx('icon')} style={{ marginRight: 5 }}>
                        <FontAwesomeIcon icon={faCalendar} />
                    </div>
                    <div style={{ overflowX: 'hidden', display: 'flex', flexDirection: 'row', flex: 1 }}>
                        {listChecked.map((item) => {
                            console.log(item);
                            return (
                                <button
                                    onClick={(e) => {
                                        console.log(2);

                                        e.stopPropagation();
                                    }}
                                    className={cx('btn-item')}
                                >
                                    <FontAwesomeIcon
                                        onClick={(e) => {
                                            console.log(3);
                                            //if (e.target !== e.currentTarget) {
                                            e.stopPropagation();
                                            //  }
                                            handleRemoveCategory(item);
                                        }}
                                        className={cx('close-btn')}
                                        color="#999"
                                        icon={faClose}
                                    />
                                    {item}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <FontAwesomeIcon className={cx('icon', 'suf-Icon')} icon={faCaretDown} />
            </button>
            <ul
                style={{ width: '100%', fontSize: '1.4rem' }}
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
            >
                <li className={cx('item')} style={{ borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
                    <div className="d-flex justify-content-between align-items-center">
                        <span>All Categories</span>
                        <input
                            onChange={() => handleCheckAll()}
                            checked={listChecked.includes('All Categories')}
                            type="checkbox"
                        />
                    </div>
                </li>
                {listCategories.map((item) => (
                    <li role="treeitem" aria-selected="false" className={cx('item')}>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>{item.title}</span>
                            <input
                                checked={listChecked.includes(item.title)}
                                onChange={(e) => handleCheck(e)}
                                value={item.title}
                                type="checkbox"
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
        // <Dropdown className={cx('wrapper')}>
        //     <Dropdown.Toggle>
        //         <div className="d-flex align-items-center">
        //             <div className={cx('icon')}>
        //                 <FontAwesomeIcon icon={faCalendar} />
        //             </div>
        //             {/* <PrevIcon className={cx('icon')} icon={faMagnifyingGlass} /> */}
        //         </div>

        //         <FontAwesomeIcon className={cx('icon', 'suf-Icon')} icon={faCaretDown} />
        //     </Dropdown.Toggle>

        //     <Dropdown.Menu style={{ width: '100%', fontSize: '1.4rem' }}>
        //         {listCategories.map((item) => (
        //             <Dropdown.Item aria-selected="false" className={cx('item')}>
        //                 <div>
        //                     <span>{item.title}</span>
        //                 </div>
        //             </Dropdown.Item>
        //         ))}
        //     </Dropdown.Menu>
        // </Dropdown>
    );
}

export default FilterType;
