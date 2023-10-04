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
                highlight: type === 'highlight',
                circle: type === 'circle',
                min: size === 'min',
                medium: size === 'medium',
                max: size === 'max',
            })}
            {...props}
        >
            {preIcon && <div className={cx('preIcon')}>{preIcon}</div>}
            <h4 className={cx('content')}>{children}</h4>
            {sufIcon && <div className={cx('sufIcon')}>{sufIcon}</div>}
        </Comp>
    );
});

export default Button;
