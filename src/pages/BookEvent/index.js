import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/layouts/components/Button';
import DropdownButton from '../../components/layouts/components/DropdownButton';
import Image from '../../components/layouts/components/Image';
import styles from './BookEvent.module.scss';
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
import Images from '../../assets/images';
import { useParams } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { request } from '../../utils/request';
import * as ticketService from '../../apiServices/ticketService';
import TicketTypeItem from './TicketTypeItem';
import SelectTicket from './bookContent/SelectTicket';
import PaymentInfo from './bookContent/PaymentInfo';
export const BookContext = createContext();
function BookEvent() {
    const cx = classNames.bind(styles);
    const params = useParams();
    const [tickets, setTickets] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    const nf = new Intl.NumberFormat();
    let total = 0;

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
    const listItems = [
        {
            title: 'My Tickets',
            icon: <FontAwesomeIcon icon={faTicket} />,
            href: '/',
        },
        {
            title: 'My Events',
            icon: <FontAwesomeIcon icon={faCalendar} />,
            href: '/',
        },
        {
            title: 'My Profile',
            icon: <FontAwesomeIcon icon={faAddressCard} />,
            href: '/',
        },
        {
            title: 'Log out',
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            href: '/',
        },
    ];
    const listSteps = ['Select Ticket', 'Payment info', 'finish'];
    const nextHandler = () => {
        if (activeStep < listSteps.length - 1) {
            setActiveStep((prev) => prev + 1);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('nav')}>
                    <img
                        className={cx('logo')}
                        src={'https://bloganchoi.com/wp-content/uploads/2022/12/stt-hoang-hon-hay-tam-trang-2.jpg'}
                    />
                    <DropdownButton />
                </div>
                <div className="container-xl">
                    <div className="col-xs-12">
                        <div className="row w-100">
                            <div className={`col-8 ${cx('infor-event')}`}>
                                <p className={cx('name')}>[FLOWER 1969’s] SOAP WORKSHOP - HỌC LÀM XÀ PHÒNG</p>
                                <p className={cx('address-time')}>
                                    Flower 1969’s - The Seat Cafe - 491/2 Lê Văn Sỹ, Phường 12, Quận 3, TP.HCM
                                </p>
                                <p className={cx('address-time')}>Saturday, 14 October 2023, 2:00 PM+0700</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={cx('content')}>
                <div className={cx('steps')}>
                    <table className={`container`}>
                        <tr>
                            {listSteps.map((step, index) => {
                                if (index < listSteps.length - 1)
                                    return (
                                        <>
                                            <td className="col-3">
                                                <div className="d-flex align-items-center justify-content-center">
                                                    <FontAwesomeIcon
                                                        className={cx('step-icon', {
                                                            checked: activeStep > index,
                                                        })}
                                                        size="xl"
                                                        icon={faCircleCheck}
                                                    />
                                                    <h5
                                                        className={cx({
                                                            active: activeStep >= index,
                                                        })}
                                                    >
                                                        {step}
                                                    </h5>
                                                </div>
                                            </td>
                                            <td>
                                                <img
                                                    className={cx('gutter-step')}
                                                    src="https://static.tkbcdn.com/site/global/content-v2/img/icon-step.svg"
                                                />
                                            </td>
                                        </>
                                    );
                                else
                                    return (
                                        <td className="col-3">
                                            <div className="d-flex align-items-center justify-content-center">
                                                <FontAwesomeIcon
                                                    className={cx('step-icon', {
                                                        checked: activeStep > index,
                                                    })}
                                                    size="xl"
                                                    icon={faCircleCheck}
                                                />
                                                <h5
                                                    className={cx({
                                                        active: activeStep >= index,
                                                    })}
                                                >
                                                    {step}
                                                </h5>
                                            </div>
                                        </td>
                                    );
                            })}
                        </tr>
                    </table>
                </div>
                <div className={cx('ticket-info')}>
                    <div className={cx('ticket-wrapper')}>
                        <div className="container">
                            <div className="row">
                                <div className="col-8">
                                    <BookContext.Provider value={{ bookings, setBookings }}>
                                        <PaymentInfo />
                                    </BookContext.Provider>
                                </div>
                                <div className="col-4">
                                    <div className={cx('booking-info')}>
                                        <div className={cx('booking-content')}>
                                            <p className={cx('booking-header')}>Booking information</p>
                                            <div className="container">
                                                <div className={`row ${cx('header-row')}`}>
                                                    <div className="col-8 p-0 ">
                                                        <h5>Ticket type</h5>
                                                    </div>
                                                    <div className="col-4 text-end p-0 ">
                                                        <h5>quantity</h5>
                                                    </div>
                                                </div>
                                                {bookings.map((item) => {
                                                    const price = item.count * item.price;

                                                    total += price;
                                                    return (
                                                        <div className={`row ${cx('book-item')}`}>
                                                            <div className="col-8 p-0 ">
                                                                <h5>{item.name}</h5>
                                                                <p>{nf.format(item.price)} VND</p>
                                                            </div>
                                                            <div className="col-4 text-end p-0 ">
                                                                <h5>{nf.format(item.count)}</h5>
                                                                <p>{nf.format(price)} VND</p>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <div className={`col-12 ${cx('total')}`}>
                                            <h5>total</h5>
                                            <h5>{total.toLocaleString()} VND</h5>
                                        </div>
                                    </div>
                                    <div className={`col-12 ${cx('discount')}`}>
                                        <h5>Enter Discount Code</h5>
                                    </div>
                                    <div className="col-12">
                                        <Button onClick={nextHandler} className={cx('next-btn')} size="max">
                                            Next
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BookEvent;
