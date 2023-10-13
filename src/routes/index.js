import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultLayout from '../components/layouts/DefaultLayout';
import MyEventLayout from '../components/layouts/MyEventLayout';
import DetailEvent from '../pages/DetailEvent';
import Home from '../pages/Home';
import { faAddressCard, faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import Events from '../pages/myEvent/Events';
import OrganizerProfile from '../pages/myEvent/OrganizerProfile';
import AccountBalance from '../pages/myEvent/Events/AccountBalance';
import BankAccount from '../pages/myEvent/Events/BankAccount';
import BookEvent from '../pages/BookEvent';
import BookLayout from '../components/layouts/components/BookLayout';
import SelectTicket from '../pages/BookEvent/bookContent/SelectTicket';
import PaymentInfo from '../pages/BookEvent/bookContent/PaymentInfo';

//private router
const privateRouter = [{}];
//public router
const publicRouter = [
    {
        path: '/',
        layout: DefaultLayout,
        component: Home,
    },
    {
        path: '/events/:id/book',
        component: BookEvent,
    },
    {
        path: '/events/:id/book/:showtime_id/',
        component: BookEvent,
    },
    {
        path: '/events/:id/book/:showtime_id/step2',
        layout: BookEvent,
        component: PaymentInfo,
        index: 1,
    },
    {
        path: '/events/:id/book/:showtime_id/:step1',
        layout: BookEvent,
        component: SelectTicket,
        index: 0,
    },
    {
        path: '/events/:id',
        component: DetailEvent,
    },

    {
        path: '/my_event/events',
        component: Events,
        layout: MyEventLayout,
    },
    {
        path: '/my_event/organizer_profile',
        component: OrganizerProfile,
        layout: MyEventLayout,
    },
    {
        path: '/my_event/bank_account',
        component: BankAccount,
        layout: MyEventLayout,
    },
    {
        path: '/my_event/account_balance',
        component: AccountBalance,
        layout: MyEventLayout,
    },
];
export { privateRouter, publicRouter };
