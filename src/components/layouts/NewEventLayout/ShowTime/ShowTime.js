import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ShowTime.module.scss';
import classNames from 'classnames/bind';
import {
    faCheckCircle,
    faClose,
    faEdit,
    faInfoCircle,
    faPenToSquare,
    faUserEdit,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import DatePicker from '../../components/DatePicker';
import { useRef, useState, useCallback, useEffect } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import { Formik, Form, useField, FieldArray, Field } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import Ticket from '../Ticket/Ticket';
import TicketTime from '../TicketTime/TicketTime';
const ShowTime = ({ form, index, pop }) => {
    const cx = classNames.bind(style);
    const [fieldTicketSales, meta, helperTicketSales] = useField(`showtimes.${index}.ticketSales`);
    return (
        <div className={cx('wrapper')}>
            <Form>
                {form.errors && <div>{JSON.stringify(form.errors)}</div>}
                <div className={cx('icon-container')}>
                    <FontAwesomeIcon
                        onClick={() => {
                            pop(index);
                        }}
                        icon={faTrashCan}
                        className={cx('icon-edit')}
                    />
                </div>
                <div className={cx('row col-12')}>
                    {form.errors && form.errors.showtimes && form.errors.showtimes[index] ? (
                        <div className={cx('showtime-errors')}>
                            {Object.values(form.errors.showtimes[index]).map((item, index) => {
                                if (item instanceof Object) return;
                                return (
                                    <div className={cx('showtime-label')} key={index}>
                                        {item}
                                    </div>
                                );
                            })}
                        </div>
                    ) : null}
                </div>

                <div className={cx('input-container')}>
                    <div className={cx('title-icon')}>
                        {(((form.values.showtimes && form.values.showtimes[index] && !form.errors.showtimes) ||
                            (form.values.showtimes &&
                                form.values.showtimes[index] &&
                                form.errors.showtimes &&
                                ((form.errors.showtimes[index] && !form.errors.showtimes[index].showTimeStartDate) ||
                                    (form.errors.showtimes[index] &&
                                        !form.errors.showtimes[index].showTimeEndDate)))) && (
                            <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />
                        )) || <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />}
                        <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                    </div>
                    <div className={cx('item-container')}>
                        <div className={cx('title-text')}>Thời gian sự kiện</div>
                        <div className="row col-12">
                            <div className="col-md-6">
                                <DatePicker
                                    name={`showtimes.${index}.showTimeStartDate`}
                                    placeholder="Ngày bắt đầu"
                                    label="Ngày bắt đầu"
                                />
                            </div>
                            <div className="col-md-6">
                                <TimePicker
                                    date={form.values.showtimes[index].showTimeStartDate}
                                    isDisabled={form.values.showtimes[index].showTimeStartDate === null}
                                    name={`showtimes.${index}.showTimeStartDate`}
                                    placeholder="Giờ bắt đầu"
                                    label="Giờ bắt đầu"
                                />
                            </div>
                        </div>
                        <div className="row col-12">
                            <div className="col-md-6">
                                <DatePicker
                                    name={`showtimes.${index}.showTimeEndDate`}
                                    placeholder="Ngày kết thúc"
                                    label="Ngày kết thúc"
                                />
                            </div>
                            <div className="col-md-6">
                                <TimePicker
                                    date={form.values.showtimes[index].showTimeEndDate}
                                    isDisabled={form.values.showtimes[index].showTimeEndDate === null}
                                    name={`showtimes.${index}.showTimeEndDate`}
                                    placeholder="Giờ kết thúc"
                                    label="Giờ kết thúc"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('input-container')}>
                    <div className={cx('title-icon')}>
                        {(form.errors &&
                            form.errors.showtimes &&
                            form.errors.showtimes[index] &&
                            form.errors.showtimes[index].ticketSales && (
                                <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                            )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                        <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                    </div>

                    <div className={cx('item-container')}>
                        <div className={cx('title-text')}>Danh sách vé</div>
                        <div className="row col-12">
                            <FieldArray name={`ticketTypes`}>
                                {({ move, swap, push, insert, unshift, pop, form }) => {
                                    return (
                                        <div>
                                            {form.values.ticketTypes.length > 0 &&
                                                form.values.ticketTypes.map((ticket, ind) => {
                                                    if (ticket.showTimeId == form.values.showtimes[index].id)
                                                        return <Ticket form={form} pop={pop} index={ind} />;
                                                })}
                                            <button
                                                type="button"
                                                className={cx('addbutton')}
                                                onClick={() => {
                                                    console.log(form.values);

                                                    push({
                                                        id: uuidv4(),
                                                        showTimeId: form.values.showtimes[index].id,
                                                        isFree: false,
                                                        ticketTypeName: '',
                                                        ticketTypePrice: '',
                                                        ticketTypeDescription: '',
                                                        ticketImage: null,
                                                        ticketColor: '',
                                                        totalTicket: '',
                                                        minPerOrder: '',
                                                        maxPerOrder: '',
                                                        ticketEndDate: null,
                                                        ticketStartDate: null,
                                                        ticketInfomation: '',
                                                    });
                                                    console.log(form.values);
                                                }}
                                            >
                                                Thêm loại vé
                                            </button>
                                            {/* <button onClick={() => console.log(form.values)}>log</button> */}
                                            {/* <button type="submit">Submit</button> */}
                                        </div>
                                    );
                                }}
                            </FieldArray>
                            {/* <FieldArray name={`showtimes.${index}.ticketSales`}>
                                {({ move, swap, push, insert, unshift, pop, form }) => {
                                    let tickets = form.values.ticketTypes;
                                    let ticketSales = form.values.showtimes[index].ticketSales;
                                    console.log('hehe' + JSON.stringify(ticketSales));
                                    let ticketIds = new Set(form.values.ticketTypes.map((ticket) => ticket.id));
                                    let ticketSaleIds = new Set(
                                        form.values.showtimes[index].ticketSales.map((ticket) => ticket.ticketTypeId),
                                    );
                                    let newticketSalesArray = [];
                                    if (
                                        ticketIds.size !== ticketSaleIds.size ||
                                        !Array.from(ticketIds).every((item) => ticketSaleIds.has(item))
                                    ) {
                                        for (let i = 0; i < tickets.length; i++) {
                                            let res = ticketSales.filter((item) => item.ticketTypeId == tickets[i].id);
                                            if (res.length > 0) {
                                                newticketSalesArray.push(res[0]);
                                            } else {
                                                newticketSalesArray.push({
                                                    ticketTypeId: form.values.ticketTypes[i].id,
                                                    ticketEndDate: null,
                                                    ticketStartDate: null,
                                                });
                                            }
                                        }
                                        helperTicketSales.setValue(newticketSalesArray);
                                    }
                                    return (
                                        <div>
                                            {ticketSales.length > 0 &&
                                                ticketSales.map((ticket, ind) => {
                                                    return (
                                                        <Ticket
                                                            form={form}
                                                            pop={pop}
                                                            index={ind}
                                                            showtime={index}
                                                            push={push}
                                                        />
                                                    );
                                                })}
                                        </div>
                                    );
                                }}
                            </FieldArray> */}
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default ShowTime;
