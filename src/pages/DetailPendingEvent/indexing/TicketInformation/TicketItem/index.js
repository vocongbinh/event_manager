import styles from './TicketItem.module.scss';
import classNames from 'classnames/bind';
function TicketItem({ data }) {
    const cx = classNames.bind(styles);
    return (
        <div className="container">
            <div className={cx('wrapper')}>
                <div className="col-sm-7">
                    <p className={cx('name')}> {data.name} </p>
                </div>
                <div className="col-sm-5">
                    <div className={cx('cost')}>
                        <div className={cx('value')}>{data.price} VND</div>
                        {data.status && <p className={cx('status')}>{data.status}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TicketItem;
