import React from 'react';
import style from './ChartItem.module.scss';
import classNames from 'classnames/bind';
const ChartItem = () => {
    const chart = {
        name: 'dsks',
        status: '',
        thumnail: '',
    };
    const cx = classNames.bind(style);
    return (
        <div>
            <image className={cx('chart-thumail')} />
            <div className={cx('')}>
                <p></p>
            </div>
        </div>
    );
};

export default ChartItem;
