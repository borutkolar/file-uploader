import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import FileList from '../FileUploader/FileList';

describe('FileList', () => {
    test('should display as many elements as there are files', () => {
        render(
            <FileList
                files={[
                    { name: 'file1.txt', size: 1024 },
                    { name: 'file2.txt', size: 2048 },
                ]}
            />
        );

        const fileList = screen.getAllByRole('listitem');
        expect(fileList).toHaveLength(2);
    });
});
