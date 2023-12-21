import { forwardRef, memo } from 'react';
import styles from './Calendar.module.scss';
import classNames from 'classnames/bind';
import Button from '../../../../components/layouts/components/Button';
import { format } from 'date-fns';
import { useAuthContext } from '../../../../utils/authContext';
import { useNavigate } from 'react-router-dom';
const Calendar = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    const navigate = useNavigate();
    return (
        <div ref={ref} className={cx('wrapper')}>
            <h1> calendar</h1>

            {data.map((item) => {
                const dateStart = format(new Date(item.startAt), 'EEEE, dd MMMM yyyy');
                const dateEnd = format(new Date(item.endAt), 'EEEE, dd MMMM yyyy');
                const timeStart = format(new Date(item.startAt), 'hh:mm aa');
                const timeEnd = format(new Date(item.endAt), 'hh:mm aa');
                let status;
                if (timeStart < new Date()) {
                    status = {
                        content: 'Event is over',
                        onClick: () => {},
                    };
                } else
                    status = {
                        content: 'Book now',
                        onClick: () => {
                            let path = authContext.getUser() ? `book/${item._id}/step1` : '/auth/login';
                            navigate(path);
                        },
                    };
                return (
                    <div className={`row ${cx('item')}`}>
                        <div className={`col-sm-9 col-12 ${cx('information')}`}>
                            <p className={cx('date')}>{`${dateStart}-${dateEnd}`}</p>
                            <p className={cx('time')}>{`${timeStart}-${timeEnd}`}</p>
                        </div>
                        <div className="col-sm-3 col-12">
                            <Button
                                onClick={status.onClick}
                                type="highlight"
                                size="max"
                                className={cx('book-btn', {
                                    expired: status.content === 'Event is over',
                                })}
                            >
                                {status.content}
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

export default memo(Calendar);
