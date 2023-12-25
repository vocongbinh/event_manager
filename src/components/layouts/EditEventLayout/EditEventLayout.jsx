import FormHeader from '../components/FormHeader';
import style from './EditEventLayout.module.scss';
import classNames from 'classnames/bind';
import { useEditEventStepContext } from '../../../utils/editEventContext';
import { editEventSteps } from '../../../constants';
import { Outlet } from 'react-router-dom';
const EditEventLayout = () => {
    const cx = classNames.bind(style);
    const editEventStepContext = useEditEventStepContext();

    return (
        <div className={cx('content-wrapper')}>
            <FormHeader header={editEventSteps[editEventStepContext.step].header ?? ''} />

            <div className={cx('container1')}>
                <Outlet />
            </div>
        </div>
    );
};

export default EditEventLayout;
