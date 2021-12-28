import { Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { PencilAltIcon, MenuIcon, XIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import CopyButton from './CopyButton';
import { useRouter } from 'next/router';

const navigation = [{ name: 'Create', href: '/', current: true }];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

function isCurrent(href) {
    const router = useRouter();
    if (href === '/') {
        return router.asPath === '/';
    }
    return router.asPath.startsWith(href);
}

export default function Navigation({ isNote, pageTitle, children, bgColor, buttonStyle }) {
    return (
        <div className="min-h-full">
            <div className={classNames(isNote ? bgColor : 'bg-gray-800', 'pb-32')}>
                <Disclosure as="nav" className={isNote ? bgColor : 'bg-gray-800'}>
                    {({ open }) => (
                        <div>
                            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                                <div className="border-b border-gray-700">
                                    <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <PencilAltIcon className="text-white w-10 h-10" />
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <Link href={item.href} key={item.name}>
                                                            <a className={classNames(isCurrent(item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'px-3 py-2 rounded-md text-sm font-medium')} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                                                                {item.name}
                                                            </a>
                                                        </Link>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                <span className="sr-only">Open main menu</span>
                                                {open ? <XIcon className="block h-6 w-6" aria-hidden="true" /> : <MenuIcon className="block h-6 w-6" aria-hidden="true" />}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="border-b border-gray-700 md:hidden">
                                <div className="px-2 py-3 space-y-1 sm:px-3">
                                    {navigation.map((item) => (
                                        <Disclosure.Button key={item.name} as="a" href={item.href} className={classNames(isCurrent(item.href) ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block px-3 py-2 rounded-md text-base font-medium')} aria-current={isCurrent(item.href) ? 'page' : undefined}>
                                            {item.name}
                                        </Disclosure.Button>
                                    ))}
                                </div>
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
                <header className="py-10">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2">
                        <h1 className="text-3xl font-bold text-white">
                            {isNote && 'Dear '}
                            {pageTitle}
                        </h1>
                        {isNote && (
                            <div className="ml-auto">
                                <CopyButton buttonStyle={buttonStyle} />
                            </div>
                        )}
                    </div>
                </header>
            </div>

            <main className="-mt-32">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow px-5 py-6 sm:px-6">
                        {children}
                        {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" /> */}
                    </div>
                </div>
            </main>
        </div>
    );
}
