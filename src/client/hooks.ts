import { useCallback, useState } from 'react';

import { type UploadedFile } from './components/types';
import { getFiles } from './utils';

export const useFiles = () => {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    const getAndSetFiles = useCallback(() => {
        getFiles()
            .then((data) => {
                setFiles(data.files);
            })
            .catch((error) => {
                console.log('error', error);
            });
    }, []);

    return { files, getAndSetFiles };
};
