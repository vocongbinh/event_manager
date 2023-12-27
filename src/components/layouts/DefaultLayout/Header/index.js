import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCircleInfo,
    faGear,
    faRightFromBracket,
    faSailboat,
    faTicket,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import SearchLayout from '../../components/SearchLayout';
import Tippy from '@tippyjs/react/headless';
import CategoryItem from '../Sidebar/CategoryItem';
import InforItem from './InforItem';
import { useContext, useEffect, useState } from 'react';
import { useAuthContext } from '../../../../utils/authContext';
import { Link, useNavigate } from 'react-router-dom';
import { getOrganizerProfile } from '../../../../apiServices/organizerService';
function Header() {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    const navigate = useNavigate();

    let userOptions = [
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
            onClick: () => authContext.logOut(),
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        },
    ];
    useEffect(() => {
        const fetchOrganizerProfile = async () => {
            getOrganizerProfile()
                .then((data) => {
                    authContext.setOrganizer(data);
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        fetchOrganizerProfile();
    }, []);

    const user = authContext.getUser();
    if (user) {
        if (user.role === 'admin')
            userOptions = [
                {
                    title: 'Edit Profile',
                    icon: <FontAwesomeIcon icon={faGear} />,
                    path: '/auth/profile',
                },
                {
                    title: 'Manage Events',
                    icon: <FontAwesomeIcon icon={faUser} />,
                    path: '/admin',
                },

                {
                    title: 'Exit',
                    onClick: () => authContext.logOut(),
                    icon: <FontAwesomeIcon icon={faRightFromBracket} />,
                },
            ];
    }

    return (
        <div className={cx('wrapper')}>
            <Link to="/">
                <img src={Images.logo} className={cx('logo')} />
            </Link>
            <SearchLayout className={cx('search-layout')} />
            <div className={cx('action')}>
                <Button
                    className={cx('create-btn')}
                    to={authContext.getOrganizer() ? '/newEvent' : '/organizer/profile'}
                    target="_blank"
                    type="round"
                    size="min"
                >
                    Create event
                </Button>
                <div
                    onClick={() => {
                        navigate('/my_tickets');
                    }}
                    className={cx('tickets')}
                >
                    <FontAwesomeIcon size="2x" color="#828BA0" icon={faTicket} />
                </div>

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
