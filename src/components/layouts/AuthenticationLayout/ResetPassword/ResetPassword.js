import classNames from 'classnames/bind';
import styles from './ResetPassword.module.scss';
import { Formik, Form } from 'formik';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
const ResetPassword = () => {
    const cx = classNames.bind(styles);

    return (
        <div>
            <Formik
                initialValues={{
                    password: '',
                    retypePassword: '',
                }}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronLeft} />
                        <div className={cx('title')}>Đặt lại mật khẩu</div>
                    </div>
                    <Form>
                        <InputItem name="password" type="text" placeholder="Số điện thoại" label="Số điện thoại" />
                        <InputItem type="text" name="retypePassword" placeholder="Mật khẩu" label="Mật khẩu" />\
                        <div>
                            <Button type="round" className={cx('login-button')} size="max" background="blue">
                                Hoàn thành
                            </Button>
                        </div>
                    </Form>
                </div>
            </Formik>
        </div>
    );
};

export default ResetPassword;
