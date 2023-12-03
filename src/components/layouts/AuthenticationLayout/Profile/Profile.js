import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Formik, Form } from 'formik';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import DatePicker from '../../components/DatePicker';
import TimePicker from '../../components/TimePicker/TimePicker';
import { useAuthContext } from '../../../../utils/authContext';
import authService from '../../../../apiServices/authService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
const Profile = () => {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    const { phoneNumber, fullName, identifyCardNumber, email, dateOfBirth, avatarUrl } = authContext.userInfo;
    console.log(authContext.userInfo);
    const readOnlyCard = identifyCardNumber != null;
    const [error, setError] = useState('');
    const [success, showSucces] = useState(false);
    const navigate = useNavigate();
    const IDENTIFICATION_REGEX = /(^\w{3}[0-9]{6}$)|(^\w{1,2}[0-9]{7}$)|(^\d{9}$)|(^\d{12}$)/;

    const profileSchema = yup.object().shape({
        fullName: yup.string().required('Tên đầy đủ không được để trống'),
        identifyCardNumber: yup
            .string()
            .matches(IDENTIFICATION_REGEX, 'Căn cước công dân không hợp lệ')
            .required('Căn cước công dân không được để trống'),
        email: yup.string(),
        dateOfBirth: yup.date(),
        avatarUrl: yup.string(),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    fullName: fullName ?? '',
                    phoneNumber: phoneNumber ?? '',
                    identifyCardNumber: identifyCardNumber ?? '',
                    email: email ?? '',
                    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : '',
                    avatarUrl: avatarUrl ?? '',
                }}
                validationSchema={profileSchema}
                onSubmit={async (values) => {
                    const newUserData = {
                        ...authContext.userInfo,
                        ...values,
                    };
                    await authService
                        .editProfile(newUserData)
                        .then((response) => {
                            authContext.setUserInfo(response);
                            showSucces(true)
                        })
                        .catch((err) => setError(err));
                }}
            >
                {(formik) => {
                    return (
                        <div className={cx('wrapper')}>
                            <div className={cx('header')}>
                                <FontAwesomeIcon
                                    onClick={() => {
                                        navigate(-1);
                                    }}
                                    className={cx('chevron-icon')}
                                    icon={faChevronLeft}
                                />
                                <div className={cx('title')}>Thông tin tài khoản</div>
                            </div>
                            <div>
                                {formik.errors ? (
                                    <div className={cx('error-errors')}>
                                        {Object.entries(formik.errors).map(([key, value]) => {
                                            // if (value instanceof Object) return;
                                            if (formik.touched[key] && formik.touched[key] === true)
                                                return (
                                                    <div className={cx('error-label')} key={key}>
                                                        {value}
                                                    </div>
                                                );
                                        })}
                                    </div>
                                ) : null}
                                {error ? (
                                    <div className={cx('error-errors')}>
                                        <div className={cx('error-label')}>{error.message ?? 'Đã có lỗi xảy ra'}</div>
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                {success ? (
                                    <div className={cx('success-wrapper')}>
                                        <div className={cx('success-label')}>
                                            {error.message ?? 'Cập nhật tài khoản thành công'}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <Form>
                                <InputItem name="fullName" placeholder="Họ và tên" label="Họ và tên" />
                                <InputItem
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    label="Số điện thoại"
                                    readOnly={true}
                                />
                                <InputItem
                                    name="identifyCardNumber"
                                    type="text"
                                    placeholder="Số CMND/CCCD/Hộ chiếu"
                                    label="Số CMND/CCCD/Hộ chiếu"
                                    readOnly={readOnlyCard}
                                />
                                {/* <InputItem type="password" name="password" placeholder="Mật khẩu" label="Mật khẩu" /> */}
                                <DatePicker name="dateOfBirth" placeholder="Ngày sinh" label="Ngày sinh" />
                                <div>
                                    <Button type="round" className={cx('login-button')} size="max" background="blue">
                                        Hoàn thành
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
};

export default Profile;
