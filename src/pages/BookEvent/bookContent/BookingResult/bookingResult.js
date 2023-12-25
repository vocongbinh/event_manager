import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../../components/layouts/components/Button';
import DropdownButton from '../../../../components/layouts/components/DropdownButton';
import styles from './BookingResult.module.scss';
import classNames from 'classnames/bind';
import {
    faAddressCard,
    faCalendar,
    faCaretDown,
    faCircleCheck,
    faEnvelope,
    faMinus,
    faPhone,
    faPlus,
    faRightFromBracket,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { getBookingResult } from '../../../../apiServices/bookingService';
import TicketItem from '../TicketItem/TicketItem';
import { format } from 'date-fns';
export const BookContext = createContext();
function BookingResult({ children, ...props }) {
    const cx = classNames.bind(styles);
    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [total, setTotal] = useState('');
    const [activeStep, setActiveStep] = useState(3);
    const [booking, setBooking] = useState({});
    const [paymentResult, setPaymentResult] = useState({});
    const [paymentStatus, setPaymentStatus] = useState('');
    const [tickets, setTickets] = useState([]);
    const [error, setError] = useState(false);
    const listSteps = [
        {
            title: 'Select Ticket',
        },
        {
            title: 'Payment info',
            to: './step2',
        },
        {
            title: 'Finish',
            to: './step3',
        },
    ];

    useEffect(() => {
        const paymentId = params.paymentId;
        console.log(paymentId);
        const fetch = async () => {
            try {
                console.log('fetch status');
                const bookingResult = await getBookingResult(paymentId);
                setBooking(bookingResult.booking);
                setTickets(bookingResult.tickets);
                setPaymentResult(bookingResult.payment);
                setPaymentStatus(bookingResult.paymentResult);
            } catch (err) {
                setError(true);
                console.log(err);
            }
        };
        if (paymentId) fetch();
    }, []);
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
                                <p className={cx('name')}>{!error ? 'Payment Successfully' : 'Payment Failed'}</p>
                                <p className={cx('address-time')}>
                                    {!error ? 'Detail ticket information' : 'Please try agained'}
                                </p>
                                <p className={cx('address-time')}></p>
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
                                                        {step.title}
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
                                                    {step.title}
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
                                    {tickets.map((ticket) => {
                                        const date = format(new Date(ticket.showTimeId.startAt), 'MMMM, dd yyyy');
                                        const addressData = ticket.showTimeId.eventId.stageId.addressId;
                                        const address = `${addressData.ward}, ${addressData.district}, ${addressData.province}`;
                                        return (
                                            <TicketItem
                                                image={ticket?.ticketTypeId?.ticketImage}
                                                type={ticket?.ticketTypeId?.ticketTypeName}
                                                customer={booking.receiverName}
                                                seat={ticket.seats}
                                                price={ticket.ticketTypeId.ticketTypePrice}
                                                date={date}
                                                discount={booking.discount}
                                                event={booking.showTime.eventId.eventName}
                                                address={address}
                                            />
                                        );
                                    })}
                                </div>
                                <div className="col-4">
                                    <div className={cx('booking-info')}>
                                        {
                                            <>
                                                <div className={cx('ticket-receiver')}>
                                                    <p className={cx('booking-header')}>Ticket Receiver</p>
                                                    <div className="container">
                                                        <div className={`row  ${cx('row-infor')}`}>
                                                            <div className="col-4">
                                                                <div className="row">
                                                                    <div className={cx('infor-layout')}>
                                                                        <FontAwesomeIcon icon={faUser} />
                                                                        <h5>Full Name</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-8 text-end">
                                                                <p>{booking.receiverName}</p>
                                                            </div>
                                                        </div>
                                                        <div className={`row  ${cx('row-infor')}`}>
                                                            <div className="col-4">
                                                                <div className="row">
                                                                    <div className={cx('infor-layout')}>
                                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                                        <h5>Email</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-8 text-end">
                                                                <p>{booking.receiverEmail}</p>
                                                            </div>
                                                        </div>
                                                        <div className={`row  ${cx('row-infor')}`}>
                                                            <div className="col-5">
                                                                <div className="row">
                                                                    <div className={cx('infor-layout')}>
                                                                        <FontAwesomeIcon icon={faPhone} />
                                                                        <h5>Phone number</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-7 text-end">
                                                                <p>{booking.receiverPhoneNumber}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={cx('payment-method')}>
                                                    <p className={cx('booking-header')}> Payment Method</p>
                                                    <div className="container">
                                                        <div className={`row ${cx('header-row')}`}>
                                                            <div className="col-12 p-0 ">
                                                                <h5>Zalopay</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }
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
                                                {/* {bookings.map((item) => {
                                                    const price = item.count * item.price;
                                                    let seats;
                                                    if (item.seats) {
                                                    }
                                                    total += price;
                                                    return item.count > 0 ? (
                                                        <div className={`row ${cx('book-item')}`}>
                                                            <div className="col-8 p-0 ">
                                                                <h5>{item.name}</h5>
                                                                <p>{nf.format(item.price)} VND</p>
                                                                {item.seats && (
                                                                    <div className="d-flex">
                                                                        {item.seats.map((seat, index) => (
                                                                            <div
                                                                                className={cx('seat-item')}
                                                                                key={index}
                                                                            >
                                                                                {seat}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="col-4 text-end p-0 ">
                                                                <h5>{nf.format(item.count)}</h5>
                                                                <p>{nf.format(price)} VND</p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div></div>
                                                    );
                                                })} */}
                                            </div>
                                        </div>

                                        <div className={`col-12 ${cx('total')}`}>
                                            <h5>total</h5>
                                            <h5>{booking.totalPrice} VND</h5>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <Button to="/" className={cx('next-btn')} size="max">
                                            Back
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
export default BookingResult;
