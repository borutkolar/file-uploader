import { type FC } from 'react';

import { type UploadedFile } from '../types';

interface Props {
    files: UploadedFile[];
}

const FileList: FC<Props> = ({ files }) => {
    return (
        <ul className="w-full" data-testid="file-list">
            {files.map((file, index) => (
                <li key={index} className="flex justify-between border-b py-2">
                    <span>{file.name}</span>
                    <span>{file.size / 1000} KB</span>
                </li>
            ))}
        </ul>
    );
};

export default FileList;
