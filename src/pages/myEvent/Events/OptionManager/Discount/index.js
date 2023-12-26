import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './Discount.module.scss';
import classNames from 'classnames/bind';
import { faCirclePlus, faLockOpen, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { Modal } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import eventService from '../../../../../apiServices/eventService';
import ticketService from '../../../../../apiServices/ticketService';
import { useLocation, useParams } from 'react-router-dom';
import format from 'date-fns/format';
import Button from '../../../../../components/layouts/components/Button';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import CheckboxItem from './CheckboxItem';
import ReactDatePicker from 'react-datepicker';
import * as discountService from '../../../../../apiServices/discountService';
import { useQuery } from '@tanstack/react-query';
import Ticket from '../../../../../components/layouts/NewEventLayout/Ticket';
function Discount() {
    const cx = classNames.bind(styles);
    //set state
    const [event, setEvents] = useState(null);
    const [show, setShow] = useState(false);
    const [ticketTypes, setTicketTypes] = useState([]);
    const [discounts, setDiscounts] = useState([]);
    const [allDiscounts, setAllDiscounts] = useState([]);
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
    const [stid, setStid] = useState('');
    const [formValue, setFormValue] = useState({
        discountName: '',
        description: '',
        percent: '',
        maxAmount: '',
        minAmount: '',
        maxTimeUsed: '',
        quantity: '',
        timeStart: '00:00 AM',
        timeEnd: '00:00 AM',
        discountType: '',
        itemId: '',
    });
    let dateStart, dateEnd;

    const [errors, setErrors] = useState({});
    const [type, setType] = useState('create');
    console.log(new Date());
    //form
    const validation = () => {
        const start = listTimePicker.find((item) => item.display === formValue.timeStart);
        const end = listTimePicker.find((item) => item.display === formValue.timeEnd);
        let hourStart;
        let hourEnd;
        console.log(start);
        if (start.aa === 'AM' && start.hour < 12) {
            hourStart = start.hour;
        } else hourStart = start.hour + 12;
        if (end.aa === 'AM' && end.hour <= 12) {
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
        let error = {};
        if (formValue.discountName === '') {
            error.discountName = 'Please set the discount name';
        }
        if (formValue.description === '') {
            error.description = 'Please set the description';
        }
        if (formValue.minAmount === '') {
            error.minAmount = 'Please set the min amount';
        }
        if (formValue.maxAmount === '') {
            error.maxAmount = 'Please set the max amount';
        }
        if (formValue.maxTimeUsed === '') {
            error.maxTimeUsed = 'Please set the max time used';
        }
        if (formValue.percent === '') {
            error.percent = 'Please set the discount percent';
        }
        if (startDate === null || endDate === null) {
            error.date = 'Please set date';
        } else if (dateStart >= dateEnd) {
            error.date = 'End date must be after start date ';
        }
        if (formValue.quantity === '') {
            error.quantity = 'Please set the discount quantity';
        }
        return error;
    };
    //set time picker
    let countHour = 0;
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
    const showtimeId = showId.get('showId');

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
    const handleCheckAll = (e) => {
        setCheckedAll(!checkedAll);
        if (!checkedAll) {
            setListCheck(ticketTypes.map((item) => item._id));
            // setListTypeOfDiscount(ticketTypes.map((item) => item._id));
        } else setListCheck([]);
    };
    const { isLoading, isError, data, refetch } = useQuery({
        queryKey: ['discounts', stid],
        queryFn: async () => {
            if (stid !== undefined) {
                const discountData = await discountService.getAll(params.id);
                setDiscounts(discountData);
            }
        },
    });

    useEffect(() => {
        const fetchApi = async () => {
            const events = await eventService.getEventById(params.id);
            setEvents(events);
            const allDiscountData = await discountService.findAll();
            setAllDiscounts(allDiscountData);
            console.log(stid);
        };
        fetchApi();
    }, [discounts]);
    const handleEdit = async (id) => {
        setShow(true);
        const data = await discountService.getById(id);
        setDiscount(data);
        setStartDate(new Date(data.startAt));
        setEndDate(new Date(data.endAt));
        setFormValue({
            discountName: data.discountName,
            description: data.description,
            percent: data.percent,
            maxAmount: data.maxAmount,
            minAmount: data.minOrderAmount,
            maxTimeUsed: data.maxtimeUsed,
            quantity: data.quantity,
            timeStart: format(new Date(data.startAt), 'hh:mm aa'),
            timeEnd: format(new Date(data.endAt), 'hh:mm aa'),
        });
        setType('update');
    };
    const handleCreate = () => {
        setType('create');
        setShow(true);
        setFormValue({
            discountName: '',
            description: '',
            percent: '',
            maxAmount: '',
            minAmount: '',
            maxTimeUsed: '',
            quantity: '',
            timeStart: '00:00 AM',
            timeEnd: '00:00 AM',
        });
        setStartDate(null);
        setEndDate(null);
    };
    const handleClose = () => {
        setShow(false);
        setErrors({});
        setCheckedAll(false);
        setListCheck([]);
        setListTypeOfDiscount(
            ticketTypes.map((item) => {
                return {
                    _id: item._id,
                    quantity: 0,
                    ticketName: item.ticketTypeName,
                };
            }),
        );
    };
    const handleSave = async () => {
        const errs = validation();
        let listChecked;
        if (checkedAll) {
            listChecked = [
                {
                    ticketName: 'all',
                    quantity: quantityAll,
                },
            ];
        } else listChecked = listTypeOfDiscount;
        console.log(listChecked);
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            console.log(formValue.timeStart);
            const start = listTimePicker.find((item) => item.display === formValue.timeStart);
            const end = listTimePicker.find((item) => item.display === formValue.timeEnd);
            let hourStart;
            let hourEnd;
            console.log(start);
            if (start.aa === 'AM' && start.hour < 12) {
                hourStart = start.hour;
            } else hourStart = start.hour + 12;
            if (end.aa === 'AM' && end.hour <= 12) {
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
                discountName: formValue.discountName,
                description: formValue.description,
                percent: Number.parseInt(formValue.percent),
                maxAmount: Number.parseInt(formValue.maxAmount),
                minOrderAmount: Number.parseInt(formValue.minAmount),
                eventId: params.id,
                maxtimeUsed: Number.parseInt(formValue.maxTimeUsed),
                startAt: dateStart,
                endAt: dateEnd,
                quantity: Number.parseInt(formValue.quantity),
            };
            console.log(data);

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

    //form
    const handleChange = (e) => {
        console.log(e.target.value);
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
                    {/* <div className={cx('time-select')}>
                        <span>Shows In</span>
                        <select
                            onChange={async (e) => {
                                const typesData = await ticketService.getTicketOfShowtime(e.target.value);
                                setTicketTypes(typesData);
                                console.log(typesData);
                                setListTypeOfDiscount(
                                    typesData.map((item) => {
                                        return {
                                            _id: item._id,
                                            quantity: 0,
                                            ticketName: item.ticketTypeName,
                                        };
                                    }),
                                );
                                setStid(e.target.value);
                            }}
                            className={cx('selection')}
                        >
                            <option>--please select a date--</option>
                            {listShowtime.map((showtime) => (
                                <option value={showtime._id}>{showtime.startShowTime}</option>
                            ))}
                        </select>
                    </div> */}
                </div>
                {discounts && discounts.length > 0 && (
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th>discountName</th>
                                <th>amount</th>
                                <th>start</th>
                                <th>end</th>
                                <th>min total price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discounts.map((item) => (
                                <tr>
                                    <td>{item.discountName}</td>
                                    <td>{item.percent}%</td>
                                    <td>{format(new Date(item.startAt), 'dd/MM/yyyy HH:mm aa')}</td>
                                    <td>{format(new Date(item.endAt), 'dd/MM/yyyy HH:mm aa')}</td>
                                    <td>{item.minOrderAmount}</td>
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

                {
                    <Button
                        onClick={handleCreate}
                        className={cx('create-btn')}
                        size="max"
                        sufIcon={<FontAwesomeIcon icon={faCirclePlus} />}
                    >
                        Add New Discount Code
                    </Button>
                }

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
                        {/* <DiscountModel /> */}
                        <div className={cx('code-layout')}>
                            <input
                                name="discountName"
                                value={formValue.discountName}
                                onChange={handleChange}
                                placeholder="Discount name"
                            />
                            {errors.discountName && <div className={cx('error')}>{errors.discountName}</div>}
                        </div>
                        <div className={cx('code-layout')}>
                            <input
                                name="description"
                                value={formValue.description}
                                onChange={handleChange}
                                placeholder="Description"
                            />
                            {errors.description && <div className={cx('error')}>{errors.description}</div>}
                        </div>

                        <div className={cx('body-layout', 'amount')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Discount percent</span>
                                </div>
                                <div className="col-8">
                                    <input
                                        type="number"
                                        name="percent"
                                        value={formValue.percent}
                                        onChange={handleChange}
                                    />
                                    <span>% of ticket sale</span>
                                </div>
                            </div>
                            {errors.percent && <div className={cx('error')}>{errors.percent}</div>}
                        </div>
                        <div className={cx('body-layout', 'amount')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Min total price</span>
                                </div>
                                <div className="col-8">
                                    <input
                                        type="number"
                                        name="minAmount"
                                        value={formValue.minAmount}
                                        onChange={handleChange}
                                    />
                                    <span>VND</span>
                                </div>
                            </div>

                            {errors.minAmount && <div className={cx('error')}>{errors.minAmount}</div>}
                        </div>
                        <div className={cx('body-layout', 'amount')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Max amount</span>
                                </div>
                                <div className="col-8">
                                    <input
                                        type="number"
                                        name="maxAmount"
                                        value={formValue.maxAmount}
                                        onChange={handleChange}
                                    />
                                    <span>VND</span>
                                </div>
                            </div>
                            {errors.maxAmount && <div className={cx('error')}>{errors.maxAmount}</div>}
                        </div>
                        <div className={cx('body-layout', 'amount')}>
                            <div className="row">
                                <div className="col-4">
                                    <span>Max time used</span>
                                </div>
                                <div className="col-8">
                                    <input
                                        type="number"
                                        name="maxTimeUsed"
                                        value={formValue.maxTimeUsed}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {errors.maxTimeUsed && <div className={cx('error')}>{errors.maxTimeUsed}</div>}
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
                                                    <label style={{ marginLeft: 4 }}>{type.ticketTypeName}</label>
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
