import styles from './AccountBalance.module.scss';
import classNames from 'classnames/bind';
function AccountBalance() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <h2>
                Account balance <span className={cx('a-number')}>0</span>
            </h2>
            <h4>
                Total income <span className={cx('t-number')}>0</span>
            </h4>
            <div className={cx('line')}></div>
        </div>
        //     <div className={cx('wrapper')}>
        //         {/* <div className={cx('header')}>Organizer Registration Form</div> */}
        //         {/* <div className={`d-flex align-items-center ${cx('block-infor')}`}>
        //             <label className={cx('label')}>Business Type</label>
        //             <select className={cx('bound-input')}>
        //                 <option value="0">Business/Organizer</option>
        //                 <option value="1">Individual</option>
        //             </select>
        //         </div> */}
        //         {/* <div className={cx('title')}>Organizer information</div> */}
        //         {/* <div className={cx('block-infor')}>
        //             <div className={cx('table')}>
        //                 <div className={`row ${cx('row')}`}>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>Full name</label>
        //                             <input className={cx('bound-input')} />
        //                         </div>
        //                     </div>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>Tax code</label>
        //                             <input className={cx('bound-input')} />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className={`row ${cx('row')}`}>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>Phone number</label>
        //                             <input className={cx('bound-input')} />
        //                         </div>
        //                     </div>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>Email</label>
        //                             <input className={cx('bound-input')} />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className={`row ${cx('row')}`}>
        //                     <div className={`col-6 d-flex flex-column align-items-left`}>
        //                         <label className={cx('label')}>Identification Number</label>
        //                         <input className={cx('bound-input')} />
        //                     </div>
        //                 </div>
        //             </div>
        //         </div> */}
        //         {/* <div className={cx('block-infor')}>
        //             <div className={cx('title')}>Address</div>
        //             <div className={cx('table')}>
        //                 <div className={`row ${cx('row')}`}>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>City/Province</label>
        //                             <select className={cx('bound-input')}>
        //                                 <option value="0">Business/Organizer</option>
        //                                 <option value="1">Individual</option>
        //                             </select>
        //                         </div>
        //                     </div>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>District</label>
        //                             <input className={cx('bound-input')} />
        //                         </div>
        //                     </div>
        //                 </div>
        //                 <div className={`row ${cx('row')}`}>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>Ward</label>
        //                             <input className={cx('bound-input')} />
        //                         </div>
        //                     </div>
        //                     <div className="col-6">
        //                         <div className={`d-flex flex-column align-items-left`}>
        //                             <label className={cx('label')}>Address</label>
        //                             <input className={cx('bound-input')} />
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div> */}
        //     </div>
        // );
    );
}

export default AccountBalance;
