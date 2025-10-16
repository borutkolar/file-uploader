import { type FC } from 'react';

interface Props {
    allowMultiple?: boolean;
}

const FileUploader: FC<Props> = ({ allowMultiple }) => {
    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) {
            return;
        }

        for (const file of files) {
            try {
                const formData = new FormData();
                formData.append('file', file, file.name);

                const response = await fetch('/api/upload-single', {
                    method: 'POST',
                    body: formData,
                });
                const data = (await response.json()) as unknown;

                console.log('response', data);
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                event.target.value = '';
            }
        }
    };

    return (
        <div className="flex h-full w-full flex-col items-center justify-center gap-4">
            <input className="hidden" id="file-upload" type="file" onChange={handleChange} multiple={allowMultiple} />
            <label
                className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
                htmlFor="file-upload"
            >
                Upload
            </label>
        </div>
    );
};

export default FileUploader;
