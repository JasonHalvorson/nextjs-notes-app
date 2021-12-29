import { Tab } from '@headlessui/react';
import ReactMarkdown from 'react-markdown';
import { QuestionMarkCircleIcon } from '@heroicons/react/solid';
import { markdownStyles } from '../../lib/markdownStyles';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function Textarea({ onChange, value, handleMdCsClick }) {
    return (
        <Tab.Group>
            {({ selectedIndex }) => (
                <div>
                    <Tab.List className="flex items-center">
                        <Tab className={({ selected }) => classNames(selected ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100', 'px-3 py-1.5 border border-transparent text-sm font-medium rounded-md')}>Write</Tab>
                        <Tab className={({ selected }) => classNames(selected ? 'text-gray-900 bg-gray-100 hover:bg-gray-200' : 'text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100', 'ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md')}>Preview</Tab>
                        <button type="button" onClick={handleMdCsClick} className="ml-4 text-sm font-medium bg-indigo-100 p-1 rounded-md">
                            Markdown is supported <QuestionMarkCircleIcon className="inline h-5 w-5" />
                        </button>
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                        <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                            <label htmlFor="content" className="sr-only">
                                Note
                            </label>
                            <div>
                                <textarea onChange={onChange} value={value} rows={5} name="content" id="content" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Write your note..." required />
                            </div>
                        </Tab.Panel>
                        <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                            <div className="border-b">
                                <div className="mx-px mt-px px-3 pt-2 pb-12 text-sm leading-5 text-gray-800">
                                    <ReactMarkdown components={markdownStyles}>{value}</ReactMarkdown>
                                </div>
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </div>
            )}
        </Tab.Group>
    );
}
