import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DropdownButton from '../../../../components/layouts/components/DropdownButton';
import Image from '../../../../components/layouts/components/Image';
import styles from './SelectTicket.module.scss';
import classNames from 'classnames/bind';
import {
    faAddressCard,
    faCalendar,
    faCaretDown,
    faCircleCheck,
    faMinus,
    faPlus,
    faRightFromBracket,
    faTicket,
} from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import ticketService from '../../../../apiServices/ticketService';
import TicketTypeItem from '../../TicketTypeItem';
import { BookContext } from '../..';
function SelectTicket() {
    const cx = classNames.bind(styles);
    const params = useParams();
    const [tickets, setTickets] = useState([]);
    const books = useContext(BookContext);
    const nf = new Intl.NumberFormat();
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const data = await ticketService.getTicketOfShowtime(params.showtime_id);
                setTickets(data);
            } catch (error) {
                throw new Error(error.message);
            }
        };
        fetchAPI();
    }, []);

    return (
        <div className={cx('ticket-type-list')}>
            <div className={cx('type-header')}>
                <div className="row">
                    <div className="col-6">
                        <h5>ticket type</h5>
                    </div>
                    <div className="col-3  text-end">
                        <h5>unit price</h5>
                    </div>
                    <div className="col-3  text-end">
                        <h5>quantity</h5>
                    </div>
                </div>
            </div>
            {tickets.map((item) => {
                return (
                    <div className={`row ${cx('type-item')}`}>
                        <div className="col-6">
                            <h5>{item.ticketName}</h5>
                        </div>
                        <div className="col-3 text-end">
                            <h5>{nf.format(item.price)} VND</h5>
                        </div>
                        <div className="col-3 text-end">
                            <div className={cx('quantity-layout')}>
                                <TicketTypeItem item={item} />
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default SelectTicket;
