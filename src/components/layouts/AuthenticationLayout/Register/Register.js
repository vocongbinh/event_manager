import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Formik, Form } from 'formik';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import authService from '../../../../apiServices/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from '../../../../utils/authContext';
import { request } from '../../../../utils/request';
import * as yup from 'yup';
const RegisterForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const cx = classNames.bind(styles);
    const [errors, setErrors] = useState('');
    const authContext = useAuthContext();
    const handleRegister = async (phoneNumber, password) => {
        await authService
            .register(phoneNumber, password)
            .then((values) => {
                console.log(values);
                setErrors('');
                authContext.regisrter({ phoneNumber, password });
                navigate('/auth/otp');
            })
            .catch((error) => {
                setErrors(error);
                console.log(error);
            });
    };
    const formikSchema = yup.object().shape({
        phoneNumber: yup
            .string()
            .matches(PHONE_REGEX, 'Phone number is not exist')
            .required('Phone number is required'),
        password: yup.string().matches(PWD_REGEX, 'Password is not valid').required('Password is required'),
        retypePassword: yup
            .string()
            .required('Password is required')
            .test('min-max-validation', 'Ngày kết thúc phải trễ hơn ngày bắt đầu', function (value) {
                const password = this.parent.password;
                return value == password;
            }),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    phoneNumber: location.state?.phoneNumber ?? '',
                    password: '',
                    retypePassword: '',
                }}
                validationSchema={formikSchema}
                onSubmit={async (values) => {
                    await handleRegister(values.phoneNumber, values.password);
                }}
                onReset={() => {
                    setErrors('');
                }}
            >
                {(formik) => {
                    return (
                        <div className={cx('wrapper')}>
                            <div className={cx('header')}>
                                <button
                                    style={{ background: 'transparent' }}
                                    type="reset"
                                    onClick={() => formik.handleReset()}
                                >
                                    <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronLeft} />
                                </button>
                                <div className={cx('title')}>Đăng ký tài khoản</div>
                            </div>
                            <Form>
                                <div>
                                    {formik.errors ? (
                                        <div className={cx('error-errors')}>
                                            {Object.values(formik.errors).map((item, index) => {
                                                if (item instanceof Object) return;
                                                return (
                                                    <div className={cx('error-label')} key={index}>
                                                        {item}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : null}
                                    {errors ? (
                                        <div className={cx('error-errors')}>
                                            <div className={cx('error-label')}>{errors.message}</div>
                                        </div>
                                    ) : null}
                                </div>
                                <InputItem
                                    name="phoneNumber"
                                    type="text"
                                    placeholder="Số điện thoại"
                                    label="Số điện thoại"
                                    readOnly="true"
                                />
                                <InputItem type="password" name="password" placeholder="Mật khẩu" label="Mật khẩu" />
                                <InputItem
                                    type="password"
                                    name="retypePassword"
                                    placeholder="Nhập lại mật khẩu"
                                    label="Nhập lại mật khẩu"
                                />
                                <div>
                                    <Button type="round" className={cx('login-button')} size="max" background="blue">
                                        Đăng ký
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

export default RegisterForm;
