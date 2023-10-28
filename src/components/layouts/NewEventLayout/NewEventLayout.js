import NewEventHeader from './NewEventHeader/NewEventHeader';
import style from './NewEventLayout.module.scss';
import classNames from 'classnames/bind';
import ShowTime from './ShowTime/ShowTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faAddressCard, faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import InforItem from '../DefaultLayout/Header/InforItem';
import { useState } from 'react';

import EventTypeList from '../NewEventLayout/EventTypeList';
import NewEventForm from './NewEventForm/NewEventForm';
import ShowTimes from './ShowTimes/ShowTimes';
const NewEventLayout = () => {
    const cx = classNames.bind(style);
    const [step, setStep] = useState(0);
    const listOptions = [
        {
            title: 'Loại sự kiện',
            header: 'Chọn loại sự kiện bạn muốn tổ chức',
            icon: <FontAwesomeIcon icon={faAddressCard} />,
            component: <EventTypeList />,
        },
        {
            title: 'Thông tin sự kiện',
            header: 'Điền thông tin cơ bản của sự kiện',
            icon: <FontAwesomeIcon icon={faCalendar} />,
            component: <NewEventForm />,
        },
        {
            title: 'Loại vé',
            header: 'Thêm loại vé cho sự kiện',
            icon: <FontAwesomeIcon icon={faMoneyBill} />,
        },
        {
            title: 'Thời gian',
            header: 'Chọn thời gian cho sự kiện',
            icon: <FontAwesomeIcon icon={faMoneyBill} />,
        },
    ];

    return (
        <div className={cx('content-wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('header')}>
                    <img
                        alt=""
                        width="48px"
                        height="48px"
                        src="https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_960_720.png"
                    />
                    <button>
                        bình nè
                        <span className={cx('name')}>
                            <img
                                alt=""
                                src={'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/pokemon-sleep-1.jpg'}
                                className={cx('avatar')}
                            />
                        </span>
                    </button>
                </div>
                {listOptions.map((item, index) => (
                    <InforItem
                        className={cx('infor-item', {
                            selected: index === step,
                        })}
                        data={item}
                        onClick={() => setStep(index)}
                    />
                ))}
            </div>
            <div className={cx('container')}>
                <NewEventHeader header={listOptions[step].header} />

                <div hidden={step != 0} className={cx('container1')}>
                    <EventTypeList />
                </div>
                <div hidden={step != 1} className={cx('container1')}>
                    <NewEventForm />
                </div>

                <div hidden={step != 2 && step != 3} className={cx('container1')}>
                    <ShowTimes step={step} />
                </div>
            </div>
        </div>
    );
};

export default NewEventLayout;
