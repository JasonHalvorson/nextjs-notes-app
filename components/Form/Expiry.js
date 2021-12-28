import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Expiry({ expiry, value, onChange }) {
    return (
        <RadioGroup value={value} onChange={onChange} className="mt-2">
            <RadioGroup.Label className="sr-only">Choose a memory option</RadioGroup.Label>
            <div className="grid sm:grid-cols-4 gap-3 lg:grid-cols-8">
                {expiry.map((option) => (
                    <RadioGroup.Option key={option.displayTime} value={option} className={({ active, checked }) => classNames(active ? 'ring-2 ring-offset-2 ring-indigo-500' : '', checked ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700' : 'cursor-pointer focus:outline-none bg-white border-gray-200 text-gray-900 hover:bg-gray-50', 'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium sm:flex-1')}>
                        <RadioGroup.Label as="p">{option.displayTime}</RadioGroup.Label>
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
