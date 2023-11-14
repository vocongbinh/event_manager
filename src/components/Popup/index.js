import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import styles from './Popup.module.scss';
import classNames from 'classnames/bind';
import Form from 'react-bootstrap/Form';
function Popup({ show, setShow }) {
    const cx = classNames.bind(styles);
    const handleClose = () => setShow(false);

    return (
        
    );
}

export default Popup;
