import { memo, useContext } from 'react';
import Images from '../../../../assets/images';
import styles from './PaymentInfo.module.scss';
import classNames from 'classnames/bind';
import { BookContext } from '../../bookingLayout';

function PaymentInfo() {
    const cx = classNames.bind(styles);
    const bookContext = useContext(BookContext);
    return (
        <div className={cx('wrapper')}>
            <form>
                <div className="col-12">
                    <div className={cx('ticket-receiver')}>
                        <div className="row">
                            <p className={cx('header')}>Ticket receiver</p>
                        </div>
                        <div className="row">
                            <table className={cx('table-info')}>
                                <tr>
                                    <td>
                                        <div className={cx('input')}>
                                            <label>First Name</label>
                                            <input
                                                name="firtName"
                                                value={bookContext.firstName}
                                                onChange={(e) => bookContext.setFirstName(e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={cx('input')}>
                                            <label>Last Name</label>
                                            <input
                                                name="lastName"
                                                value={bookContext.latstName}
                                                onChange={(e) => bookContext.setLastName(e.target.value)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={cx('input')}>
                                            <label>Email</label>
                                            <input
                                                name="email"
                                                value={bookContext.email}
                                                onChange={(e) => bookContext.setEmail(e.target.value)}
                                            />
                                        </div>
                                    </td>
                                    <td>
                                        <div className={cx('input')}>
                                            <label>Re-type email</label>
                                            <input
                                                name="confirmEmail"
                                                value={bookContext.reEmail}
                                                onChange={(e) => bookContext.setReEmail(e.target.value)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className={cx('input')}>
                                            <label>Phone number</label>
                                            <input
                                                name="phoneNumber"
                                                value={bookContext.phoneNumber}
                                                onChange={(e) => bookContext.setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div className="row">
                            <div className={cx('header-method')}>
                                <p className={cx('header')}>payment method</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6 p-0">
                                <div className={cx('method')}>
                                    <input checked type="radio" />
                                    <table>
                                        <tr>
                                            <td>
                                                <img className={cx('zalo-logo')} src={Images.zalopayLogo} />
                                            </td>
                                            <td>
                                                <p>Zalopay E-Payment</p>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default memo(PaymentInfo);
