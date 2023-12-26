import styles from './SelectTicket.module.scss';
import classNames from 'classnames/bind';
import { useParams } from 'react-router-dom';
import { memo, useContext, useEffect, useState } from 'react';
import ticketService from '../../../../apiServices/ticketService';
import { BookContext } from '../../bookingLayout';
import { SeatsioSeatingChart } from '@seatsio/seatsio-react';
import showtimeService from '../../../../apiServices/showtimeService';
import { useGetShowtime } from '../../../../lib/react-query/useQueryAndMutation';

function SelectTicket() {
    console.log('render again');
    const cx = classNames.bind(styles);
    const params = useParams();
    const [tickets, setTickets] = useState([]);
    //useQuery
    //get book context
    const bookContext = useContext(BookContext);
    bookContext.setShowtime(params.showtime_id);
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                console.log(params.id);
                const data = await ticketService.getTicketOfEvent(params.id);
                console.log(data);
                setTickets(data);
                console.log(data);
                const initBookings = data.map((item) => {
                    return {
                        ticketTypeId: item._id,
                        name: item.ticketTypeName,
                        price: item.ticketTypePrice,
                        count: 0,
                        seats: [],
                    };
                });
                console.log('initBookings' + JSON.stringify(initBookings));
                bookContext.setBookings(initBookings);
            } catch (error) {
                throw new Error(error.message);
            }
        };
        fetchAPI();
    }, []);
    const { data: showtimeInfo, isPending: isFetchingShowtime } = useGetShowtime(params.showtime_id);
    console.log(showtimeInfo);
    useEffect(() => {
        console.log(bookContext.bookings);
    }, [bookContext.bookings]);
    useEffect(() => {
        if (showtimeInfo && showtimeInfo.showTimeStage) {
            bookContext.setEventKey(showtimeInfo.showTimeStage);
        }
    }, [showtimeInfo]);
    const selectedObjectHandler = (obj) => {
        bookContext.setBookings((prev) => {
            return prev.map((item) => {
                let count = item.count;
                let seats = item.seats;

                if (item.name === obj.category.label) {
                    count++;
                    seats = [...seats, obj.label];
                }
                return {
                    ...item,
                    count,
                    seats,
                };
            });
        });
    };

    const deselectedObjectHandler = (obj) => {
        let seats = [];
        bookContext.setBookings((prev) => {
            return prev.map((item) => {
                let count = item.count;
                seats = item.seats;
                console.log(item.name, obj.category.label);
                if (item.name === obj.category.label) {
                    count--;
                    seats = seats.filter((seat) => seat !== obj.label);
                }
                return {
                    ...item,
                    count: count,
                    seats,
                };
            });
        });
    };
    return (
        <div className={cx('ticket-type-list')}>
            <div
                id="chart"
                style={{
                    height: '500px',
                    width: '80%',
                    backgroundColor: 'transparent',
                }}
            >
                {!bookContext.isCreatingHoldToken &&
                    !isFetchingShowtime &&
                    bookContext.holdToken &&
                    showtimeInfo &&
                    showtimeInfo.showTimeStage && (
                        <SeatsioSeatingChart
                            holdToken={bookContext.holdToken.holdToken}
                            onHoldTokenExpired={() => {
                                bookContext.refetchToken();
                            }}
                            maxSelectedObjects={tickets.map((item) => {
                                console.log(item.maxPerOrder, typeof item.maxPerOrder);
                                return { category: item.ticketTypeName, quantity: item.maxPerOrder };
                            })}
                            showSeatLabels="true"
                            showLegend="true"
                            colorScheme="dark"
                            workspaceKey="d75efc12-a5ab-4e1b-9694-1d81b6bba8d1"
                            event={showtimeInfo.showTimeStage}
                            region="oc"
                            pricing={tickets.map((item) => {
                                return { category: item.ticketTypeName, price: item.ticketTypePrice };
                            })}
                            priceFormatter={(price) => price + 'VND'}
                            onObjectSelected={(obj) => {
                                selectedObjectHandler(obj);
                            }}
                            onObjectDeselected={(obj) => {
                                deselectedObjectHandler(obj);
                            }}
                        />
                    )}
            </div>
            {/* <div className={cx('type-header')}>
                <div className="row">
                    <div className="col-6">
                        <h5>ticket type</h5>
                    </div>
                    <div className="col-3  text-end">
                        <h5>unit price</h5>
                    </div>
                    <div className="col-3  text-end">
                        <h5>quantity</h5>
                    </div>
                </div>
            </div>
            {tickets.map((item) => {
                return (
                    <div className={`row ${cx('type-item')}`}>
                        <div className="col-6">
                            <h5>{item.ticketName}</h5>
                        </div>
                        <div className="col-3 text-end">
                            <h5>{nf.format(item.price)} VND</h5>
                        </div>
                        <div className="col-3 text-end">
                            <div className={cx('quantity-layout')}>
                                <TicketTypeItem item={item} />
                            </div>
                        </div>
                    </div>
                );
            })} */}
        </div>
    );
}

export default memo(SelectTicket);
