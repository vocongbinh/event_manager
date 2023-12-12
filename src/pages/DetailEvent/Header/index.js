import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircleInfo, faLocation, faPlus } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import Button from '../../../components/layouts/components/Button';
import Images from '../../../assets/images';
import Image from '../../../components/layouts/components/Image';
import SearchLayout from '../../../components/layouts/components/SearchLayout';
import DropdownButton from '../../../components/layouts/components/DropdownButton';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../utils/authContext';
function Header() {
    const cx = classNames.bind(styles);
    const categories = ['Live music', 'Theater-Art', 'Nightlife', 'Community', 'Course', 'Attractions', 'Sport'];
    const listLocation = ['Ho Chi Minh', 'Ha Noi', 'Other locations'];
    const navigate = useNavigate();
    const authContext = useAuthContext();
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <img
                    onClick={() => navigate('/')}
                    alt=""
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
                        {listLocation.map((location) => (
                            <li
                                className={`${cx('location-item')} dropdown-item`}
                                onClick={() => navigate(`/events/typeEvent?address=${location}`)}
                            >
                                {location}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={cx('action')}>
                    {authContext.getUser() ? (
                        <DropdownButton />
                    ) : (
                        <Button to="/auth/login" className={cx('login-btn')}>
                            log in | sign up
                        </Button>
                    )}
                    <FontAwesomeIcon icon={faCircleInfo} className={cx('infor-icon')} />
                    <Button
                        className={cx('create-btn')}
                        size="min"
                        preIcon={<FontAwesomeIcon icon={faPlus} className={cx('add-icon')} />}
                    >
                        Create event
                    </Button>
                </div>
            </div>
            <div className={cx('nav-bar')}>
                <h3 className={cx('event-tab', 'hot')}>Hot Events</h3>
                <ul className={cx('categories')}>
                    {categories.map((category) => (
                        <li
                            onClick={() => {
                                navigate(`/events/typeEvent?types=${category}`);
                            }}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Header;
