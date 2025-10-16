import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import FileUploader from '../FileUploader';

describe('FileUploader', () => {
    test('should allow multiple file uploads', () => {
        render(<FileUploader allowMultiple onUpload={async () => {}} />);

        const input = screen.getByTestId('file-upload-input');
        expect(input).toHaveProperty('multiple', true);
    });

    test('should have accept property when provided', () => {
        const accept = '.jpg,.png';
        render(<FileUploader accept={accept} allowMultiple onUpload={async () => {}} />);

        const input = screen.getByTestId('file-upload-input');
        expect(input).toHaveProperty('accept', accept);
    });

    test('should display no files message when there are no files', () => {
        render(<FileUploader files={[]} onUpload={async () => {}} />);

        const message = screen.getByTestId('no-files-message');
        expect(message).toBeTruthy();
    });

    test('should display file list when there are files', () => {
        render(<FileUploader files={[{ name: 'file1.txt', size: 1024 }]} onUpload={async () => {}} />);

        const fileList = screen.getByTestId('file-list');
        expect(fileList).toBeTruthy();
    });
});
