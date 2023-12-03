import classNames from 'classnames/bind';
import styles from './OtpForm.module.scss';
import { Formik, Form } from 'formik';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import authService from '../../../../apiServices/authService';
import { redirect, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useAuthContext } from '../../../../utils/authContext';
import OtpInputItem from '../../components/OtpInputItem/OtpInputItem';
import { set } from 'date-fns';
const Otp = () => {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const [otpValue, setOtp] = useState('');
    const [error, setError] = useState('');
    // const handleVerify = async (phoneNumber) => {
    //     const status = await authService.register(phoneNumber);
    //     console.log(status);
    //     if (status == 201) setShowPasswordBox(true);
    //     else if (status == 200) navigate('/auth/register');
    // };
    useEffect(() => {
        if (otpValue.length == 6) {
            const verifyOtpAsync = async () => {
                if (otpValue.length === 6) {
                    try {
                        await verifyOtp();
                    } catch (error) {
                        // Handle error if needed
                        console.error('Error verifying OTP:', error);
                    }
                }
            };

            verifyOtpAsync(); // Call the async function
        }
    }, [otpValue]);
    const verifyOtp = async () => {
        const registerInfo = authContext.registerData;
        await authService
            .postOtp(registerInfo.phoneNumber, registerInfo.password, otpValue)
            .then((values) => {
                if (values.status == 200) {
                    console.log(values);
                    setError('');
                    navigate('/auth/registerSuccess', { replace: true });
                } else setError('Mã xác thực không chính xác');
            })
            .catch((error) => {
                setError(JSON.stringify(error));
                console.log(error);
            });
    };
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
                <div className={cx('title')}>{'Xác thực tài khoản'}</div>
            </div>
            <div>
                {error ? (
                    <div className={cx('error-errors')}>
                        <div className={cx('error-label')}>{error}</div>
                    </div>
                ) : null}
            </div>
            <OtpInputItem label={'Mã xác thực'} value={otpValue} onChange={(val) => setOtp(val)} />
            <div>
                <Button type="round" className={cx('login-button')} size="max" background="blue">
                    Tiếp tục
                </Button>
            </div>
        </div>
    );
};

export default Otp;
