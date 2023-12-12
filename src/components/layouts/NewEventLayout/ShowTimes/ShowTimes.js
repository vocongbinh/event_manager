import { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import classNames from 'classnames/bind';
import style from './ShowTimes.module.scss';
import Button from '../../components/Button';
import ShowTime from '../ShowTime/ShowTime';
import { useNewEventFormContext, useNewEventStepContext } from '../../../../utils/newEventContext';
import { showtimesSchema } from '../../../../lib/validation';

const ShowTimes = ({ next }) => {
    const cx = classNames.bind(style);
    const newEventContext = useNewEventFormContext();
    const eventStepContext = useNewEventStepContext();
    const navigate = useNavigate();
    useEffect(() => {
        newEventContext.createEvent();
    }, [newEventContext.showtimes]);
    return (
        <div>
            <Formik
                initialValues={{
                    showtimes: newEventContext.showtimes,
                }}
                validationSchema={showtimesSchema}
                onSubmit={(values) => {
                    newEventContext.setShowTimes((prev) => values.showtimes);
                }}
            >
                <Form>
                    <FieldArray name="showtimes">
                        {({ push, remove, form }) => {
                            return (
                                <div className={cx('wrapper')}>
                                    {form.values.showtimes.length > 0 &&
                                        form.values.showtimes.map((_, index) => {
                                            return <ShowTime form={form} index={index} remove={remove} />;
                                        })}
                                    <button
                                        type="button"
                                        className={cx('add-showtime-button')}
                                        onClick={() =>
                                            push({
                                                startAt: null,
                                                endAt: null,
                                                startSaleTicketDate: null,
                                                endSaleTicketDate: null,
                                            })
                                        }
                                    >
                                        Thêm ngày sự kiện
                                    </button>
                                    <div className={cx('item-container')}>
                                        <Button
                                            type="button"
                                            onClick={() => eventStepContext.handleGoStep(0)}
                                            className={cx('next-button')}
                                            size="max"
                                            background="blue"
                                        >
                                            Go back
                                        </Button>

                                        <div className={cx('action')}>
                                            <Button
                                                type="primary"
                                                className={cx('next-button')}
                                                size="max"
                                                background="blue"
                                            >
                                                Continue
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            );
                        }}
                    </FieldArray>
                </Form>
            </Formik>
        </div>
    );
};

export default memo(ShowTimes);
