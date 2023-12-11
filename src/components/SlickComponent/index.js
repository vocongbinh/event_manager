import Slider from 'react-slick';
import styles from './SlickComponent.module.scss';
import classNames from 'classnames/bind';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
const SlickComponent = forwardRef(({ data }, ref) => {
    const cx = classNames.bind(styles);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        dotsClass: 'button-bar',
    };
    return (
        <Slider ref={ref} {...settings}>
            {data.map((item) => (
                <Link target="_blank" to={`/events/${item._id}`}>
                    <img className={cx('header-img')} alt="" src={item.coverImage} />
                </Link>
            ))}
        </Slider>
    );
});

export default SlickComponent;
