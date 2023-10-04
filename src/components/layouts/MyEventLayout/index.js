import classNames from 'classnames/bind';
import styles from './MyEventLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAddressCard, faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import InforItem from '../DefaultLayout/Header/InforItem';
import Image from '../components/Image';
import Button from '../components/Button';
import { useState } from 'react';

function MyEventLayout({ children, ...props }) {
    const cx = classNames.bind(styles);
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
                {props.sidebarItems.map((item, index) => (
                    <InforItem className={cx('infor-item')} data={item} />
                ))}
            </div>
            <div className={cx('container')}>{children}</div>
        </div>
    );
}

export default MyEventLayout;
