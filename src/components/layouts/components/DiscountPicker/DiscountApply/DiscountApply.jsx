import React from 'react';
import styles from './DiscountApply.module.scss';
import classNames from 'classnames/bind';
const DiscountApply = ({ discount }) => {
    const cx = classNames.bind(styles);
    const date = new Date(discount?.endAt);
    const dateString = `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`;
    return (
        <div
            className={cx('ticket-wrapper', {
                disable: discount?.isDisable == true,
            })}
        >
            <div className={cx('image-wrapper')}>
                <img className={cx('image-item')} src="https://cf.shopee.vn/file/45f9f224f8be9cffaea92adfca6c63e5" />
            </div>
            <div className={cx('content-wrapper')}>
                <div className={cx('content-left')}>
                    <p className={cx('pdiscount')}>{discount?.discountName}</p>
                    <p className={cx('pamount')}>{`Min Order Amount ${
                        discount?.minOrderAmount == -1 ? 'No limit' : discount?.minOrderAmount / 1000
                    }K`}</p>
                    <p className={cx('ptime')}>{`ED: ${dateString}`}</p>
                </div>
                <div className={cx('content-right')}>
                    <p className={cx('max-used-button')}>{`X${discount?.value}`}</p>
                </div>
            </div>
        </div>
    );
};

export default DiscountApply;
