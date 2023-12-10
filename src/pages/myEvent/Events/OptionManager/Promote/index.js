import classNames from 'classnames/bind';
import styles from './Promote.module.scss';
import Button from '../../../../../components/layouts/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FacebookShareButton } from 'react-share';
import eventService from '../../../../../apiServices/eventService';
import { useState } from 'react';
function Promote() {
    const cx = classNames.bind(styles);
    const params = useParams();
    const [event, setEvent] = useState();
    const {} = useQuery({
        queryKey: ['event'],
        queryFn: async () => {
            const data = await eventService.getEventById(params.id);
            setEvent(data);
        },
    });

    return (
        <div className={cx('wrapper')}>
            <p className={cx('border-layout', 'header')}>{event && event.eventName}</p>
            <div className={cx('border-layout')}>
                <p style={{ fontSize: '2rem' }}>
                    Promote link:
                    <span>
                        <a className={cx('link')} href={window.location.href}>
                            {` http://localhost:3000/events/${params.id}/`}
                        </a>
                    </span>
                </p>
                <FacebookShareButton
                    url={`https://24hstore.vn/upload_images/images/2023/hinh-nen-may-tinh/1-1-hinh-nen-may-tinh-chill-win-10-1.jpg`}
                    quote="share event"
                    hashtag="event"
                >
                    <Button className={cx('share-btn')} preIcon={<FontAwesomeIcon size="xl" icon={faSquareFacebook} />}>
                        Share on Facebook
                    </Button>
                </FacebookShareButton>
            </div>
        </div>
    );
}

export default Promote;
