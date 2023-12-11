import Images from '../../../../assets/images';
import Image from '../../components/Image';
import CategoryItem from './CategoryItem';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
function Sidebar() {
    const cx = classNames.bind(styles);
    const listCategorys = [
        {
            icon: Images.home,
            title: 'Home',
            categories: [8],
        },
        {
            icon: Images.music,
            title: 'Live music',
            categories: [8],
        },
        {
            icon: Images.curture,
            title: 'Theater-Art',
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
    return (
        <div className={cx('wrapper')}>
            {listCategorys.map((category) => (
                <CategoryItem
                    data={category}
                    to={category.title === 'Home' ? '/' : `/events/typeEvent?types=${category.title}`}
                />
            ))}
        </div>
    );
}

export default Sidebar;
