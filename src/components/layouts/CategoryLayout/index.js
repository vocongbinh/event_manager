import styles from './CategoryLayout.module.scss';
import classNames from 'classnames/bind';
import Header from './Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faClockFour } from '@fortawesome/free-regular-svg-icons';
import Button from '../components/Button';
import About from './indexing/About';
import TicketInformation from './indexing/TicketInformation';
import Organizer from './indexing/Organizer';
function CategoryLayout({ children }) {
    const cx = classNames.bind(styles);
    const listOption = [
        { title: 'About' },
        { title: 'Ticket Information' },
        { title: 'Organizer' },
        { title: 'Recommend for you' },
    ];
    return (
        <div className={`container-fluid ${cx('wrapper')}`}>
            <Header />
            <div className={cx('container')}>
                <img
                    className={cx('background-event')}
                    src="https://lh3.googleusercontent.com/yt5FGbyvBSoAYuOAh7zW-R91NtRXs4HTR1uggdhNuWb3WdkfAEUGKbCGERsCGdgww_l2JdVbYcOtVnfZawyW2vV3IjxDx8s29M7hHvxJthCRFA=s2400-rj"
                />

                <div className="container">
                    <div className={cx('infor-event')}>
                        <div className={cx('calendar')}>
                            <p className={cx('month')}>OCTOBER</p>
                            <p className={cx('date')}>28</p>
                            <p className={cx('day')}>Saturday</p>
                        </div>
                        <div className={`col-sm-7 ${cx('content-event')}`}>
                            <p className={cx('title')}> 1589 - TRUNG QUÂN- 15 YEARS LIVE CONCERT</p>
                            <p className={cx('time-location')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faClockFour} />
                                Saturday, 28 October 2023 (07:00 PM - 11:00 PM)
                            </p>
                            <p className={cx('time-location')}>
                                <FontAwesomeIcon className={cx('icon')} icon={faLocationDot} />
                                Nhà thi đấu Quân khu 7
                            </p>
                            <p className={cx('address')}>Nhà thi đấu Quân khu 7</p>
                        </div>
                        <div className={cx('interact')}>
                            <Button type="highlight" size="max">
                                Book now
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={cx('nav-bar')}>
                    <div className="container">
                        <div className={`mx-auto ${cx('tab-layout')}`}>
                            {listOption.map((option) => (
                                <span className={cx('option', 'active')}>{option.title}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={`"container" ${cx('detail')}`}>
                    <div className={`mx-auto ${cx('detail-event')}`}>
                        <div className="col-8">
                            <div className={cx('detail-content')}>
                                <div className={cx('detail-item')}>
                                    <h1> about</h1>
                                    <About data="<h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1><h1>binhfhdsfhhdsfdfsdf</h1>" />
                                </div>
                                <div className={cx('detail-item')}>
                                    <h1> ticket information</h1>
                                    <TicketInformation />
                                </div>
                                <div className={cx('detail-item')}>
                                    <h1> Organizer</h1>
                                    <Organizer
                                        data={{
                                            name: 'binh',
                                            logo: 'https://icdn.dantri.com.vn/thumb_w/1920/2022/10/13/yen-lang-khong-den23-1665672705242.jpg',
                                            description: 'binh dep trai',
                                        }}
                                    />
                                </div>
                                <div className={cx('detail-item')}>
                                    <h1> Recommended for you</h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-4"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoryLayout;
