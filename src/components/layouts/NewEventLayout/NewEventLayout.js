import NewEventForm from './NewEventForm/NewEventForm';
import NewEventHeader from './NewEventHeader/NewEventHeader';
import style from './NewEventLayout.module.scss';
import classNames from 'classnames/bind';
import ShowTime from './ShowTime/ShowTime';
const NewEventLayout = () => {
    const cx = classNames.bind(style);

    return (
        <div className={cx('wrapper')}>
            <NewEventHeader />
            <disv className="container">
                <div className={cx('container1')}>
                    {/* <NewEventForm /> */}
                    <ShowTime />
                </div>
            </disv>
        </div>
    );
};

export default NewEventLayout;
