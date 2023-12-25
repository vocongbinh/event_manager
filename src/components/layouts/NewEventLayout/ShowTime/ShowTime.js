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
import { useRef, useState, memo, useCallback, useEffect } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import { Formik, Form, useField, FieldArray, Field, useFormikContext } from 'formik';
import * as yup from 'yup';
import { v4 as uuidv4 } from 'uuid';

import Ticket from '../Ticket/Ticket';
import TicketTime from '../Tickets/Tickets';
const ShowTime = ({ form, index, remove }) => {
    console.log('render showtime ' + index);
    const $ = (prop) => {
        return `showtimes.${index}.${prop}`;
    };
    const errors = form.errors;
    const touched = form.touched;
    const values = form.values.showtimes;
    const showtime = values[index];
    console.log(showtime);
    const cx = classNames.bind(style);
    const [fieldTicketSales, meta, helperTicketSales] = useField($(`ticketSales`));
    return (
        <div className={cx('wrapper')}>
            <Form>
                {/* {errors && <div>{JSON.stringify(errors)}</div>} */}
                <div className={cx('icon-container')}>
                    <FontAwesomeIcon
                        onClick={() => {
                            remove(index);
                        }}
                        icon={faTrashCan}
                        className={cx('icon-edit')}
                    />
                </div>
                <div className={cx('row col-12')}>
                    {/* form.touched?.ticketTypes && form.touched?.ticketTypes[index] && ( */}
                    {/* // <div>{JSON.stringify(form.touched.ticketTypes[index])}</div> */}
                    {/* )} */}
                    {form.errors &&
                    form.errors?.showtimes &&
                    form.errors?.showtimes[index] &&
                    form.touched &&
                    form.touched?.showtimes &&
                    form.touched?.showtimes[index] ? (
                        <div className={cx('showtime-errors')}>
                            {Object.entries(form.errors.showtimes[index]).map(([key, value]) => {
                                if (
                                    1 &&
                                    form.touched.showtimes[index][key] &&
                                    form.touched.showtimes[index][key] === true
                                ) {
                                    return (
                                        <div className={cx('showtime-label')} key={key}>
                                            {value}
                                        </div>
                                    );
                                } else return null;
                            })}
                        </div>
                    ) : null}
                </div>

                {/* <div className={cx('row col-12')}>
                    {errors && errors.showtimes && errors.showtimes[index] ? (
                        <div className={cx('showtime-errors')}>
                            {Object.values(errors.showtimes[index]).map((item, index) => {
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
 */}
                <div className={cx('input-container')}>
                    <div className={cx('title-icon')}>
                        {(errors &&
                            touched &&
                            errors.showtimes &&
                            errors.showtimes[index] &&
                            touched?.showtimes &&
                            touched?.showtimes[index] && (
                                <FontAwesomeIcon icon={faCheckCircle} className={cx('info-icon')} />
                            )) || <FontAwesomeIcon icon={faInfoCircle} className={cx('check-icon')} />}
                        <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                    </div>
                    <div className={cx('item-container')}>
                        <div className={cx('title-text')}>Showtime</div>
                        <div className="row col-12">
                            <div className="col-md-6">
                                <DatePicker
                                    name={`showtimes.${index}.startAt`}
                                    placeholder="Showtime start date"
                                    label="Showtime start date"
                                />
                            </div>
                            <div className="col-md-6">
                                <TimePicker
                                    date={showtime.startAt}
                                    isDisabled={showtime.startAt === null}
                                    name={`showtimes.${index}.startAt`}
                                    placeholder="Start time"
                                    label="Start time"
                                />
                            </div>
                        </div>
                        <div className="row col-12">
                            <div className="col-md-6">
                                <DatePicker
                                    name={`showtimes.${index}.endAt`}
                                    placeholder="Showtime end date"
                                    label="Showtime end date"
                                />
                            </div>
                            <div className="col-md-6">
                                <TimePicker
                                    date={showtime.endAt}
                                    isDisabled={showtime.endAt === null}
                                    name={`showtimes.${index}.endAt`}
                                    placeholder="End time"
                                    label="End time"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('input-container')}>
                    <div className={cx('title-icon')}>
                        {(form.errors &&
                            form.errors?.ticketTypes &&
                            form.errors?.ticketTypes[index] &&
                            form.touched &&
                            form.touched?.ticketTypes &&
                            form.touched?.ticketTypes[index] && (
                                <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                            )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                        <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                    </div>

                    <div className={cx('item-container')}>
                        <div className={cx('title-text')}>Ticket sale time</div>
                        <div className="row col-12">
                            <div className="col-md-6">
                                <DatePicker
                                    name={`showtimes.${index}.startSaleTicketDate`}
                                    placeholder="Start sale"
                                    label="Start sale"
                                />
                            </div>
                            <div className="col-md-6">
                                <DatePicker
                                    name={`showtimes.${index}.endSaleTicketDate`}
                                    placeholder="End sale"
                                    label="End sale"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default memo(ShowTime);
