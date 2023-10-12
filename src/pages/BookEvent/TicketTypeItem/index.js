import styles from './TicketTypeItem.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState } from 'react';
import { BookContext } from '..';
function TicketTypeItem({ item, listBooks, handleBook }) {
    const cx = classNames.bind(styles);
    const [count, setCount] = useState(0);
    const bookContext = useContext(BookContext);

    const hanldeIncrease = () => {
        let books;
        if (count < item.quantity) {
            setCount((prev) => prev + 1);
            if (count === 0) {
                books = [
                    ...bookContext.bookings,
                    {
                        name: item.ticketName,
                        price: item.price,
                        count: count + 1,
                    },
                ];
            } else {
                books = bookContext.bookings.map((type) => {
                    if (type.name === item.ticketName) {
                        return {
                            name: item.ticketName,
                            price: item.price,
                            count: count + 1,
                        };
                    } else return type;
                });
            }
            bookContext.setBookings(books);
            // console.log(handleBook(books));
        }
    };
    const handleDecrease = () => {
        let books;
        if (count > 0) {
            setCount((prev) => prev - 1);
            if (count === 1) {
                books = bookContext.bookings.filter((type) => type.name !== item.ticketName);
            } else {
                books = bookContext.bookings.map((type) => {
                    if (type.name === item.ticketName) {
                        return {
                            name: item.ticketName,
                            price: item.price,
                            count: count - 1,
                        };
                    } else return type;
                });
            }
            bookContext.setBookings(books);
            // console.log(handleBook(books));
        }
    };
    return (
        <div className={cx('quantity')}>
            <button
                onClick={handleDecrease}
                className={cx('btn', 'sub-btn', {
                    disabled: count === 0,
                })}
            >
                <FontAwesomeIcon size="xl" icon={faMinus} />
            </button>
            <input name={item.ticketName} value={count} type="number" disabled min="1" max={item.quantity} />
            <button
                onClick={hanldeIncrease}
                className={cx('btn', 'add-btn', {
                    disabled: count === item.quantity,
                })}
            >
                <FontAwesomeIcon size="xl" icon={faPlus} />
            </button>
        </div>
    );
}

export default TicketTypeItem;
