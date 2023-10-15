import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../components/layouts/components/Button';
import styles from './BankAccount.module.scss';
import classNames from 'classnames/bind';
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons';
function BankAccount() {
    const cx = classNames.bind(styles);
    const listFields = ['Account owner', 'Account number', 'Bank', 'Branch'];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>
                    <FontAwesomeIcon icon={faPiggyBank} className={cx('icon')} />

                    <div className={cx('header-content')}>
                        <p className={cx('title')}>Your bank account information</p>
                        <p className={cx('sub-title')}>
                            Ticketbox will transfer money collected from selling tickets to your bank account
                        </p>
                        <div className="container">
                            {listFields.map((field) => (
                                <div className={cx('row')}>
                                    <label className={cx('title', 'label')}>{field}</label>
                                    <input className={cx('input')} />
                                </div>
                            ))}
                        </div>
                        <div className={cx('line')}></div>
                    </div>
                </div>
            </div>
            <Button size="max" className={cx('save-btn')}>
                Save
            </Button>
        </div>
    );
}

export default BankAccount;
