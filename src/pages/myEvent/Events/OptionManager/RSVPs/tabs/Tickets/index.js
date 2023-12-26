import { useEffect, useState } from 'react';
import styles from './Tickets.module.scss';
import classNames from 'classnames/bind';
import ticketService from '../../../../../../../apiServices/ticketService';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import Button from '../../../../../../../components/layouts/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { CSVLink } from 'react-csv';
import maskEmailPhone from 'mask-email-phone';
function Tickets({ showtimeId }) {
    const cx = classNames.bind(styles);
    const [tickets, setTickets] = useState([]);
    const titles = ['Name', 'Email', 'Phone Number', 'Ticket Type', 'Ticket Price', 'Amount'];
    const headers = [
        { label: ' Name', key: 'name' },
        { label: 'Email', key: 'email' },
        { label: 'Phone Number', key: 'phonenumber' },
        { label: 'Ticket Type', key: 'tickettype' },
        { label: 'Ticket Price', key: 'ticketprice' },
        { label: 'Amount', key: 'amount' },
    ];
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (showtimeId) {
                    const ticketsData = await ticketService.getTicketStatistic(showtimeId);
                    console.log(ticketsData);
                    setTickets(ticketsData);
                    const dataTemp = ticketsData.map((ticket) => {
                        const booking = ticket.booking;
                        const ticketType = ticket.ticketType;
                        return {
                            name: booking ? booking.receiverName : '',
                            email: booking ? maskEmailPhone(booking.receiverEmail) : '',
                            phonenumber: booking ? maskEmailPhone(booking.receiverPhoneNumber) : '',
                            tickettype: ticketType.ticketTypeName,
                            ticketprice: ticketType.ticketTypePrice,
                            amount: ticket.seats.length,
                        };
                    });
                    setData(dataTemp);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi();
    }, [showtimeId]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <CSVLink data={data} headers={headers}>
                    <Button className={cx('download-btn')} preIcon={<FontAwesomeIcon icon={faFileExcel} />}>
                        Download as excel file
                    </Button>
                    <p>For protecting customer information phone number and email hidden</p>
                </CSVLink>
            </div>
            <div className={cx('table-layout')}>
                <table className={cx('table')}>
                    <tr>
                        {titles.map((title) => (
                            <th>{title}</th>
                        ))}
                    </tr>
                    {tickets.map((ticket) => {
                        const booking = ticket.booking;
                        const ticketType = ticket.ticketType;
                        return (
                            <tr>
                                <td>{booking && booking.receiverName}</td>
                                <td>{booking && maskEmailPhone(booking.receiverEmail)}</td>
                                <td>{booking && maskEmailPhone(booking.receiverPhoneNumber)}</td>
                                <td style={{ whiteSpace: 'nowrap' }}>{ticketType.ticketTypeName}</td>
                                <td style={{ textAlign: 'center' }}>{ticketType.ticketTypePrice}</td>
                                <td style={{ textAlign: 'center' }}>{ticket.seats.length}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
}
export default Tickets;
