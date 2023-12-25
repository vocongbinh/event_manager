import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, FieldArray } from 'formik';
import classNames from 'classnames/bind';
import style from './EditShowtimes.module.scss';
import Button from '../../components/Button';
import ShowTime from '../../NewEventLayout/ShowTime';
import { editShowtimesSchema, showtimesSchema } from '../../../../lib/validation';
import { Spinner } from 'react-bootstrap';
import { useEditEventFormContext, useEditEventStepContext } from '../../../../utils/editEventContext';

const EditShowTimes = ({ next }) => {
    const cx = classNames.bind(style);
    const editEventContext = useEditEventFormContext();
    const eventStepContext = useEditEventStepContext();
    console.log(editEventContext.showtimes);
    const [isPending, setIsPending] = useState(false);
    return (
        <div>
            <Formik
                initialValues={{
                    showtimes: editEventContext.showtimes,
                }}
                validationSchema={editShowtimesSchema}
                onSubmit={async (values) => {
                    console.log('submit');
                    setIsPending(true);
                    await editEventContext.editEvent(values.showtimes);
                    setIsPending(false);
                }}
            >
                <Form>
                    <FieldArray name="showtimes">
                        {({ push, remove, form }) => {
                            return (
                                <div className={cx('wrapper')}>
                                    <div>{JSON.stringify(form.errors)}</div>

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
                                        <div className={cx('action')}>
                                            <Button
                                                buttonType="button"
                                                onClick={() => eventStepContext.handleGoBack(0)}
                                                className={cx('next-button')}
                                                size="max"
                                                background="blue"
                                            >
                                                Go back
                                            </Button>
                                            <Button
                                                buttonTyoe="submit"
                                                type="primary"
                                                className={cx('next-button')}
                                                size="max"
                                                background="blue"
                                                disabled={isPending}
                                            >
                                                {!isPending ? 'Continue' : <Spinner />}
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

export default memo(EditShowTimes);
