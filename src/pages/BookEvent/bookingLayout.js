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
    faEnvelope,
    faMinus,
    faPhone,
    faPlus,
    faRightFromBracket,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Images from '../../assets/images';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { createContext, useEffect, useState } from 'react';
import { request } from '../../utils/request';
import * as ticketService from '../../apiServices/ticketService';
import TicketTypeItem from './TicketTypeItem';
import SelectTicket from './bookContent/SelectTicket/selectTicket';
import PaymentInfo from './bookContent/PaymentInfo/paymentInfo';
import { useQueries, useQuery } from '@tanstack/react-query';
import eventService from '../../apiServices/eventService';
import {
    useCreateNewBooking,
    useGetDiscountOfEvent,
    useHoldTickets,
    useHoldToken,
} from '../../lib/react-query/useQueryAndMutation';
import { createNewBooking } from '../../apiServices/bookingService';
import Home from '../Home';
import DisCountPicker from '../../components/layouts/components/DiscountPicker/DisCountPicker';
import DiscountApply from '../../components/layouts/components/DiscountPicker/DiscountApply/DiscountApply';
import { ToastContainer } from 'react-toastify';
import toastMessage from '../../utils/toast';

export const BookContext = createContext();
function BookEvent({ children, ...props }) {
    const cx = classNames.bind(styles);
    const params = useParams();
    const location = useLocation();
    const [bookings, setBookings] = useState([]);
    const [activeStep, setActiveStep] = useState(0);
    const [selectedTickets, setSelectedTickets] = useState('');
    const [showtime, setShowtime] = useState('');
    // state of payment infor
    const [firstName, setFirstName] = useState('');
    const [latstName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [reEmail, setReEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const [discounts, setDiscounts] = useState([]);
    const [event, setEvent] = useState();
    const [eventKey, setEventKey] = useState('');
    const [totalValue, setTotal] = useState(0);
    // const eventKey = 'af5019ac-f204-4ba5-97d8-c029e3a07f8b';
    const nf = new Intl.NumberFormat();
    const { data: holdToken, isPending: isCreatingHoldToken, refetch: refetchToken } = useHoldToken();
    // console.log(holdToken);
    useEffect(() => {
        refetchToken();
        console.log('ee' + refetchToken);
    }, [eventKey]);
    // const { refetch } = useQuery('book', async () => {
    //     const eventData = await eventService.detailEvent(params.id);
    //     setEvent(eventData);
    // });
    useQuery({
        queryKey: 'book',
        queryFn: async () => {
            const eventData = await eventService.detailEvent(params.id);
            setEvent(eventData);
        },
        enabled: event != null,
    });
    const { data: discountList } = useGetDiscountOfEvent(params.id);
    const selectDiscount = (index) => {
        const newDiscount = discounts.map((item, ind) => {
            return {
                ...item,
                isSelected: index == ind ? !item.isSelected : item.isSelected,
            };
        });
        console.log('dd');
        console.log(newDiscount);
        setDiscounts(newDiscount);
    };
    useEffect(() => {
        let totalValue = 0;
        bookings.map((item) => {
            const price = item.count * item.price;
            totalValue += price;
        });
        let newDiscounts;
        if (discounts.length == 0) {
            newDiscounts = discountList?.map((item) => {
                let disable = true;
                if (!item.isSelected) item.isSelected = false;
                let value = totalValue * item.percent;
                if (value > item?.maxAmount) {
                    value = item?.maxAmount;
                }
                if (totalValue > item.minOrderAmount) {
                    disable = false;
                }
                return {
                    ...item,
                    isDisable: disable,
                    value,
                };
            });
        } else
            newDiscounts = discounts.map((item) => {
                let disable = true;
                let value = totalValue * item.percent;
                if (value > item?.maxAmount) {
                    value = item?.maxAmount;
                }
                if (totalValue > item.minOrderAmount) {
                    disable = false;
                }
                if (disable == true) item.isSelected = false;
                return {
                    ...item,
                    isDisable: disable,
                    value,
                };
            });
        // setDiscounts(discounts);
        console.log('change discount list');
        console.log(newDiscounts);
        if (newDiscounts && newDiscounts.length > 0) setDiscounts(newDiscounts);
    }, [bookings]);

    const { mutateAsync: holdTickets } = useHoldTickets();
    let propsProvider = {};
    let total = 0;
    switch (props.index) {
        case 0:
            propsProvider = {
                bookings,
                setBookings,
                holdToken,
                selectedTickets,
                setSelectedTickets,
                refetchToken,
                eventKey,
                setEventKey,
                setShowtime,
                discounts,
            };
            break;

        case 1:
            propsProvider = {
                firstName,
                latstName,
                email,
                reEmail,
                phoneNumber,
                selectedTickets,
                isCreatingHoldToken,
                holdToken,
                setFirstName,
                setLastName,
                setEmail,
                setReEmail,
                setPhoneNumber,
                setSelectedTickets,
            };
            break;
        default:
            break;
    }
    useEffect(() => {
        setActiveStep(props.index);
    }, [props.index]);
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
    const listSteps = [
        {
            title: 'Select Ticket',
            component: <SelectTicket />,
        },
        {
            title: 'Payment info',
            component: <PaymentInfo />,
            to: './step2',
        },
        {
            title: 'finish',
            component: <Home />,
            to: './step3',
        },
    ];
    const listLayout = [<SelectTicket />, <PaymentInfo />];
    const nextHandler = async () => {
        console.log(activeStep);
        let checkBookings = bookings.filter((booking) => booking.seats.length === 0);
        if (activeStep < 1) {
            if (bookings.length !== checkBookings.length) {
                const value = activeStep + 2;

                navigate(location.pathname.split('/').slice(0, -1).join('/') + '/step' + value);
                holdTickets({ bookings, eventKey, holdToken });
                setActiveStep((prev) => prev + 1);
            } else {
                toastMessage({ type: 'error', title: 'PLease choose seats!' });
            }
        } else {
            console.log('do step 2' + showtime);
            // navigate(location.pathname.split('/').slice(0, -1).join('/') + '/step' + value);

            const receiverInformation = {
                receiverName: firstName + ' ' + latstName,
                receiverEmail: email,
                receiverPhoneNumber: phoneNumber,
            };
            console.log(receiverInformation);
            const res = await createNewBooking({
                tickets: bookings,
                discounts: discounts.filter((item) => item.isSelected && !item.isDisable),
                eventKey,
                holdToken,
                ...receiverInformation,
                showtime: showtime,
            });
            if (res?.payTickets?.data?.orderurl) {
                window.location.href = res.payTickets.data.orderurl;
            }
            console.log(res);
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
                                <p className={cx('name')}>{event && event.eventName}</p>
                                <p className={cx('address-time')}>{event && event.address}</p>
                                <p className={cx('address-time')}>{event && event.startTime}</p>
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
                                    <BookContext.Provider value={propsProvider}>{children}</BookContext.Provider>
                                </div>
                                <div className="col-4">
                                    <div className={cx('booking-info')}>
                                        {props.index === 1 && (
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
                                                                <p>
                                                                    {firstName} {latstName}
                                                                </p>
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
                                                                <p>{email}</p>
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
                                                                <p>{phoneNumber}</p>
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
                                        )}
                                        <div className={cx('booking-content')}>
                                            <p className={cx('booking-header')}>Booking information</p>
                                            <div className="container">
                                                <div className={`row ${cx('header-row')}`}>
                                                    <div className="col-8 p-0 ">
                                                        <h5>Ticket type</h5>
                                                    </div>
                                                    <div className="col-4 text-end p-0 ">
                                                        <h5>Quantity</h5>
                                                    </div>
                                                </div>
                                                {bookings.map((item) => {
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
                                                                    <div
                                                                        className="d-flex"
                                                                        style={{ flexWrap: 'wrap' }}
                                                                    >
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
                                                })}
                                            </div>
                                            <div className="container">
                                                <div className={`row ${cx('header-row')}`}>
                                                    <div className="col-8 p-0 ">
                                                        <h5>Discounts</h5>
                                                    </div>
                                                    <div className="col-4 text-end p-0 ">
                                                        <h5>Value</h5>
                                                    </div>
                                                </div>
                                                {discounts?.map((item) => {
                                                    // console.log(item);
                                                    if (item.isSelected && !item.isDisable) {
                                                        total -= item?.value;
                                                    }
                                                    return (
                                                        item.isSelected &&
                                                        !item.isDisable && (
                                                            <div className={`row ${cx('book-item')}`}>
                                                                <div className="col-8 p-0 ">
                                                                    <h5>{item.discountName}</h5>
                                                                </div>
                                                                <div className="col-4 text-end p-0 ">
                                                                    <p>{nf.format(item?.value)} VND</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className={`col-12 ${cx('total')}`}>
                                            <h5>Total</h5>
                                            <h5>{total.toLocaleString()} VND</h5>
                                        </div>
                                    </div>
                                    <div className={`col-12 ${cx('discount')}`}>
                                        <DisCountPicker discounts={discounts} selectDiscount={selectDiscount} />
                                    </div>
                                    {/* <div className={`col-12 ${cx('discount')}`}>
                                        <h5>Enter Discount Code</h5>
                                    </div> */}
                                    <button disable={bookings.length == 2}>didk</button>
                                    <div className="col-12">
                                        <Button
                                            disable={!bookings || bookings?.length}
                                            onClick={nextHandler}
                                            className={cx('next-btn')}
                                            size="max"
                                        >
                                            {props.index === 0 ? 'Next' : 'Submit'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}
export default BookEvent;
