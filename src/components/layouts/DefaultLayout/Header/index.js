import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faGear, faSailboat, faUser } from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import SearchLayout from '../../components/SearchLayout';
import Tippy from '@tippyjs/react/headless';
import CategoryItem from '../Sidebar/CategoryItem';
import InforItem from './InforItem';
function Header() {
    const cx = classNames.bind(styles);
    const userOptions = [
        {
            title: 'Chỉnh sửa hồ sơ',
            icon: <FontAwesomeIcon icon={faGear} />,
            path: '/edit_profile',
        },
        {
            title: 'Hồ sơ ban tổ chức',
            icon: <FontAwesomeIcon icon={faUser} />,
            path: '/my_event/my_organizer_profile',
        },
        {
            title: 'Chỉnh sửa hồ sơ',
            icon: <FontAwesomeIcon icon={faGear} />,
        },
    ];
    return (
        <div className={cx('wrapper')}>
            <img
                src="https://trinhvantuyen.com/wp-content/uploads/2022/03/hinh-anh-pikachu-1.jpg"
                className={cx('logo')}
            />
            <SearchLayout className={cx('search-layout')} />
            <div className={cx('action')}>
                <Button type="round" size="min">
                    Create event
                </Button>
                <FontAwesomeIcon icon={faCircleInfo} className={cx('infor-icon')} />

                <Tippy
                    visible
                    placement="bottom-end"
                    interactive
                    render={(attrs) => (
                        <div className={cx('tippy-wrapper')} tab {...attrs}>
                            {userOptions.map((option) => (
                                <InforItem data={option} />
                            ))}
                        </div>
                    )}
                >
                    <Button type="primary" size="min" preIcon={<Image src={Images.avatar} className={cx('avatar')} />}>
                        bình nè
                    </Button>
                </Tippy>
            </div>
        </div>
    );
}

export default Header;
