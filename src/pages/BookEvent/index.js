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
import SelectTicket from './bookContent/SelectTicket';
import PaymentInfo from './bookContent/PaymentInfo';
import { useQueries, useQuery } from 'react-query';
import eventService from '../../apiServices/eventService';
export const BookContext = createContext();
function BookEvent({ children, ...props }) {
    const cx = classNames.bind(styles);
    const params = useParams();
    const location = useLocation();
    const [tickets, setTickets] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [activeStep, setActiveStep] = useState(0);

    // state of payment infor
    const [firstName, setFirstName] = useState('');
    const [latstName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [reEmail, setReEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate();
    const [event, setEvent] = useState();
    const nf = new Intl.NumberFormat();
    const {} = useQuery('book', async () => {
        const eventData = await eventService.detailEvent(params.id);
        setEvent(eventData);
    });
    let total = 0;
    let propsProvider = {};
    switch (props.index) {
        case 0:
            propsProvider = {
                bookings,
                setBookings,
            };
            break;

        case 1:
            propsProvider = {
                firstName,
                latstName,
                email,
                reEmail,
                phoneNumber,
                setFirstName,
                setLastName,
                setEmail,
                setReEmail,
                setPhoneNumber,
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
            component: <SelectTicket />,
            to: './step3',
        },
    ];
    const listLayout = [<SelectTicket />, <PaymentInfo />];
    const nextHandler = () => {
        if (activeStep < listSteps.length - 1) {
            const value = activeStep + 1;
            navigate(location.pathname.split('/').slice(0, -1).join('/') + '/step' + value);
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
                                <p className={cx('name')}>{event.eventName}</p>
                                <p className={cx('address-time')}>{event.address}</p>
                                <p className={cx('address-time')}>{event.startTime}</p>
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
                                            {props.index === 0 ? 'Next' : 'Submit'}
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
