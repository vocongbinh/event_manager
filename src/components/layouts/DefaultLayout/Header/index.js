import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear, faRightFromBracket, faSailboat, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import SearchLayout from '../../components/SearchLayout';
import Tippy from '@tippyjs/react/headless';
import CategoryItem from '../Sidebar/CategoryItem';
import InforItem from './InforItem';
import { useContext } from 'react';
import { useAuthContext } from '../../../../utils/authContext';
import { Link } from 'react-router-dom';
function Header() {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    const userOptions = [
        {
            title: 'Edit Profile',
            icon: <FontAwesomeIcon icon={faGear} />,
            path: '/auth/profile',
        },
        {
            title: 'My organization Profile',
            icon: <FontAwesomeIcon icon={faUser} />,
            path: '/my_event/events/',
        },
        {
            title: 'Exit',
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://trinhvantuyen.com/wp-content/uploads/2022/03/hinh-anh-pikachu-1.jpg"
                className={cx('logo')}
            />
            <SearchLayout className={cx('search-layout')} />
            <div className={cx('action')}>
                <Button className={cx('create-btn')} to="/newevent" target="_blank" type="round" size="min">
                    Create event
                </Button>
                <FontAwesomeIcon icon={faCircleInfo} className={cx('infor-icon')} />
                {Object.keys(authContext.userInfo).length > 0 ? (
                    <Tippy
                        placement="bottom-end"
                        interactive
                        render={(attrs) => (
                            <div className={cx('tippy-wrapper')} tab {...attrs}>
                                {userOptions.map((option) => (
                                    <InforItem data={option} />
                                ))}
                            </div>
                        )}
                    >
                        <Button
                            type="primary"
                            size="min"
                            preIcon={<Image src={Images.avatar} className={cx('avatar')} />}
                        >
                            bình nè
                        </Button>
                    </Tippy>
                ) : (
                    <Link to="/auth/login" className={cx('signUp-btn')}>
                        Log in | sign up
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Header;
