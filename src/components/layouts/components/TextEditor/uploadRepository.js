import React, { Component } from 'react';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            body: '',
        };
    }

    uploadImage = async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        return { default: data.url };
    };

    render() {
        return (
            <CKEditor
                editor={ClassicEditor}
                data={this.state.body ? this.state.body : '<p>Body text...</p>'}
                onInit={(editor) => {
                    editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
                        return new UploadAdapter(loader);
                    };
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data }, 'DATA');
                    this.setState({ body: data });
                }}
            />
        );
    }
}

class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            this.loader.file.then((file) => {
                formData.append('file', file);
                fetch('/api/upload', {
                    method: 'POST',
                    body: formData,
                })
                    .then((response) => {
                        response.json().then((data) => {
                            resolve({ default: data.url });
                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        });
    }

    abort() {}
}

export default App;
