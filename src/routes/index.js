import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultLayout from '../components/layouts/DefaultLayout';
import MyEventLayout from '../components/layouts/MyEventLayout';
import DetailEvent from '../pages/DetailEvent';
import Home from '../pages/Home';
import { faAddressCard, faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';
import Events from '../pages/myEvent/Events';
import EventTypeList from '../components/layouts/NewEventLayout/EventTypeList';
import NewEventLayout from '../components/layouts/NewEventLayout/NewEventLayout';
import BankAccount from '../pages/myEvent/BankAccount';
import BookEvent from '../pages/BookEvent/bookingLayout';
import SelectTicket from '../pages/BookEvent/bookContent/SelectTicket/selectTicket';
import PaymentInfo from '../pages/BookEvent/bookContent/PaymentInfo/paymentInfo';
import ManageEventLayout from '../components/layouts/ManageEventLayout';
import Summary from '../pages/myEvent/Events/OptionManager/Summary';
import AuthenticationLayout from '../components/layouts/AuthenticationLayout/AuthenticationLayout';
import LoginForm from '../components/layouts/AuthenticationLayout/Login/LoginForm';
import Profile from '../components/layouts/AuthenticationLayout/Profile';
import ResetPassword from '../components/layouts/AuthenticationLayout/ResetPassword';
import Register from '../components/layouts/AuthenticationLayout/Register';
import Discount from '../pages/myEvent/Events/OptionManager/Discount';
import Promote from '../pages/myEvent/Events/OptionManager/Promote';
import Moderator from '../pages/myEvent/Events/OptionManager/Moderator';
import Otp from '../components/layouts/AuthenticationLayout/Otp/OtpForm';
import RegisterSuccess from '../components/layouts/AuthenticationLayout/RegisterSuccess';
import TypeEvent from '../pages/TypeEvent';
import MyTickets from '../pages/MyTickets';
import ComponentRPVPs from '../pages/myEvent/Events/OptionManager/RSVPs';
import NewStageChart from '../components/layouts/NewEventLayout/NewStage/NewStageChart';
import Address from '../components/layouts/NewEventLayout/Address/Address';
import AdminLayout from '../components/layouts/AdminLayout';
import DetailPendingEvent from '../pages/DetailPendingEvent';
import OrganizerProfile from '../components/layouts/NewEventLayout/OrganizerProfile/OrganizerProfile';
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
        path: '/newEvent',
        layout: NewEventLayout,
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
        index: 1,
    },
    {
        path: '/my_event/organizer_profile',
        component: OrganizerProfile,
        layout: MyEventLayout,
        index: 0,
    },
    {
        path: '/my_event/bank_account',
        component: BankAccount,
        layout: MyEventLayout,
        index: 3,
    },
    {
        path: '/my_event/events/:id/summary',
        component: Summary,
        layout: ManageEventLayout,
        index: 1,
    },
    {
        path: '/my_event/events/:id/RSVPs',
        component: ComponentRPVPs,
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
        component: Moderator,
        layout: ManageEventLayout,
        index: 5,
    },
    {
        path: '/events/typeEvent',
        component: TypeEvent,
    },
    {
        path: '/my_tickets',
        layout: DefaultLayout,
        component: MyTickets,
    },
    {
        path: '/auth/login',
        layout: AuthenticationLayout,
        component: LoginForm,
    },
    {
        path: '/auth/resetpassword',
        layout: AuthenticationLayout,
        component: ResetPassword,
    },
    {
        path: '/auth/otp',
        layout: AuthenticationLayout,
        component: Otp,
    },
    {
        path: '/auth/profile',
        layout: AuthenticationLayout,
        component: Profile,
    },
    {
        path: '/auth/register',
        layout: AuthenticationLayout,
        component: Register,
    },
    {
        path: '/auth/registersuccess',
        layout: AuthenticationLayout,
        component: RegisterSuccess,
    },
    {
        path: '/admin',
        component: AdminLayout,
    },
    {
        path: '/admin/:id',
        component: DetailPendingEvent,
    },
];
export { privateRouter, publicRouter };
