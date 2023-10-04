import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DefaultLayout from '../components/layouts/DefaultLayout';
import MyEventLayout from '../components/layouts/MyEventLayout';
import DetailEvent from '../pages/DetailEvent';
import Home from '../pages/Home';
import MyOrganizer from '../pages/MyOrginaze';
import { faAddressCard, faCalendar, faMoneyBill, faPiggyBank } from '@fortawesome/free-solid-svg-icons';

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
        path: '/events/:id',
        component: DetailEvent,
    },
    {
        path: '/my_event/my_organizer_profile',
        component: MyOrganizer,
        layout: MyEventLayout,
        sidebarItems: [
            {
                title: 'Organizer Profile',
                icon: <FontAwesomeIcon icon={faAddressCard} />,
                path: '/',
            },
            {
                title: 'Created Events',
                icon: <FontAwesomeIcon icon={faCalendar} />,
                path: '/',
            },
            {
                title: 'My account balance',
                icon: <FontAwesomeIcon icon={faMoneyBill} />,
                path: '/',
            },
            {
                title: 'Bank account information',
                icon: <FontAwesomeIcon icon={faPiggyBank} />,
                path: '/',
            },
        ],
    },
];
export { privateRouter, publicRouter };
