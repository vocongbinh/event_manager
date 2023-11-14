import classNames from 'classnames/bind';
import styles from './LoginForm.module.scss';
import { Formik, Form } from 'formik';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
const LoginForm = () => {
    const cx = classNames.bind(styles);
    const [showPasswordBox, setShowPasswordBox] = useState(false);
    return (
        <div>
            <Formik
                initialValues={{
                    phoneNumber: '',
                    password: '',
                }}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronLeft} />
                        <div className={cx('title')}>Đăng nhập</div>
                    </div>
                    <Form>
                        <InputItem name="phoneNumber" placeholder="Số điện thoại" label="Số điện thoại" />
                        <InputItem type="text" name="password" placeholder="Mật khẩu" label="Mật khẩu" />

                        <Button type="primary" className={cx('forgotpass-button')} size="max" background="blue">
                            Quên mật khẩu
                        </Button>
                        <div>
                            <Button type="round" className={cx('login-button')} size="max" background="blue">
                                Đăng nhập
                            </Button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    );
};

export default LoginForm;
