import styles from './Address.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useEffect, useState, useMemo, memo } from 'react';
import HeadlessTippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';
import { useGetDistrict, useGetProvince, useGetWard } from '../../../../lib/react-query/useQueryAndMutation';
const Address = ({ ...props }) => {
    const [isShowProvince, setIsShowProvince] = useState(false);
    const [isShowDistrict, setIsShowDistrict] = useState(false);
    const [isShowWard, setIsShowWard] = useState(false);
    const [province, pmeta, phelper] = useField('province');
    const [district, dmeta, dhelper] = useField('district');
    const [ward, wmeta, whelper] = useField('ward');
    const [provinceCode, pmetaCode, phelperCode] = useField('provinceCode');
    const [districtCode, dmetaCode, dhelperCode] = useField('districtCode');
    const [wardCode, wmetaCode, whelperCode] = useField('wardCode');
    const { data: provinces, isFetching } = useGetProvince();
    useEffect(() => {
        console.log(JSON.stringify(provinces));
    }, [provinces]);
    const { data: districts, refetch: refetchDistrict } = useGetDistrict(provinceCode.value);
    const { data: wards, refetch: refetchWard } = useGetWard(districtCode.value);
    const cx = classNames.bind(styles);
    useEffect(() => {
        refetchDistrict();
    }, [provinceCode]);
    useEffect(() => {
        refetchWard();
    }, [districtCode]);
    const handleSelectProvince = (code, name) => {
        console.log('set province');
        phelper.setValue(name);
        phelperCode.setValue(code);
        handleSelectDistrict(-1, '');
    };
    const handleSelectDistrict = (code, name) => {
        dhelper.setValue(name);
        dhelperCode.setValue(code);
        handleSelectWard(-1, '');
    };
    const handleSelectWard = (code, name) => {
        whelper.setValue(name);
        whelperCode.setValue(code);
    };
    useEffect(() => {
        props.province && phelper.setValue(props.province);
        // props.district && phelper.setValue(props.district);
        // props.ward && phelper.setValue(props.ward);
    }, []);
    return (
        <div>
            {!isFetching && (
                <div className={cx('menu-container')}>
                    <div className={cx('title-container')}>
                        <HeadlessTippy
                            interactive
                            visible={isShowProvince}
                            render={(attrs) => (
                                <div className={cx('menu-selector')} tabIndex="-1" {...attrs}>
                                    <div className={cx('container')}>
                                        <div className={cx('items')}>
                                            {provinces.map((item, index) => (
                                                <div
                                                    key={index}
                                                    onClick={() => handleSelectProvince(item.code, item.name)}
                                                    className={cx('item')}
                                                >
                                                    {item.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            onClickOutside={() => {
                                setIsShowProvince(false);
                            }}
                        >
                            <div className={cx('menu-input')}>
                                <input
                                    {...province}
                                    // ref={ref}
                                    // value={province.value}
                                    type="text"
                                    name="province"
                                    className={cx('input-item')}
                                    placeholder="Chọn tỉnh, thành phố"
                                    onFocus={() => setIsShowProvince(true)}
                                    readOnly
                                ></input>
                                {provinceCode.value != -1 && (
                                    <button className={cx('post-icon')} onClick={() => handleSelectProvince(-1, '')}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>
                                )}
                                {provinceCode.value == -1 && (
                                    <FontAwesomeIcon
                                        onClick={() => setIsShowProvince(true)}
                                        icon={faAngleDown}
                                        className={cx('post-icon')}
                                    />
                                )}
                            </div>
                        </HeadlessTippy>
                    </div>
                </div>
            )}
            {
                <div className={cx('menu-container')}>
                    <div className={cx('title-container')}>
                        <HeadlessTippy
                            interactive
                            visible={isShowDistrict}
                            render={(attrs) => (
                                <div className={cx('menu-selector')} tabIndex="-1" {...attrs}>
                                    <div className={cx('container')}>
                                        <div className={cx('items')}>
                                            {provinceCode.value != -1 &&
                                                districts &&
                                                districts.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleSelectDistrict(item.code, item.name)}
                                                        className={cx('item')}
                                                    >
                                                        {item.name}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            onClickOutside={() => {
                                setIsShowDistrict(false);
                            }}
                        >
                            <div className={cx('menu-input')}>
                                <input
                                    {...district}
                                    type="text"
                                    name="district"
                                    className={cx('input-item')}
                                    placeholder="Chọn quận, huyện"
                                    onFocus={() => setIsShowDistrict(true)}
                                    readOnly
                                ></input>
                                {districtCode.value != -1 && (
                                    <button className={cx('post-icon')} onClick={() => handleSelectDistrict(-1, '')}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>
                                )}
                                {districtCode.value == -1 && (
                                    <FontAwesomeIcon
                                        onClick={() => setIsShowDistrict(true)}
                                        icon={faAngleDown}
                                        className={cx('post-icon')}
                                    />
                                )}
                            </div>
                        </HeadlessTippy>
                    </div>
                </div>
            }
            {
                <div className={cx('menu-container')}>
                    <div className={cx('title-container')}>
                        <HeadlessTippy
                            interactive
                            visible={isShowWard}
                            render={(attrs) => (
                                <div className={cx('menu-selector')} tabIndex="-1" {...attrs}>
                                    <div className={cx('container')}>
                                        <div className={cx('items')}>
                                            {districtCode.value != -1 &&
                                                wards &&
                                                wards.map((item, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => handleSelectWard(item.code, item.name)}
                                                        className={cx('item')}
                                                    >
                                                        {item.name}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                            onClickOutside={() => {
                                setIsShowWard(false);
                            }}
                        >
                            <div className={cx('menu-input')}>
                                <input
                                    // ref={ref}
                                    {...ward}
                                    type="text"
                                    name="ward"
                                    className={cx('input-item')}
                                    placeholder="Chọn phường, xã"
                                    onFocus={() => setIsShowWard(true)}
                                    readOnly
                                ></input>
                                {wardCode.value != -1 && (
                                    <button className={cx('post-icon')} onClick={() => handleSelectWard(-1, '')}>
                                        <FontAwesomeIcon icon={faCircleXmark} />
                                    </button>
                                )}
                                {wardCode.value == -1 && (
                                    <FontAwesomeIcon
                                        onClick={() => setIsShowWard(true)}
                                        icon={faAngleDown}
                                        className={cx('post-icon')}
                                    />
                                )}
                            </div>
                        </HeadlessTippy>
                    </div>
                </div>
            }
        </div>
    );
};

export default Address;
