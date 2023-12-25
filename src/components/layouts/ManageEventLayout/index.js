import classNames from 'classnames/bind';
import styles from './ManageEventLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faBullhorn,
    faChartLine,
    faCircleArrowLeft,
    faEdit,
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
import Summary from '../../../pages/myEvent/Events/OptionManager/Summary';
// import { createBrowserHistory } from 'history';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../utils/authContext';
import Images from '../../../assets/images';
function ManageEventLayout({ children, ...props }) {
    const location = useLocation();
    const current = location.pathname;
    const authContext = useAuthContext();
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const listOptions = [
        {
            title: 'Back to my event',
            icon: <FontAwesomeIcon icon={faCircleArrowLeft} />,
            path: '/my_event/events/',
            index: 0,
        },
        {
            title: 'Summary',
            icon: <FontAwesomeIcon icon={faChartLine} />,
            path: current.split('/').slice(0, -1).join('/') + '/summary',
            index: 1,
        },
        {
            title: 'RSVPs',
            icon: <FontAwesomeIcon icon={faUsersRays} />,
            path: current.split('/').slice(0, -1).join('/') + '/RSVPs',
            index: 2,
        },
        {
            title: 'Promote',
            icon: <FontAwesomeIcon icon={faBullhorn} />,
            path: current.split('/').slice(0, -1).join('/') + '/promote',
            index: 3,
        },
        {
            title: 'Discount code',
            icon: <FontAwesomeIcon icon={faGift} />,
            path: current.split('/').slice(0, -1).join('/') + '/discount',
            index: 4,
        },
        {
            title: 'Moderator',
            icon: <FontAwesomeIcon icon={faGift} />,
            path: current.split('/').slice(0, -1).join('/') + '/moderator',
            index: 5,
        },
        {
            title: 'Edit',
            icon: <FontAwesomeIcon icon={faEdit} />,
            path: current.split('/').slice(0, -1).join('/') + '/edit',
            index: 6,
        },
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

                    <Button className={cx('avt-btn')}>
                        {authContext.getUser().fullName || ''}
                        <span className={cx('name')}>
                            <img alt="" src={authContext.getUser().imageUrl} className={cx('avatar')} />
                        </span>
                    </Button>
                </div>
                {listOptions.map((item, index) => {
                    if (item.component === children) console.log('ff');
                    else console.log('fdsfd');
                    return (
                        <InforItem
                            className={cx('infor-item', {
                                active: item.index === props.index,
                            })}
                            data={item}
                        />
                    );
                })}
            </div>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default ManageEventLayout;
