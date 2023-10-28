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
const NewEventForm = () => {
    // const [eventName, setEventName] = useState('');
    // const [displacePlace, setDisplacePlace] = useState('');
    // const [address, setAddress] = useState('');
    // const [startDate, setStartDate] = useState(null);
    // const [startTime, setStartTime] = useState(null);
    // const [provinceCode, setProvinceCode] = useState('');
    // const [districtCode, setDistrictCode] = useState('');
    const items = ['Bến Tre', 'Hồ Chí Minh', 'Hà Nội'];
    const cx = classNames.bind(style);
    const formSchema = yup.object().shape({
        eventName: yup.string().required(),
        displacePlace: yup.string().required(),
        address: yup.string().required(),
        provinceCode: yup.number().min(0).required(),
        districtCode: yup.number().min(0).required(),
        startDate: yup.date().required(),
        eventInfomation: yup.string().required(),
        coverImage: yup.string().required(),
        // startTime: yup.string().url().required(),
    });

    return (
        <div className={cx('wrapper')}>
            <Formik
                initialValues={{
                    eventName: '',
                    displacePlace: '',
                    address: '',
                    startDate: null,
                    startTime: '',
                    provinceCode: -1,
                    districtCode: -1,
                    eventInfomation: '',
                    coverImage: '',
                }}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    console.log('submit');
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                    }, 400);
                }}
            >
                {(formik) => {
                    return (
                        <form noValidate onSubmit={formik.handleSubmit}>
                            <div className={cx('input-container')}>
                                <div className={cx('title-icon')}>
                                    {((!formik.values.eventName || formik.errors.eventName) && (
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
                                    {((formik.errors.address ||
                                        formik.errors.displacePlace ||
                                        formik.errors.districtCode ||
                                        formik.errors.provinceCode ||
                                        formik.values.provinceCode == -1 ||
                                        formik.values.districtCode == -1) && (
                                        <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                    )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                    <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                                </div>
                                <div className={` ${cx('item-container')}`}>
                                    <div className={cx('title-text')}>Tên địa điểm</div>
                                    <div className="row col-12">
                                        <InputItem name="displacePlace" type="text" placeholder="Tên địa điểm" />
                                        <InputItem
                                            name="address"
                                            type="text"
                                            label="Địa chỉ"
                                            placeholder="Tên địa chỉ"
                                        />
                                    </div>
                                    <div className="row col-12">
                                        <div className="col-md-6">
                                            <MenuItem
                                                items={items}
                                                name="provinceCode"
                                                placeholder="Chọn tỉnh, thành phố"
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <MenuItem
                                                items={items}
                                                name="districtCode"
                                                placeholder="Chọn quận, huyện"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('input-container')}>
                                <div className={cx('title-icon')}>
                                    {((formik.errors.eventInfomation || !formik.values.eventInfomation) && (
                                        <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                    )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                    <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                                </div>
                                <div className={cx('item-container')}>
                                    <div className={cx('title-text')}>Thông tin sự kiện</div>
                                    <div className="row col-12">
                                        <TextAreaItem
                                            name="eventInfomation"
                                            type="text"
                                            placeholder="Nhập vào nội dung chi tiết sự kiện"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* <div className={cx('input-container')}>
                                <div className={cx('title-icon')}>
                                    <div className={cx('title-icon')}>
                                        {((formik.errors.startDate || formik.errors.startTime) && (
                                            <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                        )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                        <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                                    </div>
                                </div>
                                <div className={cx('item-container')}>
                                    <div className="row col-12">
                                        <button type="submit" className={` ${cx('addbutton')}`}>
                                            Tiếp tục
                                        </button>
                                    </div>
                                </div>
                            </div> */}
                            <div className={cx('item-container')}>
                                {/* <div className="row col-6">
                                    <button type="button" className={` ${cx('addbutton')}`}>
                                        Lưu lại
                                    </button>
                                </div> */}
                                <div className="row col-12">
                                    <button type="submit" className={` ${cx('addbutton')}`}>
                                        Tiếp tục
                                    </button>
                                </div>
                            </div>
                        </form>
                    );
                }}
            </Formik>
        </div>
    );
};

export default memo(NewEventForm);
