import styles from './EventTypeList.module.scss';
import classNames from 'classnames/bind';
import Images from '../../../../assets/images';
import { memo } from 'react';
const listCategorys = [
    {
        icon: Images.music,
        title: 'Live music',
        categories: [8],
    },
    {
        icon: Images.curture,
        title: 'Theater-Alt',
        categories: [9, 10],
    },
    {
        icon: Images.night,
        title: 'nightlife',
        categories: [11],
    },
    {
        icon: Images.community,
        title: 'Community',
        categories: [2, 3, 5, 7],
    },
    {
        icon: Images.course,
        title: 'Course',
        categories: [4],
    },
    {
        icon: Images.attraction,
        title: 'Attractions',
        categories: [13],
    },
    {
        icon: Images.sport,
        title: 'Sport',
        categories: [6, 12],
    },
];
const EventTypeList = () => {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('container')}>
            <div className={cx('container-events')}>
                {listCategorys.map((category) => (
                    <a className={cx('event-item')}>
                        <img className={cx('icon')} src={category.icon} />
                        <p className={cx('event-item-title')}>{category.title}</p>
                    </a>
                ))}
            </div>
        </div>
    );
};

export default memo(EventTypeList);
