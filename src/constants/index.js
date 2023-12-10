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
        title: 'Theater-Alt',
        categories: [9, 10],
    },
    {
        icon: Images.night,
        title: 'nightlife',
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
        title: 'Loại sự kiện',
        header: 'Chọn loại sự kiện bạn muốn tổ chức',
        icon: <FontAwesomeIcon icon={faAddressCard} />,
        // component: <EventTypeList />,
    },
    {
        title: 'Thông tin sự kiện',
        header: 'Điền thông tin cơ bản của sự kiện',
        icon: <FontAwesomeIcon icon={faCalendar} />,
        // component: <NewEventForm />,
    },
    {
        title: 'Tạo sân khấu mới',
        header: 'Tạo sân khấu mới cho sự kiện',
        icon: <FontAwesomeIcon icon={faMoneyBill} />,
    },

    {
        title: 'Danh sách vé',
        header: 'Điền thông tin danh sách vé',
        icon: <FontAwesomeIcon icon={faTicket} />,
        // component: <NewEventForm />,
    },
    {
        title: 'Thời gian',
        header: 'Chọn thời gian cho sự kiện',
        icon: <FontAwesomeIcon icon={faMoneyBill} />,
    },
];
