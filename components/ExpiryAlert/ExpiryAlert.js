import { ExclamationCircleIcon, XIcon } from '@heroicons/react/outline';
import { useState, useEffect } from 'react';

export default function ExpiryAlert({ expiry, bgColor, buttonStyle }) {
    const [opacity, setOpacity] = useState('opacity-100');
    const [show, setShow] = useState(true);

    const handleDismiss = () => {
        setOpacity('opacity-0');
        setTimeout(() => {
            setShow(false);
        }, 300);
    };

    return show ? (
        <div className={`fixed bottom-0 inset-x-0 pb-2 sm:pb-5 transition-opacity duration-300 ${opacity}`}>
            <div className="max-w-xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className={`p-2 rounded-lg shadow-lg sm:p-3 ${bgColor}`}>
                    <div className="flex items-center justify-between flex-wrap">
                        <div className="w-0 flex-1 flex items-center">
                            <ExclamationCircleIcon className="h-6 w-6 text-white ml-2" aria-hidden="true" />

                            <p className="ml-3 font-medium text-white truncate">
                                <span className="hidden md:inline">This note will expire in {expiry}.</span>
                            </p>
                        </div>
                        <div className="flex-shrink-0 sm:order-3 sm:ml-2">
                            <button type="button" onClick={handleDismiss} className={`-mr-1 flex p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white ${buttonStyle}`}>
                                <span className="sr-only">Dismiss</span>
                                <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
