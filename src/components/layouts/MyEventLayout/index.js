import classNames from 'classnames/bind';
import styles from './MyEventLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAddressCard, faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import InforItem from '../DefaultLayout/Header/InforItem';
import Image from '../components/Image';
import Button from '../components/Button';
import { useState } from 'react';
import Events from '../../../pages/myEvent/Events';
import OrganizerProfile from '../../../pages/myEvent/OrganizerProfile';
import { useAuthContext } from '../../../utils/authContext';
import Images from '../../../assets/images';
import { useNavigate } from 'react-router-dom';
function MyEventLayout({ children, ...props }) {
    const authContext = useAuthContext();
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const listOptions = [
        {
            title: 'Organizer Profile',
            icon: <FontAwesomeIcon icon={faAddressCard} />,
            path: '/my_event/organizer_profile',
            index: 0,
        },
        {
            title: 'Created Events',
            icon: <FontAwesomeIcon icon={faCalendar} />,
            path: '/my_event/events',
            index: 1,
        },
        // {
        //     title: 'My account balance',
        //     icon: <FontAwesomeIcon icon={faMoneyBill} />,
        //     path: '/my_event/account_balance',
        //     index: 2,
        // },
        // {
        //     title: 'Bank account information',
        //     icon: <FontAwesomeIcon icon={faPiggyBank} />,
        //     path: '/my_event/bank_account',
        //     index: 3,
        // },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('header')}>
                    <img
                        onClick={() => navigate('/')}
                        style={{ cursor: 'pointer' }}
                        alt=""
                        width="36px"
                        height="36px"
                        src={Images.logo}
                    />
                    <button>
                        {authContext.getUser().fullName || ''}
                        <span className={cx('name')}>
                            <img
                                alt=""
                                src={authContext.getUser().imageUrl ?? Images.avatar}
                                className={cx('avatar')}
                            />
                        </span>
                    </button>
                </div>
                {listOptions.map((item, index) => (
                    <InforItem
                        className={cx('infor-item', {
                            active: item.index === props.index,
                        })}
                        data={item}
                    />
                ))}
            </div>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default MyEventLayout;
