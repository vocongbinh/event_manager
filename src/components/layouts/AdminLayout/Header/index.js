import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear, faRightFromBracket, faSailboat, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';

import Image from '../../components/Image';
import SearchLayout from '../../components/SearchLayout';
import Tippy from '@tippyjs/react/headless';
import InforItem from '../../DefaultLayout/Header/InforItem';

import { useAuthContext } from '../../../../utils/authContext';
import { Link } from 'react-router-dom';
import Images from '../../../../assets/images';
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
            title: 'Exit',
            onClick: () => authContext.logOut(),
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        },
    ];
    const user = authContext.getUser();
    console.log(user);
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://trinhvantuyen.com/wp-content/uploads/2022/03/hinh-anh-pikachu-1.jpg"
                className={cx('logo')}
            />
            <SearchLayout className={cx('search-layout')} />
            <div className={cx('action')}>
                {authContext.getUser() ? (
                    <Tippy
                        maxWidth="100%"
                        hideOnClick={false}
                        onClickOutside={(ins) => ins.hide()}
                        placement="bottom-end"
                        interactive
                        render={(attrs) => (
                            <div className={cx('tippy-wrapper')} tab {...attrs}>
                                {userOptions.map((option) => (
                                    <InforItem
                                        onClick={() => {
                                            if (option.title === 'Exit') {
                                                authContext.logOut();
                                            }
                                        }}
                                        data={option}
                                    />
                                ))}
                            </div>
                        )}
                    >
                        <Button
                            type="primary"
                            size="min"
                            preIcon={<Image src={user.imageUrl ?? Images.avatar} className={cx('avatar')} />}
                        >
                            {user.fullName}
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
