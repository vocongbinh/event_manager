import styles from './MenuItem.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState, useMemo, memo } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';
const MenuItem = ({ label, items = [], ...props }) => {
    // const [selected, setSelected] = useState(-1);
    const [isShowMenuItem, setShowMenuItem] = useState(false);
    const [field, meta, helpers] = useField(props.name);
    const cx = classNames.bind(styles);
    const handleClear = () => {
        helpers.setValue(-1);
    };
    const handleSelect = (index) => {
        helpers.setValue(index);
        // onValueChange(index);
        setShowMenuItem(false);
    };

    return (
        <div className={cx('menu-container')}>
            <div className={cx('title-container')}>
                {label && <div className={cx('title-text')}>{label}</div>}
                <HeadlessTippy
                    interactive
                    visible={isShowMenuItem}
                    render={(attrs) => (
                        <div className={cx('menu-selector')} tabIndex="-1" {...attrs}>
                            <div className={cx('container')}>
                                <div className={cx('items')}>
                                    {items.map((item, index) => (
                                        <div key={index} onClick={() => handleSelect(index)} className={cx('item')}>
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    onClickOutside={() => {
                        setShowMenuItem(false);
                    }}
                >
                    <div className={cx('menu-input')}>
                        <input
                            // ref={ref}
                            value={field.value != -1 ? items[field.value] : ''}
                            type="text"
                            name={props.name}
                            className={cx('input-item')}
                            placeholder={props.placeholder}
                            onFocus={() => setShowMenuItem(true)}
                            readOnly
                        ></input>
                        {field.value != -1 && (
                            <button className={cx('post-icon')} onClick={handleClear}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                        )}
                        {field.value == -1 && (
                            <FontAwesomeIcon
                                onClick={() => setShowMenuItem(true)}
                                icon={faAngleDown}
                                className={cx('post-icon')}
                            />
                        )}
                    </div>
                </HeadlessTippy>
            </div>
        </div>
    );
};

export default memo(MenuItem);
