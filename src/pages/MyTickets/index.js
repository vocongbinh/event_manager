import { useState } from 'react';
import styles from './MyTickets.module.scss';
import classNames from 'classnames/bind';
import Button from '../../components/layouts/components/Button';
import { useQuery } from '@tanstack/react-query';
import * as myService from '../../apiServices/myService';
import QRCode from 'react-qr-code';
import MyEvents from './indexing/myEvents';
import MyCoupons from './indexing/myCoupons';
function MyTickets() {
    const cx = classNames.bind(styles);
    const [selected, setSelected] = useState(0);
    const listTabs = [
        {
            title: 'Events',
            index: 0,
            component: <MyEvents />,
        },
        {
            title: 'Vouchers',
            index: 1,
            component: <MyCoupons />,
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h3 className={cx('title')}>Your Tickets</h3>
            <div className={cx('header')}>
                {listTabs.map((item, index) => (
                    <div
                        className={cx('tab-item', {
                            selected: selected === item.index,
                        })}
                        onClick={() => setSelected(index)}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
            <div className={cx('container')}>{listTabs[selected].component}</div>
        </div>
    );
}

export default MyTickets;
