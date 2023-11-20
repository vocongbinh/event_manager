import styles from './TextEditor.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState, memo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const TextEditor = ({ label, ...props }) => {
    const cx = classNames.bind(styles);
    // const [inputFocus, setInputFocus] = useState(false);
    const [field, meta, helpers] = useField(props.name);
    const handleClear = () => {
        console.log('reset input');
        helpers.setValue('');
    };
    return (
        <div className={cx('input-container')}>
            <div className={cx('title-container')}>{label && <div className={cx('title-text')}>{label}</div>}</div>
            <CKEditor
                styles={{ width: '100%', height: '100px' }}
                editor={ClassicEditor}
                data="<p>Nhập thông tin chi tiết sự kiện&nbsp;!</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>"
                config={{
                    fontColor: {
                        colors: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)', 'rgb(0, 0, 255)'],
                    },
                    fontFamily: {
                        options: ['Arial', 'Verdana', 'Georgia', 'Times New Roman', 'Roboto', 'Comic Sans MS'],
                    },
                    fontWeight: {
                        options: ['normal', 'bold', 'italic'],
                    },

                    // plugins: [ Essentials ],
                    ckfinder: {
                        // The URL that the images are uploaded to.
                        uploadUrl: 'http://localhost:5001/file/upload',

                        // Enable the XMLHttpRequest.withCredentials property.
                        withCredentials: true,

                        // Headers sent along with the XMLHttpRequest to the upload server.
                        headers: {
                            'X-CSRF-TOKEN': 'CSFR-Token',
                            Authorization: 'Bearer <JSON Web Token>',
                        },
                    },
                }}
                onReady={(editor) => {}}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    helpers.setValue(data);
                }}
                onBlur={(event, editor) => {}}
                onFocus={(event, editor) => {}}
            />
        </div>
    );
};

export default memo(TextEditor);
