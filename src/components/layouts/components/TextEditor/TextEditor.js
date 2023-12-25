import styles from './TextEditor.module.scss';
import classNames from 'classnames/bind';
import { forwardRef, useState, memo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { useField } from 'formik';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MyCustomUploadAdapterPlugin } from './ImageUploadAdapter';
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
                data={
                    field.value
                        ? field.value
                        : '<p>Nhập thông tin chi tiết sự kiện&nbsp;!</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p>'
                }
                editor={ClassicEditor}
                config={{
                    extraPlugins: [MyCustomUploadAdapterPlugin],
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    helpers.setValue(data);
                }}
            />
        </div>
    );
};

export default memo(TextEditor);
