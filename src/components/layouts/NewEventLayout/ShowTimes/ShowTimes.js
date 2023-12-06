import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './ShowTimes.module.scss';
import classNames from 'classnames/bind';
import { faCheckCircle, faClose, faEdit, faInfoCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import DatePicker from '../../components/DatePicker';
import { useRef, useState, useCallback, memo } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import { Formik, Form, useField, FieldArray, Field, FormikContext, useFormikContext } from 'formik';
import * as yup from 'yup';
import Ticket from '../Ticket/Ticket';
import ShowTime from '../ShowTime/ShowTime';
import Button from '../../components/Button';
import { v4 as uuidv4 } from 'uuid';
import { useNewEventFormContext } from '../../../../utils/newEventContext';
import { useNavigate } from 'react-router-dom';

const ShowTimes = ({ next }) => {
    const cx = classNames.bind(style);
    const newEventContext = useNewEventFormContext();
    const navigate = useNavigate();
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
                // ticketSales: yup.array().of(
                //     yup.object().shape({
                //         ticketTypeId: yup.string().required(),
                //     }),
                // ),
            }),
        ),
        ticketTypes: yup.array().of(
            yup.object().shape({
                id: yup.string().required(),
                showTimeId: yup.string().required(),
                isFree: yup.boolean().required(),
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
                ticketEndDate: yup
                    .date()
                    .min(new Date())
                    .required('Vui lòng nhập chọn ngày kết thúc')
                    .test('min-max-validation', 'Ngày kết thúc phải trễ hơn ngày bắt đầu', function (value) {
                        // const time = form.showtimes.find((x) => x.id === this.parent.id).showTimeStartDate;
                        // return value < time;
                        return true;
                    }),
            }),
        ),
    });
    console.log('render showtimes');
    return (
        <div>
            <Formik
                initialValues={{
                    showtimes: [
                        {
                            id: uuidv4(),
                            showTimeStartDate: '',
                            showTimeEndDate: '',
                            ticketSales: [],
                        },
                    ],

                    ticketTypes: [],
                }}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(newEventContext.newEvent);
                    newEventContext.setShowtimes(values.showtimes);
                    newEventContext.setTickets(values.ticketTypes);
                    // alert(JSON.stringify(fullEventData));
                    // next(3);
                    navigate('/newEvent/new-stage-model');
                }}
            >
                <Form>
                    <FieldArray name="showtimes">
                        {({ push, remove, form }) => {
                            return (
                                <div className={cx('wrapper')}>
                                    {form.values.showtimes.length > 0 &&
                                        form.values.showtimes.map((_, index) => {
                                            return <ShowTime form={form} index={index} remove={remove} />;
                                        })}
                                    <button
                                        type="button"
                                        className={cx('add-showtime-button')}
                                        onClick={() =>
                                            push({
                                                id: uuidv4(),
                                                showTimeStartDate: null,
                                                showTimeEndDate: null,
                                            })
                                        }
                                    >
                                        Thêm ngày sự kiện
                                    </button>
                                    <div className={cx('item-container')}>
                                        <div className={cx('action')}>
                                            <Button
                                                type="primary"
                                                className={cx('next-button')}
                                                size="max"
                                                background="blue"
                                            >
                                                Tiếp theo
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    </FieldArray>
                </Form>
            </Formik>
        </div>
    );
};

export default memo(ShowTimes);
