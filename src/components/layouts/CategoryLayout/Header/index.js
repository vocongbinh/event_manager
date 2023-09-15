import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleInfo, faLocation, faSailboat } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import Button from '../../components/Button';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import SearchLayout from '../../components/SearchLayout';

function Header() {
    const cx = classNames.bind(styles);
    const categories = [
        'Live music',
        'Art & Culture',
        'Theater & Plays',
        'Nightlife',
        'outdoor',
        'Conference',
        'Seminar/Courses',
        'Exhibitions',
        'Meetups',
        'Sports',
        'Community',
        'Attractions',
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    src="https://trinhvantuyen.com/wp-content/uploads/2022/03/hinh-anh-pikachu-1.jpg"
                    className={cx('logo')}
                />
                <SearchLayout className={cx('search-layout')} />
                <div className={`dropdown ${cx('location-wrapper')}`}>
                    <Button
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        className={` dropdown-toggle ${cx('location-btn')}`}
                        preIcon={<FontAwesomeIcon icon={faLocation} />}
                        sufIcon={<FontAwesomeIcon icon={faChevronDown} />}
                    >
                        Select your Location
                    </Button>
                    <ul className={`dropdown-menu ${cx('location-list')}`} aria-labelledby="dropdownMenuButton1">
                        <li>
                            <a className={`${cx('location-item')} dropdown-item`} href="#">
                                Ho Chi Minh
                            </a>
                        </li>
                        <li>
                            <a className={`${cx('location-item')} dropdown-item`} href="#">
                                Ha Noi
                            </a>
                        </li>
                        <li>
                            <a className={`${cx('location-item')} dropdown-item`} href="#">
                                Other locations
                            </a>
                        </li>
                    </ul>
                </div>
                <div className={cx('action')}>
                    <Button type="round" size="min">
                        binh ne
                    </Button>
                    <FontAwesomeIcon icon={faCircleInfo} className={cx('infor-icon')} />
                    <Button type="primary" size="min" preIcon={<Image src={Images.avatar} className={cx('avatar')} />}>
                        bình nè
                    </Button>
                </div>
            </div>
            <div className={cx('nav-bar')}>
                <h3 className={cx('event-tab')}>Hot Events</h3>
                <ul className={cx('categories')}>
                    {categories.map((category) => (
                        <li>{category}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;
