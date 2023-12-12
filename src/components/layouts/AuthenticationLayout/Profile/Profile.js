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
import { Spinner } from 'react-bootstrap';
import AvatarPicker from '../../components/AvatarPicker/AvatarPicker';
const Profile = () => {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    const { phoneNumber, fullName, identifyCardNumber, email, dateOfBirth, imageUrl } = authContext.userInfo;
    console.log(authContext.userInfo);
    const readOnlyCard = identifyCardNumber != null;
    const [error, setError] = useState('');
    const [success, showSucces] = useState(false);
    const navigate = useNavigate();
    const IDENTIFICATION_REGEX = /(^\w{3}[0-9]{6}$)|(^\w{1,2}[0-9]{7}$)|(^\d{9}$)|(^\d{12}$)/;
    const [isSubmiting, setIsSubmiting] = useState(false);
    const profileSchema = yup.object().shape({
        fullName: yup.string().required('Fullname can not empty'),
        identifyCardNumber: yup
            .string()
            .matches(IDENTIFICATION_REGEX, 'Identification number is not valid')
            .required('Card Number can not empty'),
        email: yup.string().email().required('Email can not empty'),
        dateOfBirth: yup.date().max(new Date(), 'Date of birth is not valid'),
        imageUrl: yup.string(),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    imageUrl: imageUrl ?? '',
                    fullName: fullName ?? '',
                    phoneNumber: phoneNumber ?? '',
                    identifyCardNumber: identifyCardNumber ?? '',
                    email: email ?? '',
                    dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : '',
                }}
                validationSchema={profileSchema}
                onSubmit={async (values) => {
                    setIsSubmiting(true);
                    console.log(values);
                    const newUserData = {
                        ...authContext.userInfo,
                        ...values,
                    };
                    await authService
                        .editProfile(newUserData)
                        .then((response) => {
                            authContext.setUserInfo(response);
                            showSucces(true);
                        })
                        .catch((err) => setError(err));
                    setIsSubmiting(false);
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
                                <div className={cx('title')}>Profile Information</div>
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
                                        <div className={cx('error-label')}>
                                            {error.message ?? 'An Error is occured'}
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                            <div>
                                {success ? (
                                    <div className={cx('success-wrapper')}>
                                        <div className={cx('success-label')}>{'Update profile succesfully'}</div>
                                    </div>
                                ) : null}
                            </div>
                            <Form>
                                {/* image picker */}
                                <AvatarPicker name="imageUrl" type="file" />
                                <InputItem name="fullName" placeholder="Fullname" label="Fullname" />
                                <InputItem
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Phone number"
                                    label="Phone number"
                                    readOnly={true}
                                />
                                <InputItem name="email" type="text" placeholder="Email" label="Email" />
                                <InputItem
                                    name="identifyCardNumber"
                                    type="text"
                                    placeholder="Identification Number"
                                    label="Identification Number"
                                    readOnly={readOnlyCard}
                                />
                                {/* <InputItem type="password" name="password" placeholder="Mật khẩu" label="Mật khẩu" /> */}
                                <DatePicker name="dateOfBirth" placeholder="Date Of Birth" label="Date Of Birth" />
                                <div>
                                    {!isSubmiting ? (
                                        <Button
                                            type="round"
                                            className={cx('login-button')}
                                            size="max"
                                            background="blue"
                                        >
                                            Save changes
                                        </Button>
                                    ) : (
                                        <Button
                                            type="round"
                                            className={cx('login-button')}
                                            size="max"
                                            background="blue"
                                            disabled="true"
                                        >
                                            <Spinner />
                                        </Button>
                                    )}
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
