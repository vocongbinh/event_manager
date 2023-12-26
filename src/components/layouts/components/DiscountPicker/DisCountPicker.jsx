import React, { useState } from 'react';
import styles from './DiscoutPicker.module.scss';
import classNames from 'classnames/bind';
import HeadlessTippy from '@tippyjs/react/headless';
import DiscountItem from './DiscountItem/DiscountItem';
const DisCountPicker = ({ discounts, selectDiscount }) => {
    const [isShow, setIsShow] = useState(false);
    console.log(selectDiscount);
    const cx = classNames.bind(styles);
    return (
        <div>
            <HeadlessTippy
                visible={isShow}
                hideOnClick={false}
                interactive={true}
                onClickOutside={() => {
                    setIsShow(false);
                }}
                placement="bottom"
                render={(props) => {
                    return (
                        <div className={cx('tippy-wrapper')} tabIndex={-1} {...props}>
                            {discounts?.map((item, index) => (
                                <DiscountItem discount={item} index={index} selectDiscount={selectDiscount} />
                            ))}
                        </div>
                    );
                }}
            >
                <div style={{ fontSize: 14 }} onClick={() => setIsShow(true)}>
                    View Discount
                </div>
            </HeadlessTippy>
        </div>
    );
};

export default DisCountPicker;
