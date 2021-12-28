import { RadioGroup } from '@headlessui/react';
import { colors } from '../../lib/colors';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Color({ onChange, value }) {
    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className="block text-sm font-medium text-gray-700">Choose an accent color</RadioGroup.Label>
            <div className="mt-4 grid grid-cols-8 md:grid-cols-16 gap-3 w-fit">
                {Object.keys(colors).map((key) => {
                    const { bgColor, selectedColor } = colors[key];
                    return (
                        <RadioGroup.Option key={key} value={key} name="color" className={({ active, checked }) => classNames(selectedColor, active && checked ? 'ring ring-offset-1' : '', !active && checked ? 'ring-2' : '', '-m-0.5 relative p-0.5 rounded-full h-9 w-9 flex cursor-pointer focus:outline-none')}>
                            <RadioGroup.Label as="p" className="sr-only">
                                {key}
                            </RadioGroup.Label>
                            <span aria-hidden="true" className={classNames(bgColor, 'h-8 w-8 border border-black border-opacity-10 rounded-full')} />
                        </RadioGroup.Option>
                    );
                })}
            </div>
        </RadioGroup>
    );
}
