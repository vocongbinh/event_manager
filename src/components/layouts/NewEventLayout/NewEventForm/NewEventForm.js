import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './NewEventForm.module.scss';
import classNames from 'classnames/bind';
import { faCheckCircle, faClose, faEdit, faInfoCircle, faUserEdit } from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import DatePicker from '../../components/DatePicker';
import { useRef, useState, useCallback, memo } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import { Formik, Form, useField } from 'formik';
import * as yup from 'yup';
import TextAreaItem from '../../components/TextAreaItem/TextAreaItem';
import Button from '../../components/Button';
import ImagePicker from '../../components/ImagePicker/ImagePicker';
import TextEditor from '../../components/TextEditor/TextEditor';
import { event } from 'jquery';
import { useNewEventFormContext, useNewEventStepContext } from '../../../../utils/newEventContext';
import Address from '../Address/Address';

const NewEventForm = ({ next }) => {
    const cx = classNames.bind(style);
    const eventFormContext = useNewEventFormContext();
    const eventStepContext = useNewEventStepContext();
    const formSchema = yup.object().shape({
        eventName: yup.string().required(),
        description: yup.string().required(),
        coverImage: yup.string().required(),
        provinceCode: yup.number().required(),
        districtCode: yup.number().required(),
        wardCode: yup.number().required(),
        province: yup.string().required(),
        district: yup.string().required(),
        ward: yup.string().required(),
        displacePlace: yup.string().required(),
    });

    return (
        <div className={cx('wrapper')}>
            <Formik
                initialValues={(eventFormContext.eventInfor, eventFormContext.address)}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                    const data = {
                        eventName: values.eventName,
                        coverImage: values.coverImage,
                        description: values.description,
                    };
                    const address = {
                        provinceCode: values.provinceCode,
                        districtCode: values.districtCode,
                        wardCode: values.wardCode,
                        province: values.province,
                        district: values.district,
                        ward: values.ward,
                        displacePlace: values.displacePlace,
                    };
                    eventFormContext.setEventInfor({ ...data });
                    eventFormContext.setAddress({ ...address });
                    eventStepContext.setStep(2);
                    // alert(JSON.stringify(values));
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div>{JSON.stringify(formik.errors)}</div>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {/* <div>{JSON.stringify(formik.errors)}</div> */}
                                {(formik.touched?.eventName && formik.errors?.eventName && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={cx('item-container')}>
                                <div className={cx('title-text')}>Tên sự kiện</div>
                                <div className="row col-12">
                                    <InputItem name="eventName" type="text" placeholder="Tên sự kiện" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {(((formik.touched?.displacePlace && formik.errors?.displacePlace) ||
                                    (formik.touched?.province && formik.errors?.province) ||
                                    (formik.touched?.district && formik.errors?.district) ||
                                    (formik.touched?.ward && formik.errors?.ward)) && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={` ${cx('item-container')}`}>
                                <div className={cx('title-text')}>Địa điểm tổ chức</div>
                                <div className="row col-12">
                                    <Address />
                                </div>
                                {/* <div className={cx('title-text')}>Tên địa điểm tổ chức</div> */}
                                <div className="row col-12">
                                    <InputItem
                                        label="Tên địa điểm tổ chức"
                                        name="displacePlace"
                                        type="text"
                                        placeholder="Tên địa điểm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {(formik.errors.coverImage && formik.touched.coverImage && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={cx('item-container')}>
                                <div className={cx('title-text')}>Ảnh bìa sự kiện</div>
                                <div className="row col-12">
                                    <ImagePicker name="coverImage" type="file" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {(formik.errors.description && formik.touched.description && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={cx('item-container')}>
                                <div className={cx('title-text')}>Thông tin sự kiện</div>
                                <div className="row col-12">
                                    <TextEditor name="description" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('item-container')}>
                            <div className={cx('action')}>
                                <Button
                                    type="button"
                                    onClick={() => eventStepContext.setStep(0)}
                                    className={cx('next-button')}
                                    size="max"
                                    background="blue"
                                >
                                    Trở lại
                                </Button>
                                <Button type="primary" className={cx('next-button')} size="max" background="blue">
                                    Continue
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <div></div>
        </div>
    );
};

export default memo(NewEventForm);
