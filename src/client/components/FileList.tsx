import { type FC } from 'react';

import { type UploadedFile } from './types';

interface Props {
    files: UploadedFile[];
}

const FileList: FC<Props> = ({ files }) => {
    return (
        <ul aria-label={`Uploaded files: ${files.length}`} className="w-full" data-testid="file-list">
            {files.map((file, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                    <span aria-label={`File name: ${file.name}`} className="font-medium text-gray-900">
                        {file.name}
                    </span>
                    <span className="text-gray-600 text-sm" aria-label={`File size: ${file.size} bytes`}>
                        {file.size / 1000} KB
                    </span>
                </li>
            ))}
        </ul>
    );
};

export default FileList;
