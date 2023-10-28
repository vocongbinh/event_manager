import styles from './DatePicker.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState, useMemo, memo, useRef } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight, faCircleXmark, faCalendar } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';

const DatePicker = forwardRef(({ label, kind = 'primary', ...props }) => {
    const [date, setDate] = useState(new Date());
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth());
    const [firstDayOfMonth, setFirstDayOfMonth] = useState(1);
    const [lastDateOfMonth, setLastDateOfMonth] = useState(30);
    const [lastDayOfMonth, setLastDayOfMonth] = useState(1);
    const [lastDateOfLastMonth, setLastDateOfLastMonth] = useState(30);
    const [isToday, setIsToday] = useState(false);
    const [dateHeader, setDateHeader] = useState('');
    const [isShowDatePicker, setShowDatePicker] = useState(false);
    const [field, meta, helpers] = useField(props.name);
    const inputRef = useRef();

    const months = [
        'Tháng một',
        'Tháng hai',
        'Tháng ba',
        'Tháng tư',
        'Tháng năm',
        'Tháng sáu',
        'Tháng bảy',
        'Tháng tám',
        'Tháng chín',
        'Tháng mười',
        'Tháng mười một',
        'Tháng mười hai',
    ];
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    let renderCalendar = () => {
        setFirstDayOfMonth((prev) => new Date(year, month, 1).getDay());
        setLastDateOfMonth((prev) => new Date(year, month + 1, 0).getDate());
        setLastDayOfMonth((prev) => new Date(year, month, new Date(year, month + 1, 0).getDate()).getDay());
        setLastDateOfLastMonth((prev) => new Date(year, month, 0).getDate());
        setIsToday(month == new Date().getMonth() && new Date().getFullYear() == year);
    };
    useEffect(() => {
        renderCalendar();
        setDateHeader(`${months[month]}, ${year}`);
    }, [date]);
    const cx = classNames.bind(styles);
    const handleClear = () => {
        helpers.setValue(null);
    };
    const handleIconClick = (val) => {
        let newMonth = month + val;
        if (newMonth >= 0 && newMonth <= 11) {
            setMonth(newMonth);
            setDate(new Date(year, newMonth, new Date().getDate()));
        } else if (newMonth < 0) {
            setYear(year - 1);
            setMonth(11);
            setDate(new Date(year - 1, 11, 1));
        } else if (newMonth > 11) {
            setYear(year + 1);
            setMonth(0);

            setDate(new Date(year + 1, 0, 1));
        }
    };
    const handleSelectDay = (day) => {
        let newDate = new Date(year, month, day);
        setShowDatePicker(false);
        helpers.setValue(newDate);
        inputRef.current.focus();
    };

    return (
        <div
            className={cx('date-container', {
                primary: kind === 'primary',
                small: true,
            })}
        >
            <div className={cx('title-container')}>
                {label && <div className={cx('title-text')}>{label}</div>}
                <HeadlessTippy
                    interactive
                    visible={isShowDatePicker}
                    render={(attrs) => (
                        <div className={cx('date-picker')} tabIndex="-1" {...attrs}>
                            <div className={cx('header')}>
                                <div className={cx('title')}>{dateHeader}</div>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faChevronLeft}
                                        onClick={() => handleIconClick(-1)}
                                        className={cx('icon')}
                                    />
                                    <FontAwesomeIcon
                                        icon={faChevronRight}
                                        onClick={() => handleIconClick(1)}
                                        className={cx('icon')}
                                    />
                                </div>
                            </div>
                            <div className={cx('calendar')}>
                                <div className={cx('items')}>
                                    {days.map((day, index) => (
                                        <div className={cx('week')}>{day}</div>
                                    ))}
                                    {Array.from({ length: firstDayOfMonth }, (_, index) => {
                                        const day = lastDateOfLastMonth - firstDayOfMonth + index + 1;
                                        return (
                                            <div
                                                key={`${month - 1 >= 0 ? month - 1 : 11}-${day}`}
                                                className={cx('day', {
                                                    disabled: true,
                                                })}
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}

                                    {Array.from({ length: lastDateOfMonth }, (_, index) => {
                                        const day = index + 1;
                                        return (
                                            <div
                                                onClick={() => {
                                                    handleSelectDay(day);
                                                }}
                                                key={`${month}-${day}`}
                                                className={cx('day', {
                                                    today: isToday && day === date.getDate(),
                                                    isSelected:
                                                        field.value instanceof Date &&
                                                        month == field.value.getMonth() &&
                                                        year == field.value.getFullYear() &&
                                                        day == field.value.getDate(),
                                                })}
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}
                                    {Array.from({ length: (6 - lastDayOfMonth) % 7 }).map((_, index) => {
                                        const day = index + 1;
                                        return (
                                            <div
                                                key={`${month + 1 <= 11 ? month + 1 : 0}-${day}`}
                                                className={cx('day', {
                                                    disabled: true,
                                                })}
                                            >
                                                {day}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                    onClickOutside={() => {
                        setShowDatePicker(false);
                    }}
                >
                    <div className={cx('date-input')}>
                        <input
                            ref={inputRef}
                            {...field}
                            {...props}
                            value={field.value ? field.value.toLocaleDateString() : ''}
                            type="text"
                            className={cx('date-item', {})}
                            onClick={() => setShowDatePicker(true)}
                            readOnly
                        ></input>
                        {field.value && (
                            <button className={cx('post-icon-clear')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {!field.value && (
                            <FontAwesomeIcon
                                onClick={() => setShowDatePicker(true)}
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

export default memo(DatePicker);
