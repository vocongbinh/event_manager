import classNames from 'classnames/bind';
import styles from './SearchLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faSearch } from '@fortawesome/free-solid-svg-icons';
function SearchLayout() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('search')}>
            <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
            <input placeholder="Tìm kiếm" className={cx('search-field')} />
            <FontAwesomeIcon icon={faClose} className={cx('close-icon')} />
        </div>
    );
}

export default SearchLayout;
