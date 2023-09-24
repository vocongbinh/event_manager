import styles from './Recommended.module.scss';
import classNames from 'classnames/bind';
function Recommended({ data }) {
    const cx = classNames.bind(styles);
    return <div className={cx('wrapper')}></div>;
}

export default Recommended;
