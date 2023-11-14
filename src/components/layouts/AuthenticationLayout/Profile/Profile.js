import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { Formik, Form } from 'formik';
import InputItem from '../../components/InputItem/InputItem';
import Button from '../../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import DatePicker from '../../components/DatePicker';
const Profile = () => {
    const cx = classNames.bind(styles);

    return (
        <div>
            <Formik
                initialValues={{
                    fullName: '',
                    phoneNumber: '',
                    identifyCardNumber: '',
                    email: '',
                    dateOfBirth: '',
                    avatarUrl: '',
                }}
            >
                <div className={cx('wrapper')}>
                    <div className={cx('header')}>
                        <FontAwesomeIcon className={cx('chevron-icon')} icon={faChevronLeft} />
                        <div className={cx('title')}>Đăng nhập</div>
                    </div>
                    <Form>
                        <InputItem name="fullName" placeholder="Họ và tên" label="Họ và tên" />
                        <InputItem name="phoneNumber" type="text" placeholder="Số điện thoại" label="Số điện thoại" />
                        <InputItem
                            name="identifyCardNumber"
                            type="text"
                            placeholder="Số CMND/CCCD/Hộ chiếu"
                            label="Số CMND/CCCD/Hộ chiếu"
                        />
                        <InputItem type="password" name="password" placeholder="Mật khẩu" label="Mật khẩu" />
                        <DatePicker name="dateOfBirth" placeholder="Ngày sinh" label="Ngày sinh" />
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

export default Profile;
