import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSailboat } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import SearchLayout from '../../components/SearchLayout';
function Header() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://trinhvantuyen.com/wp-content/uploads/2022/03/hinh-anh-pikachu-1.jpg"
                className={cx('logo')}
            />
            <SearchLayout className={cx('search-layout')} />
            <div className={cx('action')}>
                <Button type="round" size="min">
                    Create event
                </Button>
                <FontAwesomeIcon icon={faCircleInfo} className={cx('infor-icon')} />
                <Button type="primary" size="min" preIcon={<Image src={Images.avatar} className={cx('avatar')} />}>
                    bình nè
                </Button>
            </div>
        </div>
    );
}

export default Header;
