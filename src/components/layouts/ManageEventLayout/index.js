import classNames from 'classnames/bind';
import styles from './ManageEventLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faBullhorn,
    faChartLine,
    faCircleArrowLeft,
    faGift,
    faUserGroup,
    faUsersRays,
} from '@fortawesome/free-solid-svg-icons';
import InforItem from '../DefaultLayout/Header/InforItem';
import Image from '../components/Image';
import Button from '../components/Button';
import { useState } from 'react';
import Events from '../../../pages/myEvent/Events';
import OrganizerProfile from '../../../pages/myEvent/OrganizerProfile';

function ManageEventLayout({ children }) {
    const cx = classNames.bind(styles);
    const listOptions = [
        {
            title: 'Back to my event',
            icon: <FontAwesomeIcon icon={faCircleArrowLeft} />,
            path: '/my_event/organizer_profile',
        },
        {
            title: 'Summary',
            icon: <FontAwesomeIcon icon={faChartLine} />,
            path: '/my_event/organizer_profile',
        },
        {
            title: 'RSVPS   ',
            icon: <FontAwesomeIcon icon={faUserGroup} />,
            path: '/my_event/events',
        },
        {
            title: 'Promote',
            icon: <FontAwesomeIcon icon={faBullhorn} />,
            path: '/my_event/account_balance',
        },
        {
            title: 'Discount code',
            icon: <FontAwesomeIcon icon={faGift} />,
            path: '/my_event/bank_account',
        },
        {
            title: 'Moderator',
            icon: <FontAwesomeIcon icon={faUsersRays} />,
            path: '/my_event/bank_account',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('header')}>
                    <img
                        alt=""
                        width="48px"
                        height="48px"
                        src="https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_960_720.png"
                    />
                    <button>
                        bình nè
                        <span className={cx('name')}>
                            <img
                                alt=""
                                src={'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/pokemon-sleep-1.jpg'}
                                className={cx('avatar')}
                            />
                        </span>
                    </button>
                </div>
                {listOptions.map((item, index) => (
                    <InforItem className={cx('infor-item')} data={item} />
                ))}
            </div>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default ManageEventLayout;
