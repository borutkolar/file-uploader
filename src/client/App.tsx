import { useEffect, type ReactElement } from 'react';

import FileUploader from './components/FileUploader';
import { useFiles } from './hooks';

export const App = (): ReactElement => {
    const { files, getAndSetFiles } = useFiles();

    useEffect(() => {
        getAndSetFiles();
    }, [getAndSetFiles]);

    const handleUpload = async (files: FileList) => {
        const promises: Promise<Response>[] = [];

        for (const file of files) {
            const formData = new FormData();
            formData.append('file', file, file.name);
            promises.push(
                fetch('/api/upload-single', {
                    method: 'POST',
                    body: formData,
                })
            );
        }

        try {
            const responses = await Promise.all(promises);

            const failedUploads: string[] = [];
            const jsonPromises = responses.map(async (response, index) => {
                if (!response.ok) {
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
    };

    return (
        <main className="relative isolate h-dvh">
            <div className="w-96 p-4">
                <FileUploader allowMultiple files={files} onUpload={handleUpload} />
            </div>
        </main>
    );
};
