import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './FormHeader.module.scss';
import classNames from 'classnames/bind';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../Image';

const FormHeader = ({ header, width = '80%' }) => {
    console.log(Images.neLogo);

    const cx = classNames.bind(style);
    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container')} style={{ width: width }}>
                    <div className={cx('header-container')}>
                        <div className={cx('title-container')}>
                            <div className={cx('box')}></div>
                            <div className={cx('title')}>{header ?? 'Tạo sự kiện mới'}</div>
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

export default FormHeader;
