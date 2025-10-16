import { type UploadedFile } from './components/FileUploader/types';

type Response = {
    files: UploadedFile[];
};

export const getFiles = async () => {
    const response = await fetch('/api/files');
    const data = (await response.json()) as Response;
    return data;
};
