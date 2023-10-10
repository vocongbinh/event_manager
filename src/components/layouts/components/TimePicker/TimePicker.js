import styles from './TimePicker.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState, useMemo, memo, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faCalendar, faL } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';

const TimePicker = forwardRef(({ label, date, isDisabled = false, ...props }, ref) => {
    const cx = classNames.bind(styles);
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(0);
    const [hour, setHour] = useState(1);
    const [isAm, setAm] = useState(true);
    const [isShowTimePicker, setShowTimePicker] = useState(false);
    const [field, meta, helpers] = useField(props.name);
    const inputRef = useRef();
    const handleClear = () => {
        console.log('reset');
        helpers.setValue(new Date(date.getFullYear(), date.getMonth(), date.getDate()));
    };
    const handleChooseTime = () => {
        // let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        let newDate = date;
        newDate.setHours(hour + (isAm ? 0 : 12), minute, second);
        helpers.setValue(newDate);
        setShowTimePicker(false);
        inputRef.current.focus();
    };
    useEffect(() => {
        setHour(null);
        setMinute(null);
        setSecond(null);
    }, []);
    return (
        <div className={cx('timepicker-container')}>
            <div className={cx('title-container')}>
                {label && <div className={cx('title-text')}>{label}</div>}
                <HeadlessTippy
                    interactive
                    visible={!isDisabled && isShowTimePicker}
                    render={(attrs) => (
                        <div className={cx('time-picker')} tabIndex="-1" {...attrs}>
                            <div className={cx('time-container')}>
                                <div className={cx('items')}>
                                    {Array.from({ length: 12 }, (_, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setHour(index + 1);
                                                }}
                                                key={`hour-${index}`}
                                                className={cx('item', { isSelected: index + 1 === hour })}
                                            >
                                                {index < 9 ? `0${index + 1}` : index + 1}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={cx('items')}>
                                    {Array.from({ length: 60 }, (_, index) => {
                                        return (
                                            <div
                                                onClick={() => {
                                                    setMinute(index);
                                                }}
                                                key={`minute-${index}`}
                                                className={cx('item', { isSelected: index === minute })}
                                            >
                                                {index < 9 ? `0${index}` : index}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={cx('items')}>
                                    {Array.from({ length: 60 }, (_, index) => {
                                        return (
                                            <div
                                                onClick={() => setSecond(index)}
                                                key={`second-${index}`}
                                                className={cx('item', { isSelected: index === second })}
                                            >
                                                {index < 9 ? `0${index}` : index}
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className={cx('items', { daynight: true })}>
                                    <div className={cx('daynight')}>
                                        <div
                                            onClick={() => setAm(true)}
                                            key={`am`}
                                            className={cx('item', { isSelected: isAm })}
                                        >
                                            AM
                                        </div>
                                        <div
                                            onClick={() => setAm(false)}
                                            key={`am`}
                                            className={cx('item', { isSelected: !isAm })}
                                        >
                                            PM
                                        </div>
                                    </div>
                                    <div onClick={handleChooseTime} className={cx('submit')}>
                                        Chọn
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    onClickOutside={() => {
                        setShowTimePicker(false);
                    }}
                >
                    <div className={cx('date-input')}>
                        <input
                            ref={inputRef}
                            disabled={isDisabled}
                            {...field}
                            {...props}
                            readOnly
                            onClick={() => setShowTimePicker(true)}
                            value={field.value ? field.value.toLocaleTimeString() : ''}
                            className={cx('date-item')}
                        ></input>
                        {field.value && (
                            <button className={cx('post-icon-clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {!field.value && (
                            <FontAwesomeIcon
                                onClick={() => setShowTimePicker(true)}
                                icon={faCalendar}
                                className={cx('post-icon')}
                            />
                        )}
                    </div>
                </HeadlessTippy>
            </div>
        </div>
    );
});

export default memo(TimePicker);
