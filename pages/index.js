import Router from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Textarea from '../components/Form/Textarea';
import Expiry from '../components/Form/Expiry';
import Color from '../components/Form/Color';
import MarkdownCheatsheet from '../components/Form/MarkdownCheatsheet';
import { colors } from '../lib/colors';
import { addMinutes, addHours, addDays, formatISO } from 'date-fns';
import { PencilAltIcon } from '@heroicons/react/solid';

const LoadingIcon = () => (
    <svg className="w-5 h-5 mr-3 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const expiry = [
    { displayTime: '10 Minutes', computedTime: () => formatISO(addMinutes(new Date(), 10)) },
    { displayTime: '30 Minutes', computedTime: () => addMinutes(new Date(), 30) },
    { displayTime: '1 Hour', computedTime: () => formatISO(addHours(new Date(), 1)) },
    { displayTime: '1 Day', computedTime: () => formatISO(addDays(new Date(), 1)) },
    { displayTime: '7 Days', computedTime: () => formatISO(addDays(new Date(), 7)) },
    { displayTime: '1 Month', computedTime: () => formatISO(addDays(new Date(), 30)) },
    { displayTime: '1 Year', computedTime: () => formatISO(addDays(new Date(), 365)) },
    { displayTime: 'Never', computedTime: () => null },
];

export default function Home() {
    const [state, setState] = useState({ to: '', from: '', content: '', submitting: false });
    const [expiryTime, setExpiryTime] = useState(expiry[7]);
    const [color, setColor] = useState(Object.keys(colors)[0]);
    const [openCheatsheet, setOpenCheatsheet] = useState(false);

    const handleTextInputChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleMdCsClick = () => {
        setOpenCheatsheet(true);
    };

    const submitData = async (e) => {
        e.preventDefault();

        setState((prevState) => ({ ...prevState, submitting: true }));

        const body = {
            to: state.to,
            from: state.from,
            content: state.content,
            expiry: expiryTime.computedTime(),
            color: color,
        };
        await fetch('/api/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
            .then((response) => response.json())
            .then((response) => {
                Router.push(`/${response.slug}`);
            });
    };

    return (
        <Navigation pageTitle="Create Note">
            <Head>
                <title>Create Note</title>
            </Head>
            <form onSubmit={submitData}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="">
                        {/* TODO: replace with https://tailwindui.com/components/application-ui/forms/input-groups#component-6e671f3ae1aaf020c3dfe26d7aaf7b3d to allow greeting customization */}
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                            To
                        </label>
                        <div className="mt-1">
                            <input onChange={handleTextInputChange} value={state.to} type="text" name="to" id="to" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Recipient" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                            From
                        </label>
                        <div className="mt-1">
                            <input onChange={handleTextInputChange} value={state.from} type="text" name="from" id="from" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="You" required />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Textarea onChange={handleTextInputChange} value={state.content} handleMdCsClick={handleMdCsClick} />
                </div>

                <div className="mt-5">
                    <p className="block text-sm font-medium text-gray-700">Expiry</p>
                    <Expiry onChange={setExpiryTime} value={expiryTime} expiry={expiry} />
                </div>

                <div className="mt-5">
                    <Color onChange={setColor} value={color} />
                </div>

                <button
                    disabled={state.to === '' || state.from === '' || state.content === '' || state.submitting}
                    type="submit"
                    className={`mt-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 w-40 ${state.to === '' || state.from === '' || state.content === '' ? 'cursor-not-allowed' : state.submitting ? 'cursor-progress' : 'cursor-pointer shadow-lg shadow-indigo-500'}`}
                >
                    {state.submitting ? <LoadingIcon /> : <PencilAltIcon className="w-5 h-5 mr-3" />}
                    <span className="ml-auto">{state.submitting ? 'Creating...' : 'Create Note'}</span>
                </button>
            </form>
            <MarkdownCheatsheet open={openCheatsheet} setOpen={setOpenCheatsheet} />
        </Navigation>
    );
}
