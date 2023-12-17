import styles from './AdminLayout.module.scss';
import classNames from 'classnames/bind';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './indexes/Dashboard';
import Events from './indexes/Events';
import { useState } from 'react';
function AdminLayout({ children }) {
    const cx = classNames.bind(styles);
    const [selected, setSelected] = useState(0);
    const options = [
        {
            index: 0,
            title: 'Events',
            layout: <Events />,
        },
        {
            index: 1,
            title: 'Statistics',
            layout: <Dashboard />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar options={options} selected={selected} setSelected={setSelected} />
                <div className={cx('content')}>{options[selected].layout}</div>
            </div>
        </div>
    );
}

export default AdminLayout;
