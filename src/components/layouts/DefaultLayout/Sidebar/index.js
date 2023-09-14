import Images from '../../../../assets/images';
import Image from '../../components/Image';
import CategoryItem from './CategoryItem';
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';
function Sidebar() {
    const cx = classNames.bind(styles);
    const listCategorys = [
        {
            icon: Images.music,
            title: 'Live music',
        },
        {
            icon: Images.curture,
            title: 'Theater-Alt',
        },
        {
            icon: Images.night,
            title: 'nightlife',
        },
        {
            icon: Images.community,
            title: 'Community',
        },
        {
            icon: Images.course,
            title: 'Course',
        },
        {
            icon: Images.attraction,
            title: 'Attractions',
        },
        {
            icon: Images.sport,
            title: 'Sport',
        },
    ];
    return (
        <div className={cx('wrapper')}>
            {listCategorys.map((category) => (
                <CategoryItem data={category} />
            ))}
        </div>
    );
}

export default Sidebar;
