import { useState } from 'react';
import { ClipboardCopyIcon } from '@heroicons/react/outline';

export default function CopyButton() {
    const [disable, setDisable] = useState(false);
    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(window.location.href);
        setDisable(true);
        setTimeout(() => {
            setDisable(false);
        }, 3000);
    };

    return (
        <button disabled={disable} type="button" onClick={copyToClipboard} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 w-56">
            <ClipboardCopyIcon className="-ml-1 mr-3 h-5 w-5" aria-hidden="true" />
            {!disable ? 'Copy URL to Clipboard' : 'Copied to Clipboard!'}
        </button>
    );
}
