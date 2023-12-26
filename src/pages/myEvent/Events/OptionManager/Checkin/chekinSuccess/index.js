import classNames from 'classnames/bind';
import styles from './checkinSuccess.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function CheckinSuccess() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <FontAwesomeIcon size="5x" icon={faCircleCheck} />
                <p style={{ fontWeight: 700 }}>Successfully checked in</p>
                <p>The check-in qr-code was valid and it is now successfully checked in</p>
                <button onClick={() => navigate(-1)} className={cx('back-btn')}>
                    Back
                </button>
            </div>
        </div>
    );
}

export default CheckinSuccess;
