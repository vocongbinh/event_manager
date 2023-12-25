import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import style from './Organizer.module.scss';
import classNames from 'classnames/bind';
import MenuItem from '../../components/MenuItem/MenuItem';
import InputItem from '../../components/InputItem/InputItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '../../components/Button';
import { Formik } from 'formik';
import Address from '../Address/Address';
import { organizerSchema } from '../../../../lib/validation';
import { faCheckCircle, faEdit, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AvatarPicker from '../../components/AvatarPicker/AvatarPicker';
import { useCreateOrganizer, useGetOrganizer } from '../../../../lib/react-query/useQueryAndMutation';
import { Spinner } from 'react-bootstrap';
import TextAreaItem from '../../components/TextAreaItem';
import { getOrganizerProfile, updateOrganizer } from '../../../../apiServices/organizerService';
const OrganizerProfile = () => {
    const { mutateAsync: createOrganizer, isPending: isCreating } = useCreateOrganizer();
    const cx = classNames.bind(style);
    const [errors, setErrors] = useState('');
    const businessTypeItems = ['Personal', 'Organizer'];
    const [organizer, setOrganizer] = useState({});
    const [isPending, setIsPending] = useState(true);
    const [action, setAction] = useState('create');
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrganizerProfile = async () => {
            setIsPending(true);
            getOrganizerProfile()
                .then((data) => {
                    setOrganizer(data);
                    setIsPending(false);
                })
                .catch((err) => {
                    setIsPending(false);
                    console.log(err);
                });
        };
        fetchOrganizerProfile();
        if (pathname == '/my_event/organizer_profile') {
            setAction('edit');
        }

        console.log(pathname);
    }, []);
    console.log(organizer);
    return (
        <div className={cx('wrapper')}>
            {!isPending && (
                <Formik
                    initialValues={{
                        businessType: organizer?.businessType ?? '',
                        email: organizer?.email,
                        phoneNumber: organizer?.phoneNumber ?? '',
                        organizerName: organizer?.organizerName ?? '',
                        logoImage: organizer?.logoImage ?? '',
                        taxCode: organizer?.taxCode,
                        province: organizer?.address?.province,
                        district: organizer?.address?.district,
                        ward: organizer?.address?.ward,
                        provinceCode: organizer?.address?.provinceCode,
                        districtCode: organizer?.address?.districtCode,
                        wardCode: organizer?.address?.wardCode,
                        displacePlace: organizer?.address?.displacePlace,
                        description: organizer?.description,
                    }}
                    validationSchema={organizerSchema}
                    onSubmit={(values) => {
                        console.log('submit');
                        console.log(values);
                        updateOrganizer(values)
                            .then((res) => {
                                console.log(res);
                                if (action == 'create') {
                                    navigate('/newEvent');
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                                setErrors('An unexpected error happened');
                            });
                    }}
                >
                    {(formik) => (
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                {formik.errors ? (
                                    <div className={cx('error-errors')}>
                                        {Object.entries(formik.errors).map(([key, value]) => {
                                            if (formik.touched[key] && formik.touched[key] === true)
                                                return (
                                                    <div className={cx('error-label')} key={key}>
                                                        {value}
                                                    </div>
                                                );
                                        })}
                                    </div>
                                ) : null}
                                {errors ? (
                                    <div className={cx('error-errors')}>
                                        <div className={cx('error-label')}>{errors.message}</div>
                                    </div>
                                ) : null}
                            </div>
                            <AvatarPicker name="logoImage" type="file" />
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
                                        <MenuItem
                                            name="businessType"
                                            type="text"
                                            placeholder="Bussiness Type"
                                            items={businessTypeItems}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className={cx('input-container')}>
                                <div className={cx('title-icon')}>
                                    {(((formik.touched?.organizerName && formik.errors?.organizerName) ||
                                        (formik.touched?.phoneNumber && formik.errors?.phoneNumber) ||
                                        (formik.touched?.email && formik.errors?.email)) && (
                                        <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                    )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                    <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                                </div>
                                <div className={cx('item-container')}>
                                    <div className={cx('title-text')}>Organizer Information</div>
                                    <div className="row col-12">
                                        <div className="col-6">
                                            <InputItem name="organizerName" type="text" placeholder="Full name" />
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
                                            placeholder="Organizer location"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={cx('input-container')}>
                                <div className={cx('title-icon')}>
                                    {(((formik.touched?.fullName && formik.errors?.fullName) ||
                                        (formik.touched?.phoneNumber && formik.errors?.phoneNumber) ||
                                        (formik.touched?.email && formik.errors?.email)) && (
                                        <FontAwesomeIcon icon={faInfoCircle} className={cx('info-icon')} />
                                    )) || <FontAwesomeIcon icon={faCheckCircle} className={cx('check-icon')} />}
                                    <FontAwesomeIcon icon={faEdit} className={cx('main-icon')} />
                                </div>
                                <div className={cx('item-container')}>
                                    <div className={cx('title-text')}>Organizer Description</div>
                                    <div className="row col-12">
                                        <TextAreaItem name="text" type="text" placeholder="Organizer description" />
                                    </div>
                                </div>
                            </div>

                            <div className={cx('item-container')}>
                                <div className={cx('action')}>
                                    <Button className={cx('next-button')} size="max" background="blue">
                                        {!isCreating ? 'Save change' : <Spinner />}
                                    </Button>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>
            )}
            <div></div>
        </div>
    );
};

export default OrganizerProfile;
