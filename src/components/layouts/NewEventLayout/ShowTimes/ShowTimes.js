import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ShowTimes.module.scss';
import classNames from 'classnames/bind';
import { faCheckCircle, faClose, faEdit, faInfoCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import DatePicker from '../../components/DatePicker';
import { useRef, useState, useCallback } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import { Formik, Form, useField, FieldArray, Field } from 'formik';
import * as yup from 'yup';
import Ticket from '../Ticket/Ticket';
import ShowTime from '../ShowTime/ShowTime';
import { v4 as uuidv4 } from 'uuid';

const ShowTimes = ({ step }) => {
    const cx = classNames.bind(style);
    const formSchema = yup.object().shape({
        showtimes: yup.array().of(
            yup.object().shape({
                id: yup.string().required(),
                showTimeStartDate: yup
                    .date()
                    .min(new Date(), 'Ngày bắt đầu không được sớm hơn hôm nay')
                    .required('Vui lòng nhập chọn ngày bắt đầu')
                    .test('min-max-validation', 'Ngày kết thúc phải trễ hơn ngày bắt đầu', function (value) {
                        const showTimeEndTime = this.parent.showTimeEndDate;
                        return value <= showTimeEndTime;
                    }),

                showTimeEndDate: yup.date().min(new Date()).required('Vui lòng nhập chọn ngày kết thúc'),
                ticketSales: yup.array().of(
                    yup.object().shape({
                        ticketTypeId: yup.string().required(),
                        ticketStartDate: yup
                            .date()
                            .min(new Date())
                            .required('Vui lòng nhập chọn ngày bắt đầu')
                            .test('min-max-validation', 'Ngày kết thúc phải trễ hơn ngày bắt đầu', function (value) {
                                const showTimeEndTime = this.parent.ticketEndDate;
                                return value < showTimeEndTime;
                            }),
                        ticketEndDate: yup.date().min(new Date()).required('Vui lòng nhập chọn ngày kết thúc'),
                    }),
                ),
            }),
        ),
        ticketTypes: yup.array().of(
            yup.object().shape({
                id: yup.string().required(),
                ticketTypeName: yup.string().required('Vui lòng nhập tên loại vé'),
                ticketTypePrice: yup.number().min(0, 'Giá vé không hợp lệ').required('Vui lòng nhập giá vé'),
                ticketImage: yup.string().required('Vui lòng chọn ảnh vé'),
                ticketColor: yup.string().required('Vui lòng chọn màu loại vé'),
                totalTicket: yup.number().positive('Tổng số vé không hợp lệ').required('Vui lòng nhập tổng số vé'),
                minPerOrder: yup
                    .number()
                    .positive('Số vé tối thiểu không hợp lệ')
                    .required('Vui lòng nhập số vé tối thiểu')
                    .test(
                        'min-max-validation',
                        'Số vé tối thiểu phải nhỏ hơn hoặc bằng số vé tối đa',
                        function (value) {
                            const maxPerOrder = this.parent.maxPerOrder;
                            return value <= maxPerOrder;
                        },
                    ),
                maxPerOrder: yup
                    .number()
                    .positive('Số vé tối đa không hợp lệ')
                    .required('Vui lòng nhập số vé tối đa')
                    .test('min-max-validation', 'Số vé  tối đa phải nhỏ hơn hoặc bằng tổng số vé', function (value) {
                        return value <= this.parent.totalTicket;
                    }),

                ticketInfomation: yup.string().nullable(),
            }),
        ),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    showtimes: [
                        {
                            id: uuidv4(),
                            showTimeStartDate: null,
                            showTimeEndDate: null,
                            ticketSales: [],
                        },
                    ],
                    ticketTypes: [
                        // {
                        //     id: uuidv4(),
                        //     ticketTypeName: '',
                        //     ticketTypePrice: '',
                        //     ticketTypeDescription: '',
                        //     ticketImage: null,
                        //     ticketColor: '',
                        //     totalTicket: '',
                        //     minPerOrder: '',
                        //     maxPerOrder: '',
                        //     ticketEndDate: null,
                        //     ticketStartDate: null,
                        //     ticketInfomation: '',
                        // },
                    ],
                }}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(JSON.stringify(values, null, 2));
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                <Form>
                    {step == 2 && (
                        <FieldArray name="ticketTypes">
                            {({ move, swap, push, insert, unshift, pop, form }) => {
                                return (
                                    <div className={cx('wrapper')}>
                                        {form.values.ticketTypes.length > 0 &&
                                            form.values.ticketTypes.map((ticket, ind) => {
                                                return <Ticket form={form} pop={pop} index={ind} />;
                                            })}
                                        <button
                                            type="button"
                                            className={cx('addbutton')}
                                            onClick={() => {
                                                console.log(form.values);

                                                push({
                                                    id: uuidv4(),
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
                    )}{' '}
                    {step == 3 && (
                        <FieldArray name="showtimes">
                            {({ move, swap, push, insert, unshift, pop, form }) => {
                                return (
                                    <div className={cx('wrapper')}>
                                        {form.values.showtimes.length > 0 &&
                                            form.values.showtimes.map((showtime, index) => {
                                                return <ShowTime pop={pop} form={form} index={index} />;
                                            })}
                                        <button
                                            type="button"
                                            className={cx('add-showtime-button')}
                                            onClick={() =>
                                                push({
                                                    id: uuidv4(),
                                                    showTimeStartDate: null,
                                                    showTimeEndDate: null,
                                                    ticketSales: [],
                                                })
                                            }
                                        >
                                            Thêm ngày sự kiện
                                        </button>
                                        <button type="submit">Submit</button>
                                    </div>
                                );
                            }}
                        </FieldArray>
                    )}{' '}
                </Form>
            </Formik>
        </div>
    );
};

export default ShowTimes;
