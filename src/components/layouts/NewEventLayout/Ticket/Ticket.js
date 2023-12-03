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
import { useRef, useState, useCallback, useEffect, memo } from 'react';
import TimePicker from '../../components/TimePicker/TimePicker';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import TextAreaItem from '../../components/TextAreaItem/TextAreaItem';
import { Formik, Form, useField, FieldArray, useFormikContext } from 'formik';
import Button from '../../components/Button';
import * as yup from 'yup';

const Ticket = ({ index, remove }) => {
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
    const [ticketTypeName, setTicketTypeName] = useState('');
    const [color, setColor] = useState('');
    const [image, setImage] = useState('');
    const [isEditingTicketName, setEditingTicketName] = useState(false);
    const [isEditingForm, setEditingForm] = useState(true);
    const [errorLength, setErrorLength] = useState(0);
    const handleOpenFileChosen = () => {
        fileRef.current.click();
    };
    // console.log(metaEndDate.value);
    // useEffect(() => {
    //     helperEndDate.setError('s kết thúc bán vé phải trước thời gian sự kiện bắt đầu');
    // }, []);

    // useEffect(() => {
    //     // if (metaEndDate.value > formContext.values.showtimes[index].showTimeStartDate) {
    //     // } else helperEndDate.setError('');
    // }, [metaEndDate.value]);
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
                {isEditingTicketName && isEditingForm && (
                    <div className={cx('header-edit')}>
                        <input
                            name={$(`ticketTypeName`)}
                            value={field.ticketTypeName}
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
                                if (isEditingForm) {
                                    // console.log('click button ticket type');
                                    setEditingTicketName(true);
                                }
                            }}
                            type="button"
                            className={cx('ticket-type-name')}
                        >
                            {field.ticketTypeName ? field.ticketTypeName : 'Tên loại vé'}
                        </button>

                        <div>
                            <FontAwesomeIcon
                                onClick={() => setEditingForm(true)}
                                icon={faPenToSquare}
                                className={cx('action-icon')}
                            />
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
                {isEditingForm && (
                    <div className={cx('ticket-container')}>
                        <div className={cx('row col-12')}>
                            {/* form.touched?.ticketTypes && form.touched?.ticketTypes[index] && ( */}
                            {/* // <div>{JSON.stringify(form.touched.ticketTypes[index])}</div> */}
                            {/* )} */}
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
                                        name={$('ticketTypePrice')}
                                        type="number"
                                        placeholder="Giá vé"
                                        // readOnly={isFree}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className={cx('input-container')}>
                                    <div className={cx('input-header')}>
                                        <div className={cx('input-label')}>Tổng lượng vé</div>
                                    </div>
                                    <InputItem name={$('totalTicket')} type="number" placeholder="Tổng lượng vé" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className={cx('input-container')}>
                                    <div className={cx('input-header')}>
                                        <div className={cx('input-label')}>Số vé tối thiểu trên đơn hàng</div>
                                    </div>
                                    <InputItem name={$('minPerOrder')} type="number" placeholder="Vé tối thiểu" />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className={cx('input-container')}>
                                    <div className={cx('input-header')}>
                                        <div className={cx('input-label')}>Số vé tối đa trên đơn hàng</div>
                                    </div>
                                    <InputItem name={$('maxPerOrder')} type="number" placeholder="Vé tối đa" />
                                </div>
                            </div>
                        </div>

                        {/* <div className={cx('row col-12')}>
                            <div className="col-md-2">
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
                            </div>

                            <div className="col-md-4">
                                <div className={cx('input-container')}>
                                    <InputItem
                                        name={$(ticketTypePrice)}
                                        type="number"
                                        placeholder="Giá vé"
                                        readOnly={isFree}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className={cx('input-container')}>
                                    <div className={cx('input-header')}>
                                        <div className={cx('input-label')}>Tổng lượng vé</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className={cx('input-container')}>
                                    <InputItem
                                        name={$(totalTicket)}
                                        type="number"
                                        placeholder="Tổng lượng vé"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('row col-12')}>
                            <div className="col-md-2">
                                <div className={cx('input-container')}>
                                    <div className={cx('input-header')}>
                                        <div className={cx('input-label')}>Số vé tối thiểu trên đơn hàng</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className={cx('input-container')}>
                                    <InputItem
                                        name={$(minPerOrder)}
                                        type="number"
                                        placeholder="Vé tối thiểu"
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className={cx('input-container')}>
                                    <div className={cx('input-header')}>
                                        <div className={cx('input-label')}>Số vé tối đa trên đơn hàng</div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <InputItem
                                    name={$(maxPerOrder)}
                                    type="number"
                                    placeholder="Vé tối đa"
                                />
                            </div>
                        </div> */}
                        <div className={cx('row col-12')}>
                            <div className="col-md-9">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className={cx('input-label')}>Ngày bắt đầu bán</div>
                                    </div>
                                    <div className="col-md-4">
                                        <DatePicker
                                            name={$('ticketStartDate')}
                                            type="text"
                                            placeholder="Ngày bắt đầu"
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <TimePicker
                                            date={field.ticketStartDate}
                                            isDisabled={field.ticketStartDate === null}
                                            name={$('ticketStartDate')}
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
                                        <DatePicker name={$('ticketEndDate')} type="text" placeholder="Ngày kết thúc" />
                                    </div>
                                    <div className="col-md-4">
                                        <TimePicker
                                            date={field.ticketEndDate}
                                            isDisabled={field.ticketEndDate === null}
                                            name={$('ticketEndDate')}
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
                                            name={$('ticketColor')}
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
                                <TextAreaItem name={$('ticketInfomation')} type="text" placeholder="Thông tin vé" />
                            </div>
                            <div className="col-md-3">
                                <input
                                    name={$('ticketImage')}
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
                                    <div
                                        onClick={() => handleOpenFileChosen()}
                                        className={cx('ticket-image-container')}
                                    >
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
                            <div
                                className={cx('button')}
                                onClick={() => {
                                    const newTouched = { ...form.touched };

                                    const fieldsToMarkAsTouched = field;

                                    Object.keys(fieldsToMarkAsTouched).forEach((field) => {
                                        form.setFieldTouched(`ticketTypes[${index}].${field}`, true);
                                    });
                                    if (!form.errors?.ticketTypes || !form.errors?.ticketTypes[index]) {
                                        setEditingForm(false);
                                    }
                                }}
                            >
                                Hoàn thành
                            </div>
                        </div>
                    </div>
                )}
                {!isEditingForm && (
                    <div className={cx('ticket-container')}>
                        <div className={cx('row col-12')}>
                            <div className="col-md-4">
                                <div className={cx('input-label')}>Ngày bắt đầu bán</div>
                            </div>
                            <div className="col-md-4">
                                <DatePicker name={$('ticketStartDate')} type="text" placeholder="Ngày bắt đầu" />
                            </div>
                            <div className="col-md-4">
                                <TimePicker
                                    date={field.ticketStartDate}
                                    isDisabled={field.ticketStartDate === null}
                                    name={$('ticketStartDate')}
                                    type="text"
                                    placeholder="Giờ bắt đầu"
                                />
                            </div>
                        </div>
                        <div className="row col-12">
                            <div className="col-md-4">
                                <div className={cx('input-label')}>Ngày kết thúc bán</div>
                            </div>
                            <div className="col-md-4">
                                <DatePicker name={$('ticketEndDate')} type="text" placeholder="Ngày kết thúc" />
                            </div>
                            <div className="col-md-4">
                                <TimePicker
                                    date={field.ticketEndDate}
                                    isDisabled={field.ticketEndDate === null}
                                    name={$('ticketEndDate')}
                                    type="text"
                                    placeholder="Giờ kết thúc"
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default memo(Ticket);
