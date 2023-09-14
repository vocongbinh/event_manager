import Button from '../../../components/Button';
import Image from '../../../components/Image';
import styles from './CategoryItem.module.scss';
import classNames from 'classnames/bind';
function CategoryItem({ data }) {
    const cx = classNames.bind(styles);
    return (
        <Button
            type="primary"
            className={cx('wrapper')}
            icon={<Image className={cx('category-icon')} src={data.icon} />}
        >
            {data.title}
        </Button>
    );
}

export default CategoryItem;
