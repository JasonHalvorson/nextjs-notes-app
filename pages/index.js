import Router from 'next/router';
import Navigation from '../components/Navigation/Navigation';
import Textarea from '../components/Form/Textarea';
import Expiry from '../components/Form/Expiry';
// import Color from '../components/Form/Color';
import { useState } from 'react';
import { addMinutes, addHours, addDays, formatISO } from 'date-fns';

// const colors = [
//     { name: 'Pink', bgColor: 'bg-pink-500', selectedColor: 'ring-pink-500' },
//     { name: 'Purple', bgColor: 'bg-purple-500', selectedColor: 'ring-purple-500' },
//     { name: 'Blue', bgColor: 'bg-blue-500', selectedColor: 'ring-blue-500' },
//     { name: 'Green', bgColor: 'bg-green-500', selectedColor: 'ring-green-500' },
//     { name: 'Yellow', bgColor: 'bg-yellow-500', selectedColor: 'ring-yellow-500' },
// ];

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
    const [state, setState] = useState({ to: '', from: '', content: '' /*color: colors[1] */ });
    const [expiryTime, setExpiryTime] = useState(expiry[7]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitData = async (e) => {
        e.preventDefault();

        const body = {
            to: state.to,
            from: state.from,
            content: state.content,
            expiry: expiryTime.computedTime(),
        };
        await fetch('/api/createNote', {
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
            <form onSubmit={submitData}>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div className="">
                        {/* TODO: replace with https://tailwindui.com/components/application-ui/forms/input-groups#component-6e671f3ae1aaf020c3dfe26d7aaf7b3d to allow greeting customization */}
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700">
                            To
                        </label>
                        <div className="mt-1">
                            <input onChange={handleChange} value={state.to} type="text" name="to" id="to" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Recipient" required />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="from" className="block text-sm font-medium text-gray-700">
                            From
                        </label>
                        <div className="mt-1">
                            <input onChange={handleChange} value={state.from} type="text" name="from" id="from" className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="You" required />
                        </div>
                    </div>
                </div>

                <div className="mt-5">
                    <Textarea onChange={handleChange} value={state.content} />
                </div>

                <div className="mt-5">
                    <Expiry onChange={setExpiryTime} value={expiryTime} expiry={expiry} />
                </div>

                <div className="mt-5">
                    {/* TODO: add colors */}
                    {/* <Color onChange={handleChange} value={state.color} colors={colors} /> */}
                </div>

                <button disabled={state.to === '' || state.from === '' || state.content === ''} type="submit" className="mt-10 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                    Create Note
                </button>
            </form>
        </Navigation>
    );
}
