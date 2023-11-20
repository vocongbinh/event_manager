import classNames from 'classnames/bind';
import styles from './RegisterSuccess.module.scss';
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
const RegisterSuccess = () => {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const message = 'Đăng ký tài khoản thành công';
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('title')}>{'Thông báo'}</div>
            </div>
            <div>
                {message ? (
                    <div className={cx('success')}>
                        <div className={cx('success-label')}>{message}</div>
                    </div>
                ) : null}
            </div>
            <div>
                <Button
                    onClick={() => {
                        navigate('/auth/login', { showBox: true });
                    }}
                    type="round"
                    className={cx('login-button')}
                    size="max"
                    background="blue"
                >
                    Đi tới đăng nhập
                </Button>
            </div>
        </div>
    );
};

export default RegisterSuccess;
