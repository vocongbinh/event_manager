import classNames from 'classnames/bind';
import styles from './Checkin.module.scss';
import Images from '../../../../../assets/images';
import { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import ticketService from '../../../../../apiServices/ticketService';
import eventService from '../../../../../apiServices/eventService';
import { format } from 'date-fns';
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import toastMessage from '../../../../../utils/toast';
function Checkin() {
    const navigate = useNavigate();
    const cx = classNames.bind(styles);
    const params = useParams();
    const [showCamera, setShowCamera] = useState(false);
    const [data, setData] = useState('');
    const [tickets, setTickets] = useState([]);
    const scanHandler = () => {
        console.log(stid);
        if (stid === '') {
            toastMessage({ type: 'error', title: 'PLease choose showtime!' });
        } else setShowCamera(true);
    };
    const [event, setEvents] = useState(null);
    const [stid, setStid] = useState('');
    let listShowtime = [];
    if (event != null) {
        listShowtime = event.showtimes.map((element) => {
            let timeShow = new Date(Date.parse(element.startAt));
            let startShowTime = format(timeShow, 'ccc dd/MM/yyyy HH:mm');
            return {
                ...element,
                startShowTime,
            };
        });
    }
    useEffect(() => {
        const fetchApi = async () => {
            const events = await eventService.getEventById(params.id);
            setEvents(events);
            if (stid !== '') {
                const ticketsData = await ticketService.getTicketStatistic(stid);
                const ticketIds = ticketsData.map((ticket) => ticket._id);
                setTickets(ticketIds);
            }
        };
        fetchApi();
    }, [stid]);
    return (
        <div className={cx('wrapper')}>
            {showCamera ? (
                <>
                    <QrReader
                        onResult={(result, error) => {
                            if (!!result) {
                                if (tickets.includes(result.text)) {
                                    let temp = tickets.filter((item) => item !== result.text);
                                    setTickets(temp);
                                    navigate('/checkinSuccess');
                                }
                            }
                        }}
                    />
                </>
            ) : (
                <div className={cx('header-wrapper')}>
                    <p className={cx('header')}>Welcome, please check-in here!</p>
                    <div className={cx('time-select')}>
                        <span>Shows In</span>
                        <select
                            onChange={async (e) => {
                                setStid(e.target.value);
                            }}
                            className={cx('selection')}
                        >
                            <option value="">--please select a date--</option>
                            {listShowtime.map((showtime) => (
                                <option value={showtime._id}>{showtime.startShowTime}</option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('container')}>
                        <button onClick={scanHandler} className={cx('scan-btn')}>
                            <div className="row">
                                <div className="col-9">
                                    <p>SCAN</p>
                                    <h6>Use your phone to check-in</h6>
                                </div>
                                <div className="col-3">
                                    <img width="100%" src={Images.qrCode} alt="" />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            )}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    );
}

export default Checkin;
/* 
       
<div className={cx('container')}>
   
</div> */
