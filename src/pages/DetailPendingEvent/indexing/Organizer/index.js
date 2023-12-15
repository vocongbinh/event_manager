import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../../components/layouts/components/Button';
import styles from './Organizer.module.scss';
import classNames from 'classnames/bind';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { forwardRef, memo } from 'react';
const Organizer = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);

    return (
        <div className={cx('wrapper')} ref={ref}>
            <h1> Organizer</h1>
            <div className={cx('container')}>
                <img className={cx('logo')} src={data && data.logoImage} alt="not found" />
                <div className={cx('content')}>
                    <p className={cx('name')}>{data && data.organizerName}</p>
                    <p className={cx('description')}>{data && data.description}</p>
                    <Button className={cx('contact-btn')} preIcon={<FontAwesomeIcon icon={faEnvelope} />}>
                        Contact the organizer
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default memo(Organizer);
