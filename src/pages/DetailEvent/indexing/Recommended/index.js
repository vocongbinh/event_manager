import { forwardRef, memo } from 'react';
import styles from './Recommended.module.scss';
import classNames from 'classnames/bind';
const Recommended = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    return (
        <div ref={ref} className={cx('wrapper')}>
            <h1> Recommended for you</h1>
        </div>
    );
});

export default memo(Recommended);
