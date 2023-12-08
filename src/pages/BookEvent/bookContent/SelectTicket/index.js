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
import { SeatsioDesigner, SeatsioSeatingChart } from '@seatsio/seatsio-react';

function SelectTicket() {
    const cx = classNames.bind(styles);
    const params = useParams();
    const [tickets, setTickets] = useState([]);
    const nf = new Intl.NumberFormat();

    //chart
    const bookContext = useContext(BookContext);
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const data = await ticketService.getTicketOfShowtime(params.showtime_id);
                setTickets(data);
                const initBookings = data.map((item) => {
                    return {
                        name: item.ticketName,
                        price: item.price,
                        count: 0,
                        seats: [],
                    };
                });
                bookContext.setBookings(initBookings);
            } catch (error) {
                throw new Error(error.message);
            }
        };
        fetchAPI();
    }, []);

    const selectedObjectHandler = (obj) => {
        bookContext.setBookings((prev) => {
            return prev.map((item) => {
                let count = item.count;
                let seats = item.seats;
                if (item.name === obj.category.label) {
                    count++;
                    seats = [...seats, obj.label];
                }
                return {
                    ...item,
                    count,
                    seats,
                };
            });
        });
    };

    const deselectedObjectHandler = (obj) => {
        bookContext.setBookings((prev) => {
            return prev.map((item) => {
                let count = item.count;
                let seats = item.seats;
                if (item.name === obj.category.label) {
                    count--;
                    seats = seats.filter((seat) => seat !== obj.label);
                }
                return {
                    ...item,
                    count: count,
                    seats,
                };
            });
        });
    };

    return (
        <div className={cx('ticket-type-list')}>
            <div
                id="chart"
                style={{
                    height: '500px',
                    width: '80%',
                    backgroundColor: 'transparent',
                }}
            >
                <SeatsioDesigner  secretKey="ce25e325-9589-4562-9c5c-08f64b152d6b" region="oc" />
                {/* <SeatsioSeatingChart
                    showSeatLabels="true"
                    showLegend="true"
                    colorScheme="dark"
                    workspaceKey="aaa94916-0f84-4ac4-9e5c-12bba4a16949"
                    event="b4eecd68-248b-4a5b-808c-1da15468515a"
                    region="oc"
                    pricing={tickets.map((item) => {
                        return { category: item.ticketName, price: item.price };
                    })}
                    priceFormatter={(price) => price + 'VND'}
                    onObjectSelected={(obj) => {
                        selectedObjectHandler(obj);
                    }}
                    onObjectDeselected={(obj) => {
                        deselectedObjectHandler(obj);
                    }}
                /> */}
                
            </div>
            {/* <div className={cx('type-header')}>
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
            })} */}
        </div>
    );
}

export default SelectTicket;
