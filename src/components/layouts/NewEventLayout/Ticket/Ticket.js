import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './Ticket.module.scss';
import classNames from 'classnames/bind';
import {
    faCheckCircle,
    faClose,
    faDeleteLeft,
    faEdit,
    faInfoCircle,
    faPenToSquare,
    faPlusCircle,
    faTicket,
    faTrashCan,
    faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import Images from '../../../../assets/images';
import Image from '../../components/Image';
import DatePicker from '../../components/DatePicker';
import { useRef, useState, useCallback, useEffect } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import TextAreaItem from '../../components/TextAreaItem/TextAreaItem';
import { Formik, Form, useField, FieldArray } from 'formik';
import Button from '../../components/Button';
import * as yup from 'yup';

const Ticket = ({ form, index, values }) => {
    const [field, meta, helpers] = useField(`tickets.${index}.ticketTypeName`);
    const [fieldIsFree, metaIsFree, helpersIsFree] = useField(`tickets.${index}.ticketTypePrice`);
    const [fieldColor, metaColor, helperColor] = useField(`tickets.${index}.ticketColor`);
    const [fieldImage, metaImage, helperImage] = useField(`tickets.${index}.ticketImage`);

    const items = ['Bến Tre', 'Hồ Chí Minh', 'Hà Nội'];
    const cx = classNames.bind(style);
    const fileRef = useRef();
    const [ticketTypeName, setTicketTypeName] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [color, setColor] = useState('');
    const [image, setImage] = useState('');
    const handleOpenFileChosen = () => {
        fileRef.current.click();
    };
    useEffect(() => {
        if (isFree) {
            helpersIsFree.setValue(0);
        } else {
            helpersIsFree.setValue('');
        }
    }, [isFree, helpersIsFree.value]);
    const [isEditingTicketName, setEditingTicketName] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div key={index} className={cx('container')}>
                {isEditingTicketName && (
                    <div className={cx('header-edit')}>
                        <input
                            value={ticketTypeName}
                            type="text"
                            onBlur={() => {
                                setEditingTicketName(false);
                            }}
                            onChange={(value) => {
                                setTicketTypeName(value.target.value);
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
                                console.log('click button ticket type');
                                setEditingTicketName(true);
                            }}
                            type="button"
                            className={cx('ticket-type-name')}
                        >
                            {ticketTypeName ? ticketTypeName : 'Tên loại vé'}
                        </button>

                        <div>
                            <FontAwesomeIcon icon={faPenToSquare} className={cx('action-icon')} />
                            <FontAwesomeIcon icon={faTrashCan} className={cx('action-icon')} />
                        </div>
                    </div>
                )}
                {/* {form.errors.tickets[index] && <div>Errors</div>} */}
                <div className={cx('ticket-container')}>
                    <div className={cx('row col-12')}>
                        <div className="col-md-3">
                            <div className={cx('input-container')}>
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
                                    name={`tickets.${index}.ticketTypePrice`}
                                    type="number"
                                    placeholder="Giá vé"
                                    readOnly={isFree}
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={cx('input-container')}>
                                <div className={cx('input-header')}>
                                    <div className={cx('input-label')}>Tổng lượng vé</div>
                                </div>
                                <InputItem
                                    name={`tickets.${index}.totalTicket`}
                                    type="number"
                                    placeholder="Tổng lượng vé"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={cx('input-container')}>
                                <div className={cx('input-header')}>
                                    <div className={cx('input-label')}>Số vé tối thiểu trên đơn hàng</div>
                                </div>
                                <InputItem
                                    name={`tickets.${index}.minPerOrder`}
                                    type="number"
                                    placeholder="Vé tối thiểu"
                                />
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={cx('input-container')}>
                                <div className={cx('input-header')}>
                                    <div className={cx('input-label')}>Số vé tối đa trên đơn hàng</div>
                                </div>
                                <InputItem
                                    name={`tickets.${index}.maxPerOrder`}
                                    type="number"
                                    placeholder="Vé tối đa"
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('row col-12')}>
                        <div className="col-md-9">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className={cx('input-label')}>Ngày bắt đầu bán</div>
                                </div>
                                <div className="col-md-4">
                                    <DatePicker
                                        name={`tickets.${index}.ticketStartDate`}
                                        type="text"
                                        placeholder="Ngày bắt đầu"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <TimePicker
                                        date={form.values.tickets[index].ticketStartDate}
                                        isDisabled={form.values.tickets[index].ticketStartDate === null}
                                        name={`tickets.${index}.ticketStartDate`}
                                        type="text"
                                        placeholder="Giờ bắt đầu"
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className={cx('input-label')}>Ngày kết thúc bán</div>
                                </div>
                                <div className="col-md-4">
                                    <DatePicker
                                        name={`tickets.${index}.ticketEndDate`}
                                        type="text"
                                        placeholder="Ngày kết thúc"
                                    />
                                </div>
                                <div className="col-md-4">
                                    <TimePicker
                                        date={form.values.tickets[index].ticketEndDate}
                                        isDisabled={form.values.tickets[index].ticketEndDate === null}
                                        name={`tickets.${index}.ticketEndDate`}
                                        type="text"
                                        placeholder="Giờ kết thúc"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className={cx('ticket-color-wrapper')}>
                                <div className={cx('color-container')}>
                                    <div className={cx('input-container')}>
                                        <div className={cx('input-label')}>Màu vé</div>
                                        <div>(để phân biệt các loại vé)</div>
                                    </div>
                                    <input
                                        color={color}
                                        onChange={(e) => {
                                            setColor(e.target.value);
                                            helperColor.setValue('color');
                                        }}
                                        name={`tickets.${index}.ticketColor`}
                                        type="color"
                                    ></input>
                                </div>
                                <div className={cx('button-view-ticket')}>Xem vé mẫu</div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('divider')}></div>
                    <div className={cx('row col-12')}>
                        <div className="col-md-9">
                            <TextAreaItem
                                name={`tickets.${index}.ticketInfomation`}
                                type="text"
                                placeholder="Thông tin vé"
                            />
                        </div>
                        <div className="col-md-3">
                            <input
                                name={`tickets.${index}.ticketImage`}
                                className={cx('file-input')}
                                type="file"
                                // value={image ?? ''}
                                ref={fileRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const imageUrl = URL.createObjectURL(file);
                                        setImage(imageUrl);
                                        helperImage.setValue(imageUrl);
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
                    <div className="row col-12">
                        <div className={cx('button')}>Hoàn thành</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Ticket;
