import Button from '../../../components/Button';
import Image from '../../../components/Image';
import styles from './CategoryItem.module.scss';
import classNames from 'classnames/bind';
function CategoryItem({ data, to }) {
    const cx = classNames.bind(styles);
    return (
        <Button
            type="primary"
            to={to}
            className={cx('wrapper')}
            preIcon={<Image className={cx('category-icon')} src={data.icon} />}
        >
            {data.title}
        </Button>
    );
}

export default CategoryItem;
