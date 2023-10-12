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
function DropdownButton({ data, preIcon, sufIcon, text, className }) {
    const cx = classNames.bind(styles);
    const listItems = [
        {
            title: 'My Tickets',
            icon: <FontAwesomeIcon icon={faTicket} />,
            href: '/',
        },
        {
            title: 'My Events',
            icon: <FontAwesomeIcon icon={faCalendar} />,
            href: '/',
        },
        {
            title: 'My Profile',
            icon: <FontAwesomeIcon icon={faAddressCard} />,
            href: '/',
        },
        {
            title: 'Log out',
            icon: <FontAwesomeIcon icon={faRightFromBracket} />,
            href: '/',
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
                võ công bình
            </Button>
            <ul className={`dropdown-menu ${cx('location-list')}`} aria-labelledby="dropdownMenuButton1">
                {listItems.map((item) => (
                    <li>
                        <a className={`${cx('item')} dropdown-item`} href="#">
                            <span style={{ marginRight: 15 }}>{item.icon}</span>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownButton;
