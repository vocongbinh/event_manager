import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './TicketTime.module.scss';
import classNames from 'classnames/bind';
import {
    faCheckCircle,
    faClose,
    faDeleteLeft,
    faEdit,
    faInfoCircle,
    faPenToSquare,
    faPlusCircle,
    faTicket,
    faTrashCan,
    faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import DatePicker from '../../components/DatePicker';
import { useRef, useState, useCallback, useEffect } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import TextAreaItem from '../../components/TextAreaItem/TextAreaItem';
import { Formik, Form, useField, FieldArray } from 'formik';
import Button from '../../components/Button';
import * as yup from 'yup';

const TicketTime = ({ form, showtime, index, pop, push }) => {
    const cx = classNames.bind(style);
    // useEffect(() => {
    //     push({ ticketTypeId: form.values.ticketTypes[index].ticketTypeId, ticketEndDate: null, ticketStartDate: null });
    // }, []);
    return (
        <div className={cx('wrapper')}>
            <div key={index} className={cx('container')}>
                <div className={cx('header')}>
                    <FontAwesomeIcon icon={faTicket} className={cx('ticket-icon')} />
                    <button
                        // onClick={() => {
                        //     if (isEditingForm) {
                        //         console.log('click button ticket type');
                        //         setEditingTicketName(true);
                        //     }
                        // }}
                        type="button"
                        className={cx('ticket-type-name')}
                    >
                        {form.values.ticketTypes[index] ? form.values.ticketTypes[index].ticketTypeName : ''}
                    </button>
                    <div>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('action-icon')} />
                        <FontAwesomeIcon icon={faTrashCan} className={cx('action-icon')} />
                    </div>
                </div>
                <div className={cx('ticket-container')}>
                    <div className={cx('row col-12')}>
                        {form.errors &&
                        form.errors.showtimes &&
                        form.errors.showtimes[showtime] &&
                        form.errors.showtimes[showtime].ticketSales &&
                        form.errors.showtimes[showtime].ticketSales[index] ? (
                            <div className={cx('ticket-errors')}>
                                {Object.values(form.errors.showtimes[showtime].ticketSales[index]).map(
                                    (item, index) => (
                                        <div className={cx('ticket-label')} key={index}>
                                            {item}
                                        </div>
                                    ),
                                )}
                            </div>
                        ) : null}
                    </div>

                    <div className={cx('row col-12')}>
                        <div className="col-md-4">
                            <div className={cx('input-label')}>Ngày bắt đầu bán</div>
                        </div>
                        <div className="col-md-4">
                            <DatePicker
                                name={`showtimes.${showtime}.ticketSales.${index}.ticketStartDate`}
                                type="text"
                                placeholder="Ngày bắt đầu"
                            />
                        </div>
                        <div className="col-md-4">
                            <TimePicker
                                date={form.values.showtimes[showtime].ticketSales[index].ticketStartDate}
                                isDisabled={form.values.showtimes[showtime].ticketSales[index].ticketStartDate === null}
                                name={`showtimes.${showtime}.ticketSales.${index}.ticketStartDate`}
                                type="text"
                                placeholder="Giờ bắt đầu"
                            />
                        </div>
                    </div>
                    <div className="row col-12">
                        <div className="col-md-4">
                            <div className={cx('input-label')}>Ngày kết thúc bán</div>
                        </div>
                        <div className="col-md-4">
                            <DatePicker
                                name={`showtimes.${showtime}.ticketSales.${index}.ticketEndDate`}
                                type="text"
                                placeholder="Ngày kết thúc"
                            />
                        </div>
                        <div className="col-md-4">
                            <TimePicker
                                date={form.values.showtimes[showtime].ticketSales[index].ticketEndDate}
                                isDisabled={form.values.showtimes[showtime].ticketSales[index].ticketEndDate === null}
                                name={`showtimes.${showtime}.ticketSales.${index}.ticketEndDate`}
                                type="text"
                                placeholder="Giờ kết thúc"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketTime;
