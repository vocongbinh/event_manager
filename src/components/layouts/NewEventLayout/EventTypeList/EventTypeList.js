import styles from './EventTypeList.module.scss';
import classNames from 'classnames/bind';
import Images from '../../../../assets/images';
import { memo, useState } from 'react';
import Button from '../../components/Button';
import { useNewEventFormContext } from '../../../../utils/newEventContext';
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

const EventTypeList = ({ next }) => {
    const [selectedList, setSelectedList] = useState([]);
    const [showError, setShowError] = useState(false);
    const cx = classNames.bind(styles);
    const eventFormContext = useNewEventFormContext();
    const handleNext = () => {
        if (selectedList.length == 0) {
            setShowError(true);
        } else {
            // console.log(eventFormContext);
            eventFormContext.updateNewEvent({ eventTypeList: [...selectedList] });
            next(1);
        }
    };
    console.log('render eventlist');
    return (
        <div className={cx('container')}>
            <div className={cx('container-events')}>
                {listCategorys.map((category, index) => (
                    <div
                        onClick={() => {
                            if (selectedList.includes(index)) {
                                setSelectedList([...selectedList].filter((value) => value !== index));
                            } else {
                                if (selectedList.length < 2) {
                                    setSelectedList([...selectedList, index]);
                                } else {
                                    const newSelectedList = [...selectedList];
                                    newSelectedList.splice(0, 1, index);
                                    setSelectedList(newSelectedList);
                                }
                            }
                        }}
                        className={cx('event-item', {
                            isSelected: selectedList.includes(index),
                            // isSelected: true,
                        })}
                    >
                        <img className={cx('icon')} src={category.icon} />
                        <p className={cx('event-item-title')}>{category.title}</p>
                    </div>
                ))}
            </div>
            {showError && selectedList.length == 0 ? (
                <div className={cx('showtime-errors')}>
                    <div className={cx('showtime-label')}>Bạn vui lòng chọn loại sự kiện!</div>
                </div>
            ) : null}

            <div className={cx('action')}>
                <Button onClick={handleNext} type="primary" className={cx('next-button')} size="max" background="blue">
                    Tiếp theo
                </Button>
            </div>
        </div>
    );
};

export default memo(EventTypeList);
