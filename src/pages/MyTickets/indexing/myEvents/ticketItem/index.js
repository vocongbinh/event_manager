import React from 'react';
import classNames from 'classnames/bind';
import QRCode from 'react-qr-code';
import styles from './TicketItem.module.scss';
const TicketItem = ({ id, image, seat, customer, type, discount, price, event, date, address }) => {
    const cx = classNames.bind(styles);
    const seats = seat.length > 1 ? seat.join(', ') : seat[0];
    return (
        <div className={`row-12 ${cx('wticket')}`}>
            <div className={`col-3 ${cx('wimage')}`}>
                <QRCode className={cx('qrCode')} value={id} />
            </div>

            <div className="col-9 d-flex align-items-center">
                <div className={cx('wcontent')}>
                    <div className={cx('circle-top')}></div>
                    <div className={cx('wcontent1')}>
                        <div className={cx('header-ticket')}>
                            <div className={cx('header-ticket-name')}>
                                <p className={cx('ticket-name')}>{event}</p>
                            </div>
                        </div>

                        <div className={cx('dcontent')}>
                            <div>
                                <div className={cx('item-title')}>Ticket Type</div>
                                <div className={cx('item-content')}>{type}</div>
                                <div className={cx('item-title')}>Position</div>
                                <div className={cx('item-content')}>{seats}</div>
                                <div className={cx('item-title')}>Date</div>
                                <div className={cx('item-content')}>{date}</div>
                            </div>
                            <div>
                                <div className={cx('item-title')}>Price</div>
                                <div className={cx('item-content')}>{price}đ</div>
                                <div className={cx('item-title')}>Discount</div>
                                <div className={cx('item-content')}>{discount}%</div>
                                <div className={cx('item-title')}>Address</div>
                                <p className={cx('event-place', 'item-content')}>{address}</p>
                            </div>
                        </div>
                    </div>

                    <div className={cx('circle-bottom')}></div>
                </div>
                <img className={cx('ticket-image')} src={image} />
            </div>
        </div>
    );
};

export default TicketItem;
