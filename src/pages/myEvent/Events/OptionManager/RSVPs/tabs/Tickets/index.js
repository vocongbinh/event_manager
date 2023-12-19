import { useEffect, useState } from 'react';
import styles from './Tickets.module.scss';
import classNames from 'classnames/bind';
import ticketService from '../../../../../../../apiServices/ticketService';
import { Page, Text, View, Document, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
function Tickets({ showtimeId }) {
    const cx = classNames.bind(styles);
    const [tickets, setTickets] = useState([]);
    const titles = ['Name', 'Email', 'Phone Number', 'Ticket Type', 'Ticket Price', 'Amount'];
    useEffect(() => {
        const fetchApi = async () => {
            try {
                if (showtimeId) {
                    const ticketsData = await ticketService.getTicketStatistic(showtimeId);
                    console.log(ticketsData);
                    setTickets(ticketsData);
                }
            } catch (e) {
                console.log(e);
            }
        };
        fetchApi();
    }, [showtimeId]);
    return (
        <div className={cx('wrapper')}>
            <table className={cx('table')}>
                <tr>
                    {titles.map((title) => (
                        <th>{title}</th>
                    ))}
                </tr>
                {tickets.map((ticket) => {
                    const user = ticket.user;
                    const ticketType = ticket.ticketType;
                    return (
                        <tr>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.phoneNumber}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>{ticketType.ticketTypeName}</td>
                            <td style={{ textAlign: 'center' }}>{ticketType.ticketTypePrice}</td>
                            <td style={{ textAlign: 'center' }}>{ticket.seats.length}</td>
                        </tr>
                    );
                })}
            </table>
        </div>
    );
}
export default Tickets;
