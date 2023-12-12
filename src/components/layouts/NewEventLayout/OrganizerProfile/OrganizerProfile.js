import React from 'react';
import style from './Organizer.module.scss';
import classNames from 'classnames/bind';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { Formik } from 'formik';
import Address from '../Address/Address';
import * as yup from 'yup';

import { faCheckCircle, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
const OrganizerProfile = () => {
    const cx = classNames.bind(style);
    const formSchema = yup.object().shape({
        businessType: yup.string().required(),
        fullName: yup.string().required(),
        taxCode: yup.string().required(),
        phoneNumber: yup.number().required(),
        email: yup.string().email().required(),
        provinceCode: yup.number().required(),
        districtCode: yup.number().positive().required(),
        wardCode: yup.number().required().positive(),
        province: yup.string().required(),
        district: yup.string().required(),
        ward: yup.string().required(),
        displacePlace: yup.string().required(),
        accountOwner: yup.string().required(),
        accountNumber: yup.string().required(),
        bank: yup.string().required(),
        branch: yup.string().required(),
    });
    const businessTypeItems = ['Personal', ''];
    return (
        <div className={cx('wrapper')}>
            <Formik
                initialValues={[]}
                onSubmit={(values, { setSubmitting }) => {
                    console.log(values);
                }}
            >
                {(formik) => (
                    <form onSubmit={formik.handleSubmit}>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {(formik.touched?.businessType && formik.errors?.businessType && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={cx('item-container')}>
                                <div className={cx('title-text')}>Bussiness Type</div>
                                <div className="row col-12">
                                    <MenuItem name="businessType" type="text" placeholder="Bussiness Type" />
                                </div>
                            </div>
                        </div>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {(formik.touched?.businessType && formik.errors?.businessType && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={cx('item-container')}>
                                <div className={cx('title-text')}>Organizer Information</div>
                                <div className="row col-12">
                                    <div className="col-6">
                                        <InputItem name="fullName" type="text" placeholder="Full name" />
                                    </div>
                                    <div className="col-6">
                                        <InputItem name="taxCode" type="text" placeholder="Tax code" />
                                    </div>
                                </div>
                                <div className="row col-12">
                                    <div className="col-6">
                                        <InputItem name="phoneNumber" type="text" placeholder="Phone Number" />
                                    </div>
                                    <div className="col-6">
                                        <InputItem name="email" type="text" placeholder="Email" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {(((formik.touched?.displacePlace && formik.errors?.displacePlace) ||
                                    (formik.touched?.province && formik.errors?.province) ||
                                    (formik.touched?.district && formik.errors?.district) ||
                                    (formik.touched?.ward && formik.errors?.ward)) && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={` ${cx('item-container')}`}>
                                <div className={cx('title-text')}>Organizer Address</div>
                                <div className="row col-12">
                                    <Address />
                                </div>
                                <div className="row col-12">
                                    <InputItem
                                        label="Organizer Location"
                                        name="displacePlace"
                                        type="text"
                                        placeholder="Organizer Location"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={cx('input-container')}>
                            <div className={cx('title-icon')}>
                                {(formik.touched?.businessType && formik.errors?.businessType && (
                                    <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                            </div>
                            <div className={cx('item-container')}>
                                <div className={cx('title-text')}>Bank account information</div>
                                <div className="row col-12">
                                    <div className="col-6">
                                        <InputItem name="accountNumber" type="text" placeholder="Account Number" />
                                    </div>
                                    <div className="col-6">
                                        <InputItem name="accountOwner" type="text" placeholder="Account Owner" />
                                    </div>
                                </div>
                                <div className="row col-12">
                                    <div className="col-6">
                                        <MenuItem name="bank" type="text" placeholder="Bank" />
                                    </div>
                                    <div className="col-6">
                                        <InputItem name="branch" type="text" placeholder="Branch" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={cx('item-container')}>
                            <div className={cx('action')}>
                                <Button type="primary" className={cx('next-button')} size="max" background="blue">
                                    Save changes
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <div></div>
        </div>
    );
};

export default OrganizerProfile;
