import classNames from 'classnames/bind';
import styles from './Moderator.module.scss';
import Button from '../../../../../components/layouts/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvira, faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { useLocation, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { FacebookShareButton } from 'react-share';
import eventService from '../../../../../apiServices/eventService';
import { Table, Modal, Spinner } from 'react-bootstrap';
import { useState } from 'react';
import { faCheck, faCirclePlus, faEnvelope, faTriangleExclamation, faUser } from '@fortawesome/free-solid-svg-icons';
import modalStyles from '../../../../../styles/modal.module.scss';
import userService from '../../../../../apiServices/useService';
import moderatorService from '../../../../../apiServices/moderatorService';
import { param } from 'jquery';
function Moderator() {
    const cx = classNames.bind(styles);
    const modalCx = classNames.bind(modalStyles);
    const params = useParams();
    const [event, setEvent] = useState();
    const [errors, setErrors] = useState({});
    const [checkEmail, setCheckEmail] = useState(true);
    const { refetch } = useQuery({
        queryKey: ['event_moderator'],
        queryFn: async () => {
            const eventData = await eventService.getEventById(params.id);
            setEvent(eventData);
        },

        staleTime: Infinity,
    });
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
    };
    const handleChange = (e) => {
        setFormValue({ ...formValue, [e.target.name]: e.target.value });
    };
    const [formValue, setFormValue] = useState({
        email: '',
        role: '',
    });
    const validation = () => {
        let error = {};
        if (formValue.email === '') {
            error.email = 'Invalid email address';
        }
        if (formValue.role === '') {
            error.role = 'Please choose a role';
        }

        return error;
    };
    const handleCreate = () => {
        setShow(true);
    };
    const handleSave = async () => {
        const data = {
            role: formValue.role,
        };
        const errs = validation();
        setErrors(errs);
        if (Object.keys(errs).length === 0) {
            const user = await userService.getUserByEmail(formValue.email);
            if (user !== null) {
                data.userId = user._id;
                await userService.sendMailModerator({ eventId: params.id, userId: user._id, role: formValue.role });
                setShow(false);
                setCheckEmail(true);
                refetch();
            } else {
                setCheckEmail(false);
            }
        }
    };
    return (
        <div className={cx('wrapper')}>
            <p className={cx('border-layout', 'header')}>{event && event.eventName}</p>
            <div className={cx('border-layout')}>
                <p className={cx('content')}>Event moderators</p>
            </div>
            <Table className={cx('table')}>
                <thead>
                    <tr>
                        <td className="text-start">Name</td>
                        <td>Position</td>
                        <td className="text-end">Action</td>
                    </tr>
                </thead>
                <tbody>
                    {event &&
                        event.moderators.map((item) => {
                            return (
                                <tr style={{ backgroundColor: '#f6f6f6' }}>
                                    <td>
                                        <div className="d-flex align-items-center">
                                            <img className={cx('avatar-item')} alt="" />
                                            <div className="d-flex flex-column">
                                                <span className={cx('name-item')}>{item.user.username}</span>
                                                <span className={cx('email-item')}> {item.user.email}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <span>{item.role}</span>
                                    </td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
            <Button
                onClick={handleCreate}
                className={cx('create-btn')}
                size="max"
                sufIcon={<FontAwesomeIcon icon={faCirclePlus} />}
            >
                Add moderator
            </Button>
            <Modal
                dialogClassName={modalCx('modal')}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
            >
                <Modal.Header className={modalCx('modal-header')} closeButton>
                    <Modal.Title className={modalCx('title')}>Add moderator</Modal.Title>
                </Modal.Header>
                <Modal.Body className={cx('body')}>
                    <div className={cx('email-layout', 'body-layout')}>
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input
                            name="email"
                            type="email"
                            value={formValue.code}
                            onChange={handleChange}
                            placeholder="User Email Address"
                        />
                    </div>
                    {errors.email && <div className={modalCx('error')}>{errors.email}</div>}
                    <div className={cx('body-layout', 'role-select')}>
                        <FontAwesomeIcon icon={faUser} />
                        <select name="role" onChange={handleChange}>
                            <option value="">---Select a role---</option>
                            <option value="Admin">Admin</option>
                            <option value="Moderator">Moderator</option>
                            <option value="Check-In">Check-in</option>
                        </select>
                    </div>
                    {errors.role && <div className={modalCx('error')}>{errors.role}</div>}

                    <table className={cx('table-can')}>
                        <thead>
                            <tr>
                                <td></td>
                                <td>Owner</td>
                                <td>Admin</td>
                                <td>Moderator</td>
                                <td>Check-in</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Check-in tickets</td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                            </tr>
                            <tr>
                                <td>Edit event, ticket information</td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>View ticket sales and statistic</td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Managers Admin & moderators</td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td>
                                    <FontAwesomeIcon icon={faCheck} />
                                </td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    {!checkEmail && <div className={modalCx('error')}>The email has not been registered yet</div>}
                    <p style={{ marginTop: 20 }}>
                        A notification email will be sent to the email address that you enter
                    </p>
                    <div style={{ marginTop: 10 }} className="d-flex align-items-center">
                        <FontAwesomeIcon size="xl" icon={faTriangleExclamation} />
                        <p style={{ marginLeft: 10 }}>
                            Type exact registered email of a user that you want to add. Enter 1 email per time.
                        </p>
                    </div>
                </Modal.Body>
                <Modal.Footer className={modalCx('footer')}>
                    <Button className={modalCx('save-btn')} size="max" onClick={handleSave}>
                        Add moderator
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Moderator;
