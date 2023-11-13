import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultLayout from '../components/layouts/DefaultLayout';
import MyEventLayout from '../components/layouts/MyEventLayout';
import DetailEvent from '../pages/DetailEvent';
import Home from '../pages/Home';
import { faAddressCard, faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import Events from '../pages/myEvent/Events';
import OrganizerProfile from '../pages/myEvent/OrganizerProfile';
import BankAccount from '../pages/myEvent/BankAccount';
import BookEvent from '../pages/BookEvent';
import SelectTicket from '../pages/BookEvent/bookContent/SelectTicket';
import PaymentInfo from '../pages/BookEvent/bookContent/PaymentInfo';
import ManageEventLayout from '../components/layouts/ManageEventLayout';
import Summary from '../pages/myEvent/Events/OptionManager/Summary';
import Discount from '../pages/myEvent/Events/OptionManager/Discount';
import Promote from '../pages/myEvent/Events/OptionManager/Promote';
import Moderator from '../pages/myEvent/Events/OptionManager/Moderator';

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
        path: '/my_event/events/:id/summary',
        component: Summary,
        layout: ManageEventLayout,
        index: 1,
    },
    {
        path: '/my_event/events/:id/moderator',
        component: Moderator,
        layout: ManageEventLayout,
        index: 2,
    },
    {
        path: '/my_event/events/:id/promote',
        component: Promote,
        layout: ManageEventLayout,
        index: 3,
    },
    {
        path: '/my_event/events/:id/discount',
        component: Discount,
        layout: ManageEventLayout,
        index: 4,
    },
    {
        path: '/my_event/events/:id/moderator',
        component: Discount,
        layout: ManageEventLayout,
        index: 5,
    },
    // manager even
];
export { privateRouter, publicRouter };
