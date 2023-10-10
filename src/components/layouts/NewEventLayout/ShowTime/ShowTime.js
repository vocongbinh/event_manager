import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ShowTime.module.scss';
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
const ShowTime = () => {
    const cx = classNames.bind(style);
    const formSchema = yup.object().shape({
        showTimeStartDate: yup
            .date()
            .min(new Date())
            .required('Vui lòng nhập chọn ngày bắt đầu')
            .test('min-max-validation', 'Ngày kết thúc phải trễ hơn ngày bắt đầu', function (value) {
                const showTimeEndTime = this.parent.showTimeEndDate;
                return value <= showTimeEndTime;
            }),

        showTimeEndDate: yup.date().min(new Date()).required('Vui lòng nhập chọn ngày kết thúc'),
        tickets: yup.array().of(
            yup.object().shape({
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
    });

    return (
        <div className={cx('wrapper')}>
            <Formik
                initialValues={{
                    showTimeStartDate: null,
                    showTimeEndDate: null,
                    tickets: [
                        {
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
                        },
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
                {(formik) => {
                    return (
                        <Form noValidate onSubmit={formik.handleSubmit}>
                            <div>{JSON.stringify(formik.errors)}</div>
                            <div className={cx('input-container')}>
                                <div className={cx('title-icon')}>
                                    {((formik.errors.showTimeStartDate ||
                                        formik.errors.showTimeEndDate ||
                                        formik.errors.showTimeEndTime ||
                                        formik.errors.showTimeStartTime) && (
                                        <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                    )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                    <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                                </div>
                                <div className={cx('item-container')}>
                                    <div className={cx('title-text')}>Thời gian sự kiện</div>
                                    <div className="row col-12">
                                        <div className="col-md-6">
                                            <DatePicker
                                                name="showTimeStartDate"
                                                placeholder="Ngày bắt đầu"
                                                label="Ngày bắt đầu"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TimePicker
                                                date={formik.values.showTimeStartDate}
                                                isDisabled={formik.values.showTimeStartDate === null}
                                                name="showTimeStartDate"
                                                placeholder="Giờ bắt đầu"
                                                label="Giờ bắt đầu"
                                            />
                                        </div>
                                    </div>
                                    <div className="row col-12">
                                        <div className="col-md-6">
                                            <DatePicker
                                                name="showTimeEndDate"
                                                placeholder="Ngày kết thúc"
                                                label="Ngày kết thúc"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <TimePicker
                                                date={formik.values.showTimeEndDate}
                                                isDisabled={formik.values.showTimeEndDate === null}
                                                name="showTimeEndDate"
                                                placeholder="Giờ kết thúc"
                                                label="Giờ kết thúc"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('input-container')}>
                                <div className={cx('title-icon')}>
                                    {(formik.errors.tickets && (
                                        <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                    )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                    <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                                </div>

                                <div className={cx('item-container')}>
                                    <div className={cx('title-text')}>Danh sách vé</div>
                                    <div className="row col-12">
                                        <FieldArray name="tickets">
                                            {({ move, swap, push, insert, unshift, pop, form }) => {
                                                return (
                                                    <div>
                                                        {form.values.tickets.length > 0 &&
                                                            form.values.tickets.map((ticket, index) => {
                                                                return <Ticket form={form} index={index} />;
                                                            })}
                                                        <button
                                                            type="button"
                                                            className={cx('addbutton')}
                                                            onClick={() =>
                                                                push({
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
                                                                    ticketStartTime: null,
                                                                    ticketEndTime: null,
                                                                    ticketInfomation: '',
                                                                })
                                                            }
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
                            <button type="submit">Submit</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default ShowTime;
