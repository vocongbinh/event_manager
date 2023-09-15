import classNames from 'classnames/bind';
import styles from './SearchLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
function SearchLayout({ className }) {
    const cx = classNames.bind(styles);
    return (
        <div
            className={cx('search', {
                [className]: className,
            })}
        >
            <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
            <input placeholder="Search" className={cx('search-field')} />
            <FontAwesomeIcon icon={faClose} className={cx('close-icon')} />
        </div>
    );
}

export default SearchLayout;
