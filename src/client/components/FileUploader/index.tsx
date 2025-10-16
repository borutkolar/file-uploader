import { type FC } from 'react';

import FileList from './FileList';

interface Props {
    onUpload: (files: FileList) => Promise<void>;
    allowMultiple?: boolean;
    files?: { name: string; size: number }[];
}

const FileUploader: FC<Props> = ({ allowMultiple, files, onUpload }) => {
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
            <input
                className="hidden"
                data-testid="file-upload-input"
                id="file-upload"
                type="file"
                onChange={handleChange}
                multiple={allowMultiple}
            />
            <label
                className="cursor-pointer inline-flex items-center justify-center mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                htmlFor="file-upload"
            >
                Upload
            </label>
            {files ? (
                files.length === 0 ? (
                    <p data-testid="no-files-message">No files uploaded yet.</p>
                ) : (
                    <FileList files={files} />
                )
            ) : null}
        </div>
    );
};

export default FileUploader;
