import { type ReactElement } from 'react';

import FileUploader from './components/FileUploader';

export const App = (): ReactElement => {
    return (
        <main className="relative isolate h-dvh">
            <div className="w-96 p-4">
                <FileUploader />
            </div>
        </main>
    );
};
