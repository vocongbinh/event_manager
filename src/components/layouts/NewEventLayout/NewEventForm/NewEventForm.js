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
import { useNewEventFormContext } from '../../../../utils/newEventContext';

const NewEventForm = ({ next }) => {
    // const [eventName, setEventName] = useState('');
    // const [displacePlace, setDisplacePlace] = useState('');
    // const [address, setAddress] = useState('');
    // const [startDate, setStartDate] = useState(null);
    // const [startTime, setStartTime] = useState(null);
    // const [provinceCode, setProvinceCode] = useState('');
    // const [districtCode, setDistrictCode] = useState('');
    const items = ['Bến Tre', 'Hồ Chí Minh', 'Hà Nội'];
    const cx = classNames.bind(style);
    const eventFormContext = useNewEventFormContext();

    const formSchema = yup.object().shape({
        eventName: yup.string().required(),
        description: yup.string().required(),
        coverImage: yup.string().required(),
        // embeddedLinks: yup.array(),
        // startTime: yup.string().url().required(),
    });

    return (
        <div className={cx('wrapper')}>
            <Formik
                initialValues={{
                    eventName: 'dd',
                    description: 'ss',
                    coverImage: '',
                    // embeddedLinks: [],
                }}
                validationSchema={formSchema}
                onSubmit={(values, { setSubmitting }) => {
                    eventFormContext.updateNewEvent(values);
                    // alert(JSON.stringify(values));
                    next(2);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
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
                                {(formik.errors.description && formik.touched.description && (
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
                                <Button type="primary" className={cx('next-button')} size="max" background="blue">
                                    Tiếp theo
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
{
    /* <div className={cx('input-container')}>
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
                            </div> */
}
