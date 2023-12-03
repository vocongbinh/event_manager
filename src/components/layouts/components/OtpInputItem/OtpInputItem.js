import styles from './OtpInputItem.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState, memo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';
const OtpInputItem = ({ label, onChange, value, ...props }) => {
    const cx = classNames.bind(styles);
    const validationPattern = /[0-9]{1}/;

    const handleInputChange = (e, index) => {
        const elem = e.target;
        const val = e.target.value;
        // check if the value is valid
        if (!validationPattern.test(val) && val !== '') return;

        // change the value of the upper state using onChange
        const valueArr = value.split('');
        valueArr[index] = val;
        const newVal = valueArr.join('').slice(0, 6);
        if (val) {
            const next = elem.nextElementSibling;
            console.log(next);
            next?.focus();
        }

        onChange(newVal);

        //focus the next element if there's a value
    };
    const arr = new Array(6).fill('_');

    return (
        <div className={cx('input-container')}>
            <div className={cx('title-container')}>
                {label && <div className={cx('title-text')}>{label}</div>}
                <div className={cx('input-outer')}>
                    {arr.map((_, index) => {
                        return (
                            <input
                                {...props}
                                key={index}
                                value={value.at(index) ?? ''}
                                onChange={(e) => handleInputChange(e, index)}
                                inputMode="numeric"
                                autoComplete="one-time-code"
                                className={cx('input-item')}
                            ></input>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(OtpInputItem);
