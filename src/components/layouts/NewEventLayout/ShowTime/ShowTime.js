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
import TicketTime from '../TicketTime/TicketTime';
const ShowTime = ({ form, index, remove }) => {
    console.log('render showtime ' + index);
    const $ = (prop) => {
        return `showtimes.${index}.${prop}`;
    };
    const errors = form.errors;
    const touched = form.touched;
    const values = form.values.showtimes;
    const showtime = values[index];
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
                                    date={showtime.showTimeStartDate}
                                    isDisabled={showtime.showTimeStartDate === null}
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
                                    date={showtime.showTimeEndDate}
                                    isDisabled={showtime.showTimeEndDate === null}
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
                        <div className={cx('title-text')}>Danh sách vé</div>
                        <div className="row col-12">
                            <FieldArray name={`ticketTypes`}>
                                {({ push, remove, form }) => {
                                    return (
                                        <div>
                                            {form.values.ticketTypes.length > 0 &&
                                                form.values.ticketTypes.map((ticket, ind) => {
                                                    if (ticket.showTimeId == showtime.id)
                                                        return <Ticket form={form} remove={remove} index={ind} />;
                                                })}
                                            <button
                                                type="button"
                                                className={cx('addbutton')}
                                                onClick={() => {
                                                    console.log(form.values);

                                                    push({
                                                        id: uuidv4(),
                                                        showTimeId: showtime.id,
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
                                        </div>
                                    );
                                }}
                            </FieldArray>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
    );
};

export default memo(ShowTime);
