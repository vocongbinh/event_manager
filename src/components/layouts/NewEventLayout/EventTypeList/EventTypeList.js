import styles from './EventTypeList.module.scss';
import classNames from 'classnames/bind';
import { memo, useState } from 'react';
import Button from '../../components/Button';
import { useNewEventFormContext, useNewEventStepContext } from '../../../../utils/newEventContext';
import { listCategorys } from '../../../../constants';

const EventTypeList = ({ next }) => {
    const [selectedList, setSelectedList] = useState([]);
    const [showError, setShowError] = useState(false);
    const cx = classNames.bind(styles);
    const eventFormContext = useNewEventFormContext();
    const eventStepContext = useNewEventStepContext();
    const handleNext = () => {
        if (selectedList.length == 0) {
            setShowError(true);
        } else {
            const selectedCate = selectedList.map((item) => listCategorys[item].title);
            console.log(selectedCate);
            eventFormContext.setEventTypes(selectedCate);
            eventStepContext.setStep(1);
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
