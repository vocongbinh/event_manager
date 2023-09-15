import styles from './CategoryLayout.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
function CategoryLayout({ children }) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <div className={cx('content')}></div>
            </div>
        </div>
    );
}

export default CategoryLayout;
