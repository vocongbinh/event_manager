import styles from './InputItem.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState, memo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';
const InputItem = ({ label, ...props }) => {
    const cx = classNames.bind(styles);
    const [inputFocus, setInputFocus] = useState(false);
    const [field, meta, helpers] = useField(props.name);
    const handleClear = () => {
        console.log('reset input');
        helpers.setValue('');
    };
    return (
        <div className={cx('input-container')}>
            <div className={cx('title-container')}>
                {label && <div className={cx('title-text')}>{label}</div>}
                <div className={cx('input')}>
                    <input
                        {...field}
                        {...props}
                        // ref={ref}
                        // value={value}
                        // type="text"
                        // name={name}
                        className={cx('input-item')}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => setInputFocus(false)}
                        // placeholder={placeholder}
                        // onChange={(e) => onValueChange(value, e.target.value)}
                    ></input>
                    {field.value != '' && inputFocus === true && (
                        <button type="button" className={cx('post-icon')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(InputItem);
