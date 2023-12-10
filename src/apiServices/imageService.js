import { request } from '../utils/request';

export async function uploadImage(fileData) {
    try {
        const uploadImage = await request.postForm(`api/image/upload`, {
            file: fileData,
        });
        return uploadImage.data;
    } catch (error) {
        console.log(error);
        return '';
        // return { status: error?.status, error: error?.errors };
    }
}
