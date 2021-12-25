import { RadioGroup } from '@headlessui/react';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

// TODO: Add color functionality (pass state up?)
export default function Color({ onChange, value, colors }) {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className="block text-sm font-medium text-gray-700">Choose an accent color</RadioGroup.Label>
            <div className="mt-4 flex items-center space-x-3">
                {colors.map((color) => (
                    <RadioGroup.Option key={color.name} value={color} name="color" className={({ active, checked }) => classNames(color.selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', '-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none')}>
                        <RadioGroup.Label as="p" className="sr-only">
                            {color.name}
                        </RadioGroup.Label>
                        <span aria-hidden="true" className={classNames(color.bgColor, 'h-8 w-8 border border-black border-opacity-10 rounded-full')} />
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
