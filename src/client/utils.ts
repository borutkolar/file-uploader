import { type UploadedFile } from './components/FileUploader/types';

type FilesResponse = {
    files: UploadedFile[];
};

export const getFiles = async () => {
    const response = await fetch('/api/files');
    const data = (await response.json()) as FilesResponse;
    return data;
};

export const generateUploadPromises = (files: FileList) => {
    const promises: Promise<Response>[] = [];

    for (const file of files) {
        const formData = new FormData();
        formData.append('file', file, file.name);

        // The size of 50MB is arbitrary, it can be adjusted as needed.
        if (file.size < 50_000_000) {
            promises.push(
                fetch('/api/upload-single', {
                    method: 'POST',
                    body: formData,
                })
            );
        } else {
            // TODO: add missing logic to split file into chunks and upload each chunk
            promises.push(
                fetch('/api/upload-chunk', {
                    method: 'POST',
                    body: formData,
                })
            );
        }
    }

    return promises;
};
