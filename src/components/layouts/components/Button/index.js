import styles from './Button.module.scss';
import classNames from 'classnames/bind';
function Button({ type, size, href, className, icon, onClick, children }) {
    const cx = classNames.bind(styles);
    let Comp = 'button';
    let props = {
        onClick,
    };
    if (href) {
        Comp = 'a';
        props.href = href;
    }
    return (
        <Comp
            className={cx('wrapper', {
                [className]: className,
                round: type === 'round',
                primary: type === 'primary',
                min: size === 'min',
                medium: size === 'medium',
                max: size === 'max',
            })}
            {...props}
        >
            {icon && <span className={cx('icon')}>{icon}</span>}
            {children}
        </Comp>
    );
}
export default Button;
