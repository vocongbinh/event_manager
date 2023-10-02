import { Link } from 'react-router-dom';
import styles from './InforItem.module.scss';
import classNames from 'classnames/bind';
function InforItem({ data, onClick }) {
    const cx = classNames.bind(styles);
    let props = {
        onClick,
    };
    let Comp;
    if (data.path) {
        Comp = Link;
        props.to = data.path;
    } else Comp = 'div';

    return (
        <Comp className={cx('wrapper')} {...props}>
            {data.icon}
            <span className={cx('title')}>{data.title}</span>
        </Comp>
    );
}

export default InforItem;
