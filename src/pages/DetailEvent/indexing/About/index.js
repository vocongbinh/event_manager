import { forwardRef, memo } from 'react';
import styles from './About.module.scss';
import classNames from 'classnames/bind';
const About = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    return (
        <div ref={ref} className={cx('wrapper')}>
            <h1> about</h1>
            <div className={cx('content')}>{data}</div>
            {/* <div dangerouslySetInnerHTML={{ __html: data }}></div> */}
        </div>
    );
});

export default memo(About);
