import style from './Tickets.module.scss';
import classNames from 'classnames/bind';
import { Formik, Form, FieldArray } from 'formik';
import Button from '../../components/Button';
import { useNewEventFormContext, useNewEventStepContext } from '../../../../utils/newEventContext';
import Ticket from '../Ticket';
import { memo, useEffect, useState } from 'react';
import { ticketsSchema } from '../../../../lib/validation';
import { useGetCategories } from '../../../../lib/react-query/useQueryAndMutation';
const Tickets = ({ next }) => {
    const cx = classNames.bind(style);
    const newEventContext = useNewEventFormContext();
    const newEventStep = useNewEventStepContext();
    const { data: categories, isPending } = useGetCategories(newEventContext.chart);
    const [tickets, setTickets] = useState([]);
    console.log(categories);
    // useEffect(() => {
    let updatedTickets = [...newEventContext.tickets]; // Create a copy of oldTickets
    useEffect(() => {
        if (categories != undefined) {
            categories.forEach((category) => {
                let existingTicket = updatedTickets.find((ticket) => ticket.key === category.key);

                if (existingTicket) {
                    existingTicket.ticketTypeName = category.label;
                    existingTicket.ticketColor = category.color;
                } else {
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
                }
            });
            updatedTickets = updatedTickets.filter((ticket) =>
                categories.some((category) => category.key === ticket.key),
            );
            console.log(updatedTickets);
            setTickets(updatedTickets);
        }
    }, [categories]);
    return (
        !isPending && (
            <div>
                <Formik
                    initialValues={{
                        ticketTypes: updatedTickets,
                    }}
                    validationSchema={ticketsSchema}
                    onSubmit={(values) => {
                        console.log('submit');
                        newEventContext.setTickets(values.ticketTypes);
                        newEventStep.setStep(4);
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
                                            {/* <button
                                            type="button"
                                            className={cx('add-ticket-button')}
                                            onClick={() => {
                                                push({
                                                    isFree: false,
                                                    ticketTypeName: '',
                                                    ticketTypePrice: '',
                                                    ticketTypeDescription: '',
                                                    ticketImage: null,
                                                    ticketColor: '',
                                                    minPerOrder: '',
                                                    maxPerOrder: '',
                                                    ticketInfomation: '',
                                                });
                                                console.log(form.values);
                                            }}
                                        >
                                            Thêm loại vé
                                        </button> */}
                                        </div>
                                    );
                                }}
                            </FieldArray>
                        </div>
                        <div className={cx('item-container')}>
                            <div className={cx('action')}>
                                <Button
                                    type="button"
                                    onClick={() => newEventStep.setStep(2)}
                                    className={cx('next-button')}
                                    size="max"
                                    background="blue"
                                >
                                    Trở lại
                                </Button>
                                <Button type="primary" className={cx('next-button')} size="max" background="blue">
                                    Tiếp tục
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Formik>
            </div>
        )
    );
};

export default memo(Tickets);
