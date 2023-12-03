import styles from './TextAreaItem.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';
const TextAreaItem = ({ label, ...props }) => {
    const cx = classNames.bind(styles);

    const [field, meta, helpers] = useField(props.name);
    const handleClear = () => {
        helpers.setValue('');
    };
    return (
        <div className={cx('input-container')}>
            <div className={cx('title-container')}>
                {label && <div className={cx('title-text')}>{label}</div>}
                <div className={cx('input')}>
                    <textarea
                        {...field}
                        {...props}
                        // ref={ref}
                        // value={value}
                        // type="text"
                        // name={name}
                        className={cx('input-item')}
                        // placeholder={placeholder}
                        // onChange={(e) => onValueChange(value, e.target.value)}
                    ></textarea>
                    {field.value != '' && (
                        <button type="button" className={cx('post-icon')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(TextAreaItem);
