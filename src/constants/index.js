import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Images from '../assets/images';
import EventTypeList from '../components/layouts/NewEventLayout/EventTypeList';
import NewEventForm from '../components/layouts/NewEventLayout/NewEventForm/NewEventForm';
import { faAddressCard, faCalendar, faMoneyBill, faTicket } from '@fortawesome/free-solid-svg-icons';

export const listCategorys = [
    {
        icon: Images.music,
        title: 'Live music',
        categories: [8],
    },
    {
        icon: Images.curture,
        title: 'Theater Art',
        categories: [9, 10],
    },
    {
        icon: Images.night,
        title: 'Night Life',
        categories: [11],
    },
    {
        icon: Images.community,
        title: 'Community',
        categories: [2, 3, 5, 7],
    },
    {
        icon: Images.course,
        title: 'Course',
        categories: [4],
    },
    {
        icon: Images.attraction,
        title: 'Attractions',
        categories: [13],
    },
    {
        icon: Images.sport,
        title: 'Sport',
        categories: [6, 12],
    },
];

export const createEventSteps = [
    {
        title: 'Event Type',
        header: 'Choose event type you want to organize',
        icon: <FontAwesomeIcon icon={faAddressCard} />,
        // component: <EventTypeList />,
    },
    {
        title: 'Event Information',
        header: 'Complete some event basic information',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        // component: <NewEventForm />,
    },
    {
        title: 'Add new stage',
        header: 'Add new stage to your event',
        icon: <FontAwesomeIcon icon={faMoneyBill} />,
    },

    {
        title: 'Tickets',
        header: 'Create tickets for event',
        icon: <FontAwesomeIcon icon={faTicket} />,
        // component: <NewEventForm />,
    },
    {
        title: 'Thời gian',
        header: 'Add showtime to event',
        icon: <FontAwesomeIcon icon={faMoneyBill} />,
    },
];
