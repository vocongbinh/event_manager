import styles from './PaymentInfo.module.scss';
import classNames from 'classnames/bind';
function PaymentInfo() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className="col-12">
                <div className={cx('ticket-receiver')}>
                    <div className="row">
                        <p className={cx('header')}>Ticket receiver</p>
                    </div>
                    <div className="row">
                        <div className={cx('table')}>
                            <div className="row">
                                <div className="col-6">
                                    <div className={cx('input')}>
                                        <label>First Name</label>
                                        <input value="fdf" />
                                    </div>
                                </div>
                                <div className="col-6 ">
                                    <div className={cx('input')}>
                                        <label>Last Name</label>
                                        <input value="fdssf" />
                                    </div>
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-6 ">
                                    <div className={cx('input')}>
                                        <label> Email</label>
                                        <input value="fdssf" />
                                    </div>
                                </div>
                                <div className="col-6 ">
                                    <div className={cx('input')}>
                                        <label>Re-type email</label>
                                        <input value="fdssf" />
                                    </div>
                                </div>
                            </div>
                            <div className="row  ">
                                <div className="col-6 ">
                                    <div className={cx('input')}>
                                        <label>Phone number</label>
                                        <input value="fdssf" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentInfo;
