import { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './Orders.styles.module.scss';
import classNames from 'classnames/bind';
import { useQuery } from '@tanstack/react-query';
import ticketService from '../../../../../../../apiServices/ticketService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMagnifyingGlass, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
function Orders({ showtimeId }) {
    const cx = classNames.bind(styles);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('All');
    const [selectedSort, setSelectedSort] = useState('Newest');
    const [listOrder, setListOrder] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const listTypeSorts = ['Newest', 'Oldest'];
    const { refetch } = useQuery({
        queryKey: ['orders', showtimeId],
        queryFn: async () => {
            if (showtimeId !== '' && showtimeId !== undefined) {
                const typesData = await ticketService.getTicketOfShowtime(showtimeId);
                console.log(typesData);
                let types = ['All'];
                typesData.map((type) => types.push(type.ticketName));
                setTicketTypes(types);
            } else {
                setTicketTypes(['All']);
            }
        },
    });
    // const { refetch } = useQuery(['orders', showtimeId], async () => {
    //     const typesData = await ticketService.getTicketOfShowtime(showtimeId);
    //     let types = ['All'];
    //     typesData.map((type) => types.push(type.ticketName));
    //     setTicketTypes(types);
    // });
    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (showtimeId) {
                    const orderData = await ticketService.filterTicket(showtimeId, { type: 'All', sort: 'Newest' });
                    console.log(orderData);
                    setListOrder(orderData);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi();
    }, [showtimeId]);
    const filterTypeHandler = async (item) => {
        refetch();
        setSelectedType(item);
        if (showtimeId) {
            let newParams = {};
            if (searchParams.has('type')) {
                searchParams.delete('type');
            }
            newParams.type = item;
            searchParams.forEach((va, k) => (newParams[k] = va));
            setSearchParams(newParams);
            const infor = await ticketService.filterTicket(showtimeId, { type: item, sort: selectedSort });
            setListOrder(infor);
        }
    };
    const sortHandler = async (item) => {
        refetch();
        setSelectedSort(item);
        if (showtimeId) {
            let newParams = {};
            if (searchParams.has('sort')) {
                searchParams.delete('sort');
            }
            newParams.sort = item;
            searchParams.forEach((va, k) => (newParams[k] = va));
            setSearchParams(newParams);
            const infor = await ticketService.filterTicket(showtimeId, { type: selectedType, sort: item });
            setListOrder(infor);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className="d-flex">
                    <div class="dropdown">
                        <button
                            className={`btn dropdown-toggle ${cx('type-btn')}`}
                            type="button"
                            id="dropdownMenuButton1"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <h3>{selectedType}</h3>
                            <span>
                                <FontAwesomeIcon icon={faSortDown} />
                            </span>
                        </button>
                        <ul className={`dropdown-menu ${cx('dropdown-menu')}`} aria-labelledby="dropdownMenuButton1">
                            {ticketTypes.map((item) => (
                                <li
                                    onClick={() => filterTypeHandler(item)}
                                    className={`dropdown-item ${cx({
                                        typeActive: selectedType === item,
                                    })}`}
                                >
                                    {item}
                                    <FontAwesomeIcon icon={faCheck} className={cx('type-checked')} />
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div style={{ marginLeft: 10 }} class="dropdown">
                        <button
                            className={`btn dropdown-toggle ${cx('type-btn')}`}
                            type="button"
                            id="dropdownMenuButton2"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <h3>{selectedSort}</h3>
                            <span>
                                <FontAwesomeIcon icon={faSortDown} />
                            </span>
                        </button>
                        <ul className={`dropdown-menu ${cx('dropdown-menu')}`} aria-labelledby="dropdownMenuButton2">
                            {listTypeSorts.map((item) => (
                                <li
                                    onClick={() => {
                                        sortHandler(item);
                                    }}
                                    className={`dropdown-item ${cx({
                                        sortActive: selectedSort === item,
                                    })}`}
                                >
                                    {item}
                                    <FontAwesomeIcon icon={faCheck} className={cx('type-checked')} />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className={cx('search-layout')}>
                    <input placeholder="Name/Email" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </div>
            </div>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th style={{ textAlign: 'center' }}>Count</th>
                        <th style={{ textAlign: 'right' }}>Total Price</th>
                    </tr>
                </thead>

                {listOrder.map((item, index) => {
                    return (
                        <tr>
                            <td>
                                <div className={cx('user-item')}>
                                    <span>{item.user.username}</span>
                                    <span>{item.user.email}</span>
                                    <span>{item.user.phoneNumber}</span>
                                </div>
                            </td>
                            <td style={{ textAlign: 'center' }}>{item.countTicket}</td>
                            <td style={{ textAlign: 'right', fontWeight: 600 }}>{item.totalPrice} VND</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}

export default Orders;
