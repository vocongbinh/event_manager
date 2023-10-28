import { forwardRef, memo } from 'react';
import styles from './Calendar.module.scss';
import classNames from 'classnames/bind';
import Button from '../../../../components/layouts/components/Button';
const Calendar = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div ref={ref} className={cx('wrapper')}>
            <h1> calendar</h1>

            {data.map((item) => {
                let startTime = new Date(Date.parse(item.startAt));
                const startHours = ('0' + startTime.getHours()).slice(-2);
                const startMinutes = ('0' + startTime.getMinutes()).slice(-2);
                const startMonth = months[startTime.getMonth()];
                const startYear = startTime.getFullYear();
                const startDay = days[startTime.getDay()];
                const startDate = startTime.getDate();
                const dateStart = `${startDay}, ${startDate} ${startMonth} ${startYear}`;
                const timeStart = `${startHours}:${startMinutes}`;
                let endTime = new Date(Date.parse(item.endAt));
                const endHours = ('0' + endTime.getHours()).slice(-2);
                const endMinutes = ('0' + endTime.getMinutes()).slice(-2);
                const endMonth = months[endTime.getMonth()];
                const endYear = endTime.getFullYear();
                const endDay = days[endTime.getDay()];
                const endDate = endTime.getDate();
                const dateEnd = `${endDay}, ${endDate} ${endMonth} ${endYear}`;
                const timeEnd = `${endHours}:${endMinutes}`;

                return (
                    <div className={`row ${cx('item')}`}>
                        <div className={`col-sm-9 col-12 ${cx('information')}`}>
                            <p className={cx('date')}>{`${dateStart}-${dateEnd}`}</p>
                            <p className={cx('time')}>{`${timeStart}-${timeEnd}`}</p>
                        </div>
                        <div className="col-sm-3 col-12">
                            <Button
                                href={`book/${item._id}/step1`}
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
