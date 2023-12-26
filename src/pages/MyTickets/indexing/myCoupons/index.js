import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import * as myService from '../../../../apiServices/myService';
import Button from '../../../../components/layouts/components/Button';
import styles from '../../MyTickets.module.scss';
import classNames from 'classnames/bind';
import CouponItem from './couponItem';
function MyCoupons() {
    const [coupons, setCoupons] = useState([]);
    const cx = classNames.bind(styles);
    const { data } = useQuery({
        queryKey: ['myCoupon'],
        queryFn: async () => {
            const couponData = await myService.myDiscounts();
            setCoupons(couponData);
            return couponData;
        },
    });
    return (
        <div>
            {coupons?.map((coupon, index) => (
                <CouponItem key={index} data={coupon} />
            ))}
        </div>
    );
}

export default MyCoupons;
