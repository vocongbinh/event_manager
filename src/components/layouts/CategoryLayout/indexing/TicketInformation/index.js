import { forwardRef } from 'react';
import TicketItem from '../TicketInformation/TicketItem';
import classNames from 'classnames/bind';
import styles from './TicketInformation.module.scss';

const TicketInformation = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    return (
        <div ref={ref} className={cx('wrapper')}>
            <h1> ticket information</h1>
            <TicketItem data={{ name: 'binh', price: 100000, status: 'online booking closed' }} />
            <TicketItem data={{ name: 'binh', price: 100000 }} />
            <TicketItem data={{ name: 'binh', price: 100000, status: 'online booking closed' }} />
        </div>
    );
});

export default TicketInformation;
