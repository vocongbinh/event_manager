import FormHeader from '../components/FormHeader';
import style from './NewEventLayout.module.scss';
import classNames from 'classnames/bind';
import InforItem from '../DefaultLayout/Header/InforItem';
import { NewEventFormProvider, useNewEventStepContext } from '../../../utils/newEventContext';
import { createEventSteps } from '../../../constants';
import { Outlet } from 'react-router-dom';
const NewEventLayout = () => {
    const cx = classNames.bind(style);
    const newEventStep = useNewEventStepContext();
    return (
        <div className={cx('content-wrapper')}>
            {/* <div className={cx('sidebar')}>
                <div className={cx('header')}>
                    <img
                        width="4em"
                        height="48px"
                        // className={cx('avatar')}
                        src="https://cdn.pixabay.com/photo/2020/07/21/16/10/pokemon-5426712_960_720.png"
                    />
                    <button>
                        bình nè
                        <span className={cx('name')}>
                            <img
                                src={'https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/pokemon-sleep-1.jpg'}
                                className={cx('avatar')}
                            />
                        </span>
                    </button>
                </div>
                {createEventSteps.map((item, index) => (
                    <InforItem
                        className={cx('infor-item', {
                            selected: index === newEventStep.step,
                        })}
                        data={item}
                        onClick={() => {
                            console.log(newEventStep.maxStep);
                            if (index <= newEventStep.maxStep) {
                                console.log('change step');
                                newEventStep.setStep(index);
                            }
                        }}
                    />
                ))}
            </div> */}
            <FormHeader header={createEventSteps[newEventStep.step].header ?? ''} />

            <div className={cx('container1')}>
                <Outlet />
            </div>
        </div>
    );
};

export default NewEventLayout;
