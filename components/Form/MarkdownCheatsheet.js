import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import ReactMarkdown from 'react-markdown';
import { markdownStyles } from '../../lib/markdownStyles';

const mdRules = [
    { title: 'Headings', syntax: ['# Heading 1', '## Heading 2', '### Heading 3', '#### Heading 4', '##### Heading 5', '###### Heading 6'] },
    { title: 'Bold', syntax: ['**bold**'] },
    { title: 'Italic', syntax: ['*italic*'] },
    { title: 'Links', syntax: ['[text](https://youtu.be/RKlAxt6vP68)'] },
    { title: 'Blockquotes', syntax: ['> blockquote'] },
    { title: 'Code', syntax: ['`code`'] },
    { title: 'Unordered List', syntax: ['- list item 1', '- list item 2', '- list item 3'] },
    { title: 'Ordered List', syntax: ['1. list item 1', '2. list item 2', '3. list item 3'] },
    { title: 'Horizontal Rule', syntax: ['---'] },
];

export default function MarkdownCheatsheet({ open, setOpen }) {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 overflow-hidden" onClose={setOpen}>
                <div className="absolute inset-0 overflow-hidden">
                    <Dialog.Overlay className="absolute inset-0" />

                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
                        <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                            <div className="w-screen max-w-2xl">
                                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                    <div className="px-4 sm:px-6">
                                        <div className="flex items-start">
                                            <div className="h-7 flex items-center">
                                                <button type="button" className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={() => setOpen(false)}>
                                                    <span className="sr-only">Close panel</span>
                                                    <XIcon className="h-6 w-6" aria-hidden="true" />
                                                </button>
                                            </div>
                                            <Dialog.Title className="ml-3 text-lg font-medium text-gray-900">Markdown Cheatsheet</Dialog.Title>
                                        </div>
                                    </div>
                                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                        <div className="flex flex-col">
                                            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                                        <table className="min-w-full divide-y divide-gray-200 table-auto">
                                                            <thead className="bg-gray-50">
                                                                <tr>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Element
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Syntax
                                                                    </th>
                                                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                                        Result
                                                                    </th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {mdRules.map((rule) => (
                                                                    <tr key={rule.title}>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-md font-bold text-gray-700">{rule.title}</td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                            {rule.syntax.map((line) => (
                                                                                <p className="" key={line}>
                                                                                    {line}
                                                                                </p>
                                                                            ))}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                                            {rule.syntax.map((line) => (
                                                                                <ReactMarkdown key={line} components={markdownStyles}>
                                                                                    {line}
                                                                                </ReactMarkdown>
                                                                            ))}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
