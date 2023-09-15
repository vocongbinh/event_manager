import styles from './Button.module.scss';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
const Button = forwardRef(({ type, size, href, className, preIcon, sufIcon, onClick, children, ...prop }, ref) => {
    const cx = classNames.bind(styles);
    let Comp = 'button';
    let props = {
        onClick,
        ...prop,
    };
    if (href) {
        Comp = 'a';
        props.href = href;
    }
    return (
        <Comp
            ref={ref}
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
            {preIcon && <span className={cx('preIcon')}>{preIcon}</span>}
            {children}
            {sufIcon && <span className={cx('sufIcon')}>{sufIcon}</span>}
        </Comp>
    );
});

export default Button;
