import classNames from 'classnames/bind';
import styles from './Authentication.module.scss';
import FormHeader from '../components/FormHeader';

function AuthenticationLayout({ children }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <FormHeader header="Đăng nhập" width="30%" />
            <div className={cx('container')}>{children}</div>
        </div>
    );
}
export default AuthenticationLayout;
