import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './NewEventHeader.module.scss';
import classNames from 'classnames/bind';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../../components/Image';

const NewEventHeader = () => {
    console.log(Images.neLogo);

    const cx = classNames.bind(style);
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')}>
                    <div className={cx('actions')}>
                        <FontAwesomeIcon icon={faClose} className={cx('close-icon')} />
                        <div className={cx('language-container')}>
                            <span className={cx('language', { active: true })}>Tiếng Việt</span>
                            <span className={cx('divider')}>|</span>
                            <span className={cx('language')}>Tiếng Anh</span>
                        </div>
                    </div>
                    <div className={cx('header-container')}>
                        <div className={cx('title-container')}>
                            <div className={cx('box')}></div>
                            <div className={cx('title')}>Tạo sự kiện mới</div>
                        </div>
                        <div>
                            <img src={Images.neLogo} className={cx('logo')} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewEventHeader;
