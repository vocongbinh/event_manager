import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Discount.module.scss';
import classNames from 'classnames/bind';
import { faCirclePlus, faLockOpen, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import * as eventService from '../../../../../apiServices/eventService';
import * as ticketService from '../../../../../apiServices/ticketService';
import { useLocation, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import Button from '../../../../../components/layouts/components/Button';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CheckboxItem from './CheckboxItem';
import ReactDatePicker from 'react-datepicker';
import * as discountService from '../../../../../apiServices/discountService';
import { useQuery } from 'react-query';
function Discount() {
    const cx = classNames.bind(styles);
    //set state
    const [event, setEvents] = useState(null);
    const [show, setShow] = useState(false);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [discount, setDiscount] = useState({});
    const [showId, setShowId] = useSearchParams();
    const [checkedAll, setCheckedAll] = useState(false);
    const [countCheck, setCountCheck] = useState(0);
    const [listCheck, setListCheck] = useState([]);
    const [listTypeOfDiscount, setListTypeOfDiscount] = useState([]);
    const [quantityAll, setQuantityAll] = useState(0);
    const params = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [stid, setStid] = useState();
    const [formValue, setFormValue] = useState({
        code: '',
        amount: '',
        quantity: '',
        timeStart: '12:00 AM',
        timeEnd: '12:00 AM',
    });
    let dateStart, dateEnd;
    const [errors, setErrors] = useState({});
    const [type, setType] = useState('create');
    //form
    const validation = () => {
        let error = {};
        if (formValue.code.length < 5) {
            error.code = 'Discount code must have at least 5 characters';
        }
        if (formValue.amount === '') {
            error.amount = 'Please set the discount amount';
        }
        if (dateStart >= dateEnd) {
            error.date = 'End date must be after start date ';
        }
        if (formValue.quantity === '') {
            error.quantity = 'Please set the discount quantity';
        }
        return error;
    };
    //set time picker
    let countHour = 12;
    let countMinute = -15;
    let aa = 'AM';
    let listTimePicker = [];
    while (listTimePicker.length < 96) {
        countMinute += 15;
        if (countMinute >= 60) {
            if (countHour < 12) {
                if (countHour === 11) {
                    aa = 'PM';
                }
                countHour++;
            } else {
                countHour = 1;
            }
            countMinute = 0;
        }
        const hour = ('0' + countHour).slice(-2);
        const minute = ('0' + countMinute).slice(-2);
        listTimePicker.push({
            hour: countHour,
            minute: countMinute,
            aa,
            display: `${hour}:${minute} ${aa}`,
        });
    }

    let listShowtime = [];
    if (event != null) {
        listShowtime = event.showtimes.map((element) => {
            let timeShow = new Date(Date.parse(element.startAt));
            let startShowTime = format(timeShow, 'ccc dd/MM/yyyy HH:mm');
            return {
                ...element,
                startShowTime,
            };
        });
    }
    const showtimeId = showId.get('showId');
    const { isLoading, isError, data, refetch } = useQuery(['discounts', stid], async () => {
        if (stid !== undefined) {
            const discountData = await discountService.getAll(stid);
            setDiscounts(discountData);
        }
    });

    useEffect(() => {
        const fetchApi = async () => {
            const events = await eventService.getEventById(params.id);
            setEvents(events[0]);
            const typesData = await ticketService.getTicketOfShowtime(showtimeId);
            setTicketTypes(typesData);
            setListTypeOfDiscount(
                typesData.map((item) => {
                    return {
                        _id: item._id,
                        quantity: item.quantity,
                        ticketName: item.ticketName,
                    };
                }),
            );
        };
        fetchApi();
    }, []);
    const handleEdit = async (id) => {
        setShow(true);
        const data = await discountService.getById(id);
        setDiscount(data);
        setStartDate(new Date(data.startAt));
        setEndDate(new Date(data.endAt));
        setFormValue({
            code: data.code,
            amount: data.amount,
            quantity: data.quantity,
            timeStart: format(new Date(data.startAt), 'HH:mm aa'),
            timeEnd: format(new Date(data.endAt), 'HH:mm aa'),
        });
        setType('update');
    };
    const handleCreate = () => {
        setType('create');
        setShow(true);
        setFormValue({ code: '', amount: '', quantity: '', timeStart: '12:00 AM', timeEnd: '12:00 AM' });
        setStartDate(null);
        setEndDate(null);
    };
    const handleClose = () => {
        setShow(false);
    };
    const handleSave = async () => {
        const start = listTimePicker.find((item) => item.display === formValue.timeStart);
        const end = listTimePicker.find((item) => item.display === formValue.timeEnd);
        let hourStart;
        let hourEnd;
        if (start.aa === 'AM' && start.hour < 12) {
            hourStart = start.hour;
        } else hourStart = start.hour + 12;
        if (end.aa === 'AM' && end.hour < 12) {
            hourEnd = end.hour;
        } else hourEnd = end.hour + 12;
        dateStart = new Date(
            startDate.getFullYear(),
            startDate.getMonth(),
            startDate.getDate(),
            hourStart,
            start.minute,
            0,
        );
        dateEnd = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate(), hourEnd, end.minute, 0);

        const data = {
            code: formValue.code,
            amount: Number.parseInt(formValue.amount),
            quantity: Number.parseInt(formValue.quantity),
            startAt: dateStart,
            endAt: dateEnd,
            showtimeId: stid,
        };
        const errs = validation();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            console.log(type);
            if (type === 'create') {
                console.log('create');
                await discountService.create(data).then((res) => console.log(res));
            } else {
                console.log('update');
                await discountService.updateDiscount(discount._id, data);
            }
            refetch();
            setShow(false);
        }
    };
    const handleDeleteDiscount = async (id) => {
        if (window.confirm('Do you really want to delete this discount code?')) {
            try {
                await discountService.deleteDiscount(id);
                refetch();
            } catch (e) {
                console.log(e);
            }
        }
    };
    const handleCheck = (e) => {
        const { id, checked } = e.target;
        if (!checked) {
            setListCheck(listCheck.filter((item) => item !== id));
            setCheckedAll(false);
        } else setListCheck([...listCheck, id]);
    };
    const handleCheckAll = (e) => {
        setCheckedAll(!checkedAll);
        if (!checkedAll) {
            setListCheck(ticketTypes.map((item) => item._id));
        } else setListCheck([]);
    };

    //form
    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <p>{event && event.eventName}</p>
                <span>
                    <FontAwesomeIcon icon={faLockOpen} /> Published
                </span>
            </div>
            <div className={cx('container')}>
                <div className={cx('time')}>
                    <p>Manage discount codes</p>
                    <div className={cx('time-select')}>
                        <span>Shows In</span>
                        <select
                            onChange={(e) => {
                                setStid(e.target.value);
                            }}
                            className={cx('selection')}
                        >
                            <option>--please select a date--</option>
                            {listShowtime.map((showtime) => (
                                <option value={showtime._id}>{showtime.startShowTime}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {discounts.length > 0 && (
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>discount code</th>
                                <th>amount</th>
                                <th>start</th>
                                <th>end</th>
                                <th>orders used</th>
                                <th>status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((item) => (
                                <tr>
                                    <td>{item.code}</td>
                                    <td>{item.amount}%</td>
                                    <td>{format(new Date(item.startAt), 'dd/MM/yyyy HH:mm aa')}</td>
                                    <td>{format(new Date(item.endAt), 'dd/MM/yyyy HH:mm aa')}</td>
                                    <td>{item.used}</td>
                                    <th>pending</th>
                                    <th>
                                        <FontAwesomeIcon
                                            onClick={() => {
                                                handleEdit(item._id);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                            icon={faPenToSquare}
                                        />
                                        <FontAwesomeIcon
                                            onClick={() => handleDeleteDiscount(item._id)}
                                            style={{ marginLeft: '10px', cursor: 'pointer' }}
                                            icon={faTrash}
                                        />
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {stid && (
                    <Button
                        onClick={handleCreate}
                        className={cx('create-btn')}
                        size="max"
                        sufIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                    >
                        create New Discount Code
                    </Button>
                )}

                <Modal
                    dialogClassName={cx('modal')}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={show}
                    onHide={handleClose}
                >
                    <Modal.Header className={cx('modal-header')} closeButton>
                        <Modal.Title className={cx('title')}>Create New Discount Code</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className={cx('body')}>
                        <div className={cx('code-layout')}>
                            <input
                                name="code"
                                value={formValue.code}
                                onChange={handleChange}
                                placeholder="DISCOUNT CODE"
                            />
                            {errors.code && <div className={cx('error')}>{errors.code}</div>}

                            <span>Only alphanumeric characters allowed (A-Z and 0-9)</span>
                        </div>
                        <div className={cx('body-layout', 'amount')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Discount amount</span>
                                </div>
                                <div className="col-8">
                                    <input name="amount" value={formValue.amount} onChange={handleChange} />
                                    <span>% of ticket sale</span>
                                </div>
                            </div>
                            {errors.amount && <div className={cx('error')}>{errors.amount}</div>}
                        </div>
                        <div className={cx('body-layout', 'time')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Start</span>
                                </div>
                                <div className="col-8 d-flex justify-content-between">
                                    <div className="row">
                                        <div className="col-6">
                                            <ReactDatePicker
                                                selected={startDate}
                                                onChange={(date) => setStartDate(date)}
                                            />
                                        </div>
                                        <div className="col-6">
                                            <select
                                                value={formValue.timeStart}
                                                name="timeStart"
                                                onChange={handleChange}
                                                style={{ width: '100%' }}
                                            >
                                                {listTimePicker.map((item) => (
                                                    <option value={item.display}>{item.display}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-3">
                                <div className="col-4">
                                    <span>End</span>
                                </div>
                                <div className="col-8 d-flex justify-content-between">
                                    <div className="row">
                                        <div className="col-6">
                                            <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
                                        </div>
                                        <div className="col-6">
                                            <select
                                                value={formValue.timeEnd}
                                                name="timeEnd"
                                                onChange={handleChange}
                                                style={{ width: '100%' }}
                                            >
                                                {listTimePicker.map((item) => (
                                                    <option value={item.display}>{item.display}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {errors.date && <div className={cx('error')}>{errors.date}</div>}
                        </div>

                        <div className={cx('body-layout', 'amount')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Quantity:</span>
                                </div>
                                <div className="col-8">
                                    <input name="quantity" value={formValue.quantity} onChange={handleChange} />
                                </div>
                            </div>
                            {errors.quantity && <div className={cx('error')}>{errors.quantity}</div>}
                        </div>
                        {/* <div className={cx('body-layout')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Ticket types</span>
                                </div>
                                <div className="col-8">
                                    <div className="container p-0">
                                        <div className="d-flex align-items-center">
                                            <input checked={checkedAll} onChange={handleCheckAll} type="checkbox" />
                                            <label style={{ marginLeft: 4 }}>All ticket types</label>
                                        </div>
                                        {checkedAll && (
                                            <div>
                                                <span style={{ marginRight: 8 }}>Quantity</span>
                                                <input
                                                    value={quantityAll}
                                                    onChange={(e) => setQuantityAll(e.target.value)}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    {ticketTypes.map((type, index) => {
                                        // const [quantity, setQuantity] = useState(data.quantity);

                                        return (
                                            <div className="container p-0">
                                                <div className="d-flex align-items-center">
                                                    <input
                                                        id={type._id}
                                                        checked={listCheck.includes(type._id)}
                                                        onChange={handleCheck}
                                                        className="box-type"
                                                        type="checkbox"
                                                    />
                                                    <label style={{ marginLeft: 4 }}>{type.ticketName}</label>
                                                </div>
                                                {listCheck.includes(type._id) && !checkedAll && (
                                                    <div>
                                                        <span style={{ marginRight: 8 }}>Quantity</span>
                                                        <input
                                                            value={listTypeOfDiscount[index].quantity}
                                                            onChange={(e) =>
                                                                setListTypeOfDiscount(
                                                                    listTypeOfDiscount.map((item, id) => {
                                                                        if (id === index)
                                                                            item.quantity = e.target.value;
                                                                        return item;
                                                                    }),
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div> */}
                    </Modal.Body>
                    <Modal.Footer className={cx('footer')}>
                        <Button className={cx('save-btn')} size="max" onClick={handleSave}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Discount;
