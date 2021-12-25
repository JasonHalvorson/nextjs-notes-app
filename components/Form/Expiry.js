import { RadioGroup } from '@headlessui/react';

export default function Expiry() {
    return (
        <RadioGroup value={expiryTime} onChange={setExpiryTime} className="mt-2">
            <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {expiry.map((option) => (
                    <RadioGroup.Option key={option.time} value={option} className={({ active, checked }) => classNames(active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'cursor-pointer focus:outline-none bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1')}>
                        <RadioGroup.Label as="p">{option.time}</RadioGroup.Label>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
