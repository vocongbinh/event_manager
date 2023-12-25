import style from './EditTickets.module.scss';
import classNames from 'classnames/bind';
import { Formik, Form, FieldArray } from 'formik';
import Button from '../../components/Button';
import Ticket from '../../NewEventLayout/Ticket';
import { memo } from 'react';
import { ticketsSchema } from '../../../../lib/validation';
import { getCategories } from '../../../../apiServices/chartService';
import { Spinner } from 'react-bootstrap';
import { useEditEventFormContext, useEditEventStepContext } from '../../../../utils/editEventContext';
const EditTickets = () => {
    const cx = classNames.bind(style);
    const editEventContext = useEditEventFormContext();
    const editEventStep = useEditEventStepContext();
    return (
        <div>
            <Formik
                initialValues={{
                    ticketTypes: editEventContext.tickets,
                }}
                validationSchema={ticketsSchema}
                onSubmit={(values) => {
                    console.log('submit');
                    editEventContext.setTickets(values.ticketTypes);
                    editEventStep.handleGoStep(2);
                }}
            >
                <Form>
                    <div className={cx('wrapper')}>
                        <FieldArray name={`ticketTypes`}>
                            {({ push, remove, form }) => {
                                return (
                                    <div>
                                        <div>{JSON.stringify(form.errors)}</div>
                                        {form.values.ticketTypes.length > 0 &&
                                            form.values.ticketTypes.map((ticket, ind) => {
                                                return <Ticket form={form} remove={remove} index={ind} />;
                                            })}
                                    </div>
                                );
                            }}
                        </FieldArray>
                    </div>
                    <div className={cx('item-container')}>
                        <div className={cx('action')}>
                            <Button
                                type="button"
                                onClick={() => editEventStep.handleGoStep(1)}
                                className={cx('next-button')}
                                size="max"
                                background="blue"
                            >
                                Go back
                            </Button>
                            <Button type="primary" className={cx('next-button')} size="max" background="blue">
                                Continue
                            </Button>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
};

export default memo(EditTickets);
