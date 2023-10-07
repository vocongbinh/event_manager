import { forwardRef, memo, useEffect } from 'react';
import TicketItem from '../TicketInformation/TicketItem';
import classNames from 'classnames/bind';
import styles from './TicketInformation.module.scss';
import * as ticketService from '../../../../apiServices/ticketService';
const TicketInformation = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    return (
        <div ref={ref} className={cx('wrapper')}>
            <h1> ticket information</h1>
            {data.map((item) => (
                <TicketItem data={{ name: item.ticketName, price: item.price }} />
            ))}
        </div>
    );
});

export default memo(TicketInformation);
