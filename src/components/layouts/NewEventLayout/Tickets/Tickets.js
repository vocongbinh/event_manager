import style from './Tickets.module.scss';
import classNames from 'classnames/bind';
import { Formik, Form, FieldArray } from 'formik';
import Button from '../../components/Button';
import { useNewEventFormContext, useNewEventStepContext } from '../../../../utils/newEventContext';
import Ticket from '../Ticket';
import { memo, useEffect, useState } from 'react';
import { ticketsSchema } from '../../../../lib/validation';
import { getCategories } from '../../../../apiServices/chartService';
import { Spinner } from 'react-bootstrap';
const Tickets = () => {
    const cx = classNames.bind(style);
    const newEventContext = useNewEventFormContext();
    const newEventStep = useNewEventStepContext();
    const [isPending, setIsPending] = useState(true);
    const [tickets, setTickets] = useState([]);
    let updatedTickets = [...newEventContext.tickets];
    useEffect(() => {
        const fetchData = async () => {
            const categories = await getCategories(newEventContext.chart);
            if (categories != undefined) {
                categories.forEach((category) => {
                    updatedTickets.push({
                        isFree: false,
                        ticketTypeName: category.label,
                        ticketTypePrice: '',
                        ticketTypeDescription: '',
                        ticketImage: null,
                        ticketColor: category.color,
                        minPerOrder: '',
                        maxPerOrder: '',
                    });
                });
                setTickets(updatedTickets);
                console.log('its false' + JSON.stringify(updatedTickets));
                setIsPending(false);
            }
        };
        fetchData();
    }, []);
    return !isPending ? (
        <div>
            <Formik
                initialValues={{
                    ticketTypes: tickets,
                }}
                validationSchema={ticketsSchema}
                onSubmit={(values) => {
                    console.log('submit');
                    newEventContext.setTickets(values.ticketTypes);
                    newEventStep.handleGoStep(4);
                }}
            >
                <Form>
                    <div className={cx('wrapper')}>
                        <FieldArray name={`ticketTypes`}>
                            {({ push, remove, form }) => {
                                return (
                                    <div>
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
                                onClick={() => newEventStep.handleGoStep(2)}
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
    ) : (
        <div className={cx('spinner')}>
            <Spinner />
        </div>
    );
};

export default memo(Tickets);
