import { useCallback, useEffect, type ReactElement } from 'react';

import FileUploader from './components/FileUploader';
import { useFiles } from './hooks';
import { generateUploadPromises } from './utils';

export const App = (): ReactElement => {
    const { files, getAndSetFiles } = useFiles();

    useEffect(() => {
        getAndSetFiles();
    }, [getAndSetFiles]);

    const handleUpload = useCallback<(files: FileList) => Promise<void>>(
        async (files) => {
            const promises = generateUploadPromises(files);

            try {
                const responses = await Promise.all(promises);

                const failedUploads: string[] = [];
                const jsonPromises = responses.map(async (response, index) => {
                    if (!response.ok) {
                        // Another option would be to display a message/toast notification for each failed upload.
                        const fileName = Array.from(files)[index]?.name;
                        failedUploads.push(fileName);
                        throw new Error(`Failed to upload ${fileName}: ${response.status} ${response.statusText}`);
                    }
                    return response.json();
                });

                await Promise.all(jsonPromises);
            } catch (error) {
                console.error('Error uploading files:', error);
            } finally {
                getAndSetFiles();
            }
        },
        [getAndSetFiles]
    );

    return (
        <main className="relative isolate h-dvh">
            <div className="w-96 p-4">
                <FileUploader allowMultiple files={files} onUpload={handleUpload} />
            </div>
        </main>
    );
};
