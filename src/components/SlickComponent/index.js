import Slider from 'react-slick';
import styles from './SlickComponent.module.scss';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
const SlickComponent = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dotsClass: 'button-bar',
    };
    return (
        <Slider ref={ref} {...settings}>
            {data.map((item) => (
                <img className={cx('header-img')} alt="" src={item.coverImage} />
            ))}
        </Slider>
    );
});

export default SlickComponent;
