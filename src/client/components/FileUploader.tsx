import { type FC } from 'react';

import FileList from './FileList';

interface Props {
    onUpload: (files: FileList) => Promise<void>;
    accept?: string;
    allowMultiple?: boolean;
    files?: { name: string; size: number }[];
}

const FileUploader: FC<Props> = ({ accept, allowMultiple, files, onUpload }) => {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) {
            return;
        }

        await onUpload(files);
        event.target.value = '';
    };

    return (
        <div className="flex h-full w-full flex-col align items-start">
            <div className="flex items-end">
                <input
                    aria-describedby="file-upload-description"
                    className="sr-only"
                    data-testid="file-upload-input"
                    id="file-upload"
                    type="file"
                    accept={accept}
                    multiple={allowMultiple}
                    onChange={handleChange}
                />
                <label
                    aria-label={allowMultiple ? 'Upload multiple files' : 'Upload file'}
                    className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-white font-medium rounded-lg"
                    htmlFor="file-upload"
                >
                    Upload
                </label>
                <p id="file-upload-description" className="text-sm text-gray-600 ml-3">
                    {allowMultiple ? 'Select one or more files to upload' : 'Select a file to upload'}
                </p>
            </div>
            {files ? (
                <div className="mt-4 w-full">
                    {files.length === 0 ? (
                        <p data-testid="no-files-message">No files uploaded yet.</p>
                    ) : (
                        <FileList files={files} />
                    )}
                </div>
            ) : null}
        </div>
    );
};

export default FileUploader;
