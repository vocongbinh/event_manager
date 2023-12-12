import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faAddressCard,
    faCalendar,
    faCaretDown,
    faRightFromBracket,
    faTicket,
} from '@fortawesome/free-solid-svg-icons';
import styles from './DropdownButton.module.scss';
import classNames from 'classnames/bind';
import Button from '../Button';
import Image from '../Image';
import { useAuthContext } from '../../../../utils/authContext';
import { useNavigate } from 'react-router-dom';
function DropdownButton({ data, preIcon, sufIcon, text, className }) {
    const cx = classNames.bind(styles);
    const authContext = useAuthContext();
    const navigate = useNavigate();
    const listItems = [
        {
            title: 'My Tickets',
            icon: <FontAwesomeIcon icon={faTicket} />,
            href: '/',
        },
        {
            title: 'My Events',
            icon: <FontAwesomeIcon icon={faCalendar} />,
            href: '/my_event/events',
        },
        {
            title: 'My Profile',
            icon: <FontAwesomeIcon icon={faAddressCard} />,
            href: '/auth/profile',
        },
        {
            title: 'Log out',
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            onClick: () => {
                authContext.logOut();
            },
        },
    ];
    return (
        <div className={`dropdown ${cx('location-wrapper')}`}>
            <Button
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className={` dropdown-toggle ${cx('location-btn', 'avatar-btn')}`}
                preIcon={
                    <Image
                        src={'https://bloganchoi.com/wp-content/uploads/2022/12/stt-hoang-hon-hay-tam-trang-2.jpg'}
                        className={cx('avatar')}
                    />
                }
                sufIcon={<FontAwesomeIcon icon={faCaretDown} />}
            >
                {authContext.getUser().fullName || ''}
            </Button>
            <ul className={`dropdown-menu ${cx('location-list')}`} aria-labelledby="dropdownMenuButton1">
                {listItems.map((item) => (
                    <li>
                        <Button
                            onClick={item.onClick}
                            className={`${cx('item')} dropdown-item`}
                            target="_blank"
                            to={item.href}
                        >
                            <span style={{ marginRight: 15 }}>{item.icon}</span>
                            {item.title}
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownButton;
