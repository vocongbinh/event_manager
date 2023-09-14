import styles from './Image.module.scss';
import classNames from 'classnames/bind';
function Image({ src, alt, className, ...props }) {
    const cx = classNames.bind(styles);
    return (
        <img
            src={src}
            alt={alt}
            className={cx('wrapper', {
                [className]: className,
            })}
            {...props}
        />
    );
}

export default Image;
