import { forwardRef, memo } from 'react';
import styles from './Calendar.module.scss';
import classNames from 'classnames/bind';
import Button from '../../../../components/layouts/components/Button';
import { format } from 'date-fns';
import { useAuthContext } from '../../../../utils/authContext';
const Calendar = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    return (
        <div ref={ref} className={cx('wrapper')}>
            <h1> calendar</h1>

            {data.map((item) => {
                const dateStart = format(new Date(item.startAt), 'EEEE, dd MMMM yyyy');
                const dateEnd = format(new Date(item.endAt), 'EEEE, dd MMMM yyyy');
                const timeStart = format(new Date(item.startAt), 'hh:mm aa');
                const timeEnd = format(new Date(item.endAt), 'hh:mm aa');
                return (
                    <div className={`row ${cx('item')}`}>
                        <div className={`col-sm-9 col-12 ${cx('information')}`}>
                            <p className={cx('date')}>{`${dateStart}-${dateEnd}`}</p>
                            <p className={cx('time')}>{`${timeStart}-${timeEnd}`}</p>
                        </div>
                        <div className="col-sm-3 col-12">
                            <Button
                                href={authContext.getUser() ? `book/${item._id}/step1` : '/auth/login'}
                                type="highlight"
                                size="max"
                                className={cx('book-btn')}
                            >
                                Book now
                            </Button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
});

export default memo(Calendar);
