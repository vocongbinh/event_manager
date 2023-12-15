import { Link } from 'react-router-dom';
import styles from './InforItem.module.scss';
import classNames from 'classnames/bind';
function InforItem({ data, onClick, className }) {
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
        <Comp
            className={cx('wrapper', {
                [className]: className,
            })}
            {...props}
            target={data.title === 'Manage Events' && '_blank'}
        >
            {data.icon}
            <span className={cx('title')}>{data.title}</span>
        </Comp>
    );
}

export default InforItem;
