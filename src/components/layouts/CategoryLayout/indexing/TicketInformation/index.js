import TicketItem from '../TicketInformation/TicketItem';

function TicketInformation({ data }) {
    return (
        <div>
            <TicketItem data={{ name: 'binh', price: 100000, status: 'online booking closed' }} />
            <TicketItem data={{ name: 'binh', price: 100000 }} />
            <TicketItem data={{ name: 'binh', price: 100000, status: 'online booking closed' }} />
        </div>
    );
}

export default TicketInformation;
