import styles from './OptionManager.module.scss';
import classNames from 'classnames/bind';
function OptionManager() {
    const cx = classNames.bind(styles);
    return (
        <div className="w-80">
            <div className={cx('wrapper')}>
                <div className={cx('information')}></div>
            </div>
        </div>
    );
}

export default OptionManager;
