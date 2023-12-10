import { useField, useFormikContext } from 'formik';
import { useRef, useState, useEffect, memo } from 'react';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faTicket, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { uploadImage } from '../../../../apiServices/imageService';
import style from './Ticket.module.scss';
import InputItem from '../../components/InputItem/InputItem';
import TextAreaItem from '../../components/TextAreaItem/TextAreaItem';

const Ticket2 = ({ index, remove }) => {
    console.log(`render ticket ${index}`);
    const $ = (prop) => {
        return `ticketTypes.${index}.${prop.toString()}`;
    };
    const form = useFormikContext();
    const field = form.values.ticketTypes[index];
    const [fieldTicket, meta, helpers] = useField($('ticketTypeName'));
    const [fieldIsFree, metaIsFree, helpersIsFree] = useField($('ticketTypePrice'));
    const [fieldFreeBool, metaFreeBool, helpersFreeBool] = useField($('isFree'));
    const [fieldColor, metaColor, helperColor] = useField($('ticketColor'));
    const [fieldImage, metaImage, helperImage] = useField($('ticketImage'));
    const [fieldEndDate, metaEndDate, helperEndDate] = useField($('ticketEndDate'));
    const items = ['Bến Tre', 'Hồ Chí Minh', 'Hà Nội'];
    const cx = classNames.bind(style);
    const fileRef = useRef();
    const [isFree, setIsFree] = useState(helpersFreeBool.value);
    const [color, setColor] = useState('');
    const [image, setImage] = useState('');
    const [isEditingTicketName, setEditingTicketName] = useState(false);
    const [errorLength, setErrorLength] = useState(0);
    const handleOpenFileChosen = () => {
        fileRef.current.click();
    };
    useEffect(() => {
        if (isFree == true) {
            helpersIsFree.setValue(0);
        } else {
            if (helpersIsFree.value == 0) {
                helpersIsFree.setValue('');
            }
        }
    }, [helpersFreeBool.value, isFree]);
    return (
        <div className={cx('wrapper')}>
            <div key={index} className={cx('container')}>
                {isEditingTicketName && (
                    <div className={cx('header-edit')}>
                        <input
                            name={$(`ticketTypeName`)}
                            value={field.ticketTypeName}
                            type="text"
                            onBlur={() => {
                                setEditingTicketName(false);
                            }}
                            onChange={(value) => {
                                helpers.setValue(value.target.value);
                            }}
                            focus={() => setEditingTicketName(true)}
                            className={cx('ticket-type-input')}
                            placeholder="Nhập vào tên loại vé"
                            autoFocus
                        ></input>
                    </div>
                )}
                {!isEditingTicketName && (
                    <div className={cx('header')}>
                        <FontAwesomeIcon icon={faTicket} className={cx('ticket-icon')} />
                        <button
                            onClick={() => {
                                setEditingTicketName(true);
                            }}
                            type="button"
                            className={cx('ticket-type-name')}
                        >
                            {field.ticketTypeName ? field.ticketTypeName : 'Tên loại vé'}
                        </button>

                        <div>
                            <FontAwesomeIcon
                                onClick={() => {
                                    console.log('index' + index);
                                    remove(index);
                                }}
                                icon={faTrashCan}
                                className={cx('action-icon')}
                            />
                        </div>
                    </div>
                )}
                <div className={cx('ticket-container')}>
                    <div className={cx('row col-12')}>
                        {form.errors &&
                        form.errors?.ticketTypes &&
                        form.errors?.ticketTypes[index] &&
                        form.touched &&
                        form.touched?.ticketTypes &&
                        form.touched?.ticketTypes[index] ? (
                            <div
                                className={cx('ticket-errors', {
                                    errorHide: errorLength === 0,
                                })}
                            >
                                {Object.entries(form.errors.ticketTypes[index]).map(([key, value]) => {
                                    if (
                                        1 &&
                                        form.touched.ticketTypes[index][key] &&
                                        form.touched.ticketTypes[index][key] === true
                                    ) {
                                        if (errorLength == 0) setErrorLength(1);
                                        return (
                                            <div className={cx('ticket-label')} key={key}>
                                                {value}
                                            </div>
                                        );
                                    } else return null;
                                })}
                            </div>
                        ) : null}
                    </div>
                    <div className={cx('row col-12')}>
                        <div className=" col-md-9">
                            <div className="row">
                                <div className={`${cx('col-wrapper')} col`}>
                                    <div className={cx('input-header')}>
                                        <div className={cx('input-label')}>Giá vé</div>
                                        <div className={cx('free-container')}>
                                            <input
                                                value={isFree}
                                                onChange={() => setIsFree(!isFree)}
                                                type="checkbox"
                                            ></input>
                                            <div className={cx('free-label')}>Miễn phí</div>
                                        </div>
                                    </div>
                                    <InputItem
                                        name={$('ticketTypePrice')}
                                        type="number"
                                        placeholder="Giá vé"
                                        readOnly={isFree}
                                    />
                                </div>
                                <div className={`${cx('col-wrapper')} col`}>
                                    <div className={cx('input-container')}>
                                        <div className={cx('input-label')}>Tổng lượng vé</div>
                                    </div>

                                    <InputItem name={$('totalTicket')} type="number" placeholder="Tổng lượng vé" />
                                </div>
                            </div>{' '}
                        </div>{' '}
                        <div className="col-md-3">
                            <div className={cx('ticket-color-wrapper')}>
                                <div className={cx('color-container')}>
                                    <div>
                                        <div className={cx('input-label')}>Màu vé</div>
                                        <div>(để phân biệt các loại vé)</div>
                                    </div>
                                    {/* </div> */}
                                    <input
                                        className={cx('color-picker')}
                                        color={color}
                                        onChange={(e) => {
                                            setColor(e.target.value);
                                            helperColor.setValue('color');
                                        }}
                                        name={$('ticketColor')}
                                        type="color"
                                    ></input>
                                </div>
                                <div className={cx('button-view-ticket')}>Xem vé mẫu</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('row col-12')}>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className={cx('input-container')}>
                                        <div className={cx('input-header')}>
                                            <div className={cx('input-label')}>Số vé tối thiểu trên đơn hàng</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <InputItem name={$('minPerOrder')} type="number" placeholder="Vé tối thiểu" />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className={cx('input-container')}>
                                        <div className={cx('input-header')}>
                                            <div className={cx('input-label')}>Số vé tối đa trên đơn hàng</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <InputItem name={$('maxPerOrder')} type="number" placeholder="Vé tối đa" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <input
                                name={$('ticketImage')}
                                className={cx('file-input')}
                                type="file"
                                // value={image ?? ''}
                                ref={fileRef}
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const image = await uploadImage(file);
                                        if (image) {
                                            setImage(image.url);
                                            helperImage.setValue(image.url);
                                        }
                                    }
                                }}
                                accept="image/png, image/jpeg"
                            />
                            {image && (
                                <div onClick={() => handleOpenFileChosen()} className={cx('ticket-image-container')}>
                                    <img src={image} className={cx('ticket-image')} alt="Hình ảnh"></img>
                                </div>
                            )}
                            {!image && (
                                <div onClick={() => handleOpenFileChosen()} className={cx('image-container')}>
                                    <FontAwesomeIcon style={{ height: '30px' }} icon={faPlusCircle} />
                                    <div style={{ fontSize: '10px' }}>Thêm hình vé </div>
                                    <div style={{ fontWeight: '700' }}>(Tỉ lệ 2:1)</div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={cx('divider')}></div>
                    <div className={cx('row col-12')}>
                        <TextAreaItem name={$('ticketInfomation')} type="text" placeholder="Thông tin vé" />
                    </div>
                    <div className="row col-12">
                        <div
                            className={cx('button')}
                            onClick={() => {
                                const fieldsToMarkAsTouched = field;

                                Object.keys(fieldsToMarkAsTouched).forEach((field) => {
                                    form.setFieldTouched(`ticketTypes[${index}].${field}`, true);
                                });
                            }}
                        >
                            Hoàn thành
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(Ticket2);
