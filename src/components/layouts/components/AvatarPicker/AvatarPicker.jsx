import styles from './AvatarPicker.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState, memo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCamera,
    faCircleXmark,
    faCloudUpload,
    faFileUpload,
    faImage,
    faUpload,
} from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import { useField } from 'formik';
import { uploadImage } from '../../../../apiServices/imageService';
const AvatarPicker = ({ label, ...props }) => {
    const cx = classNames.bind(styles);
    // const [inputFocus, setInputFocus] = useState(false);
    const [field, meta, helpers] = useField(props.name);
    const fileRef = useRef();
    const handleOpenFileChosen = () => {
        fileRef.current.click();
        helpers.setTouched(true);
    };
    return (
        <div className={cx('input-container')}>
            <div className={cx('title-container')}>
                {label && <div className={cx('title-text')}>{label}</div>}
                <div className={cx('image-wrapper')}>
                    <input
                        // {...field}
                        {...props}
                        className={cx('file-input')}
                        type="file"
                        ref={fileRef}
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const image = await uploadImage(file);
                                helpers.setValue(image.url);
                            }
                        }}
                        accept="image/png, image/jpeg"
                    />
                    {field.value && (
                        <div onClick={() => handleOpenFileChosen()} className={`${cx('image-container')}`}>
                            <img src={field.value} className={cx('image-img')} alt="Hình ảnh" />
                        </div>
                    )}
                    {!field.value && (
                        <div className={cx('image-container')}>
                            <img src={Images.avatar} className={cx('image-img')} />
                            <div onClick={() => handleOpenFileChosen()} className={cx('pick-image-btn')}>
                                <FontAwesomeIcon
                                    style={{ fontSize: '16px', color: 'white', padding: '3px' }}
                                    icon={faCamera}
                                />
                            </div>
                            {/* <div onClick={() => handleOpenFileChosen()} className={cx('image-button')}>
                                <FontAwesomeIcon
                                    style={{ fontSize: '20px', color: '#5e626a', marginBottom: '5px' }}
                                    icon={faImage}
                                />
                                <div style={{ fontSize: '13px', fontWeight: '600px' }}>Thêm hình ảnh</div>
                            </div> */}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default memo(AvatarPicker);
