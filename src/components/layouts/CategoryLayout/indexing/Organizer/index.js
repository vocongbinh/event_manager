import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../../components/Button';
import styles from './Organizer.module.scss';
import classNames from 'classnames/bind';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { forwardRef } from 'react';
const Organizer = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);
    return (
        <div ref={ref}>
            <h1> Organizer</h1>
            <div className={cx('wrapper')}>
                <img className={cx('logo')} src={data.logo} alt="not found" />
                <div className={cx('content')}>
                    <p className={cx('name')}>{data.name}</p>
                    <p className={cx('description')}>{data.description}</p>
                    <Button className={cx('contact-btn')} preIcon={<FontAwesomeIcon icon={faEnvelope} />}>
                        Contact the organizer
                    </Button>
                </div>
            </div>
        </div>
    );
});

export default Organizer;
