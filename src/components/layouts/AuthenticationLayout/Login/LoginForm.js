import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { Formik, Form } from 'formik';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useLayoutEffect, useState } from 'react';
import authService from '../../../../apiServices/authService';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuthContext } from '../../../../utils/authContext';
import { request } from '../../../../utils/request';
import * as yup from 'yup';
const LoginForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const cx = classNames.bind(styles);
    const [isShowPasswordBox, setShowPasswordBox] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [errors, setErrors] = useState('');
    const authContext = useAuthContext();
    // const { status, data, error } = useQuery(phoneNumber && 'register', async () => {
    //     const status = await authService.register(phoneNumber);
    //     return status;
    // });
    // useEffect(() => {
    //     if (data === 201) {
    //         setShowPasswordBox(true);
    //     } else if (data === 200) {
    //         throw redirect('auth/register');
    //     }

    //     const handleClickNext = () => {
    //         // setPhoneNumber(field.value);
    //     };
    // }, [data]);
    const handleClickNext = async (phoneNumber) => {
        await authService
            .checkPhoneNumber(phoneNumber)
            .then((data) => {
                if (data.status == 200) {
                    navigate('/auth/register', { state: { phoneNumber } });
                } else if (data.status == 201) {
                    setShowPasswordBox(true);
                }
                setErrors('');
            })
            .catch((error) => {
                setErrors(error);
            });
    };
    const handleSignIn = async (phoneNumber, password) => {
        await authService
            .login(phoneNumber, password)
            .then((values) => {
                console.log(values);
                setErrors('');
                authContext.logIn(values);
                const redirectPath = location.state?.path || '/';
                navigate(redirectPath, { replace: true, state: { phoneNumber } });
            })
            .catch((error) => {
                setErrors(error);
                console.log(error);
            });
    };
    const handleForgotPassword = () => {
        navigate('/auth/forgotPassword');
    };
    // const formikSchema = yup.object().shape({
    //     phoneNumber: yup
    //         .string()
    //         .matches(PHONE_REGEX, 'Phone number is not exist')
    //         .required('Phone number is required'),
    //     password: yup.string().matches(PWD_REGEX, 'Password is not valid').required('Password is required'),
    // });
    const formikSchemaPhone = yup.object().shape({
        phoneNumber: yup
            .string()
            .matches(PHONE_REGEX, 'Phone number is not exist')
            .required('Phone number is required'),
    });

    return (
        <div>
            <Formik
                initialValues={{
                    phoneNumber: '',
                    password: '',
                }}
                validationSchema={formikSchemaPhone}
                onSubmit={async (values) => {
                    if (!isShowPasswordBox) {
                        setPhoneNumber(values.phoneNumber);
                        console.log('phoneNumber');
                        handleClickNext(values.phoneNumber);
                    } else {
                        console.log(values);
                        await handleSignIn(values.phoneNumber, values.password);
                    }
                }}
                onReset={() => {
                    setShowPasswordBox(false);
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
                                <div className={cx('title')}>{isShowPasswordBox ? 'Đăng nhập' : 'Số điện thoại'}</div>
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
                                    readOnly={isShowPasswordBox}
                                />
                                {!isShowPasswordBox && (
                                    <div>
                                        <Button
                                            type="round"
                                            className={cx('login-button')}
                                            size="max"
                                            background="blue"
                                        >
                                            Tiếp tục
                                        </Button>
                                    </div>
                                )}
                                {isShowPasswordBox && (
                                    <div>
                                        <InputItem
                                            type="password"
                                            name="password"
                                            placeholder="Mật khẩu"
                                            label="Mật khẩu"
                                        />

                                        <Button
                                            onClick={handleForgotPassword}
                                            type="primary"
                                            className={cx('forgotpass-button')}
                                            size="max"
                                            background="blue"
                                        >
                                            Quên mật khẩu
                                        </Button>
                                        <div>
                                            <Button
                                                type="round"
                                                className={cx('login-button')}
                                                size="max"
                                                background="blue"
                                            >
                                                Đăng nhập
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Form>
                        </div>
                    );
                }}
            </Formik>
        </div>
    );
};

export default LoginForm;
