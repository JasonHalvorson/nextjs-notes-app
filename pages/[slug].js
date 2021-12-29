import prisma from '../lib/prisma';
import Navigation from '../components/Navigation/Navigation';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { colors } from '../lib/colors';
import ReactMarkdown from 'react-markdown';
import { markdownStyles } from '../lib/markdownStyles';
import Head from 'next/head';

export const getServerSideProps = async ({ params }) => {
    try {
        const { to, from, content, expiry, color } = await prisma.note.findUnique({
            where: {
                slug: params.slug,
            },
            select: {
                to: true,
                from: true,
                content: true,
                expiry: true,
                color: true,
            },
        });
        if (expiry && new Date(expiry) < new Date()) {
            return { props: { error: ['Note has expired.', `This note expired ${formatDistanceToNow(new Date(expiry))} ago.`] } };
        }
        return {
            props: { to, from, content, color },
        };
    } catch (TypeError) {
        return { props: { error: ['Note not found.', 'No note exists at this location.'] } };
    }
};

export default function Slug({ to, from, content, error, color }) {
    if (!to || !from || !content || error) {
        return (
            <Navigation pageTitle="Error">
                <Head>
                    <title>Error</title>
                </Head>
                <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 mt-5">
                    <div className="py-16">
                        <div className="text-center">
                            <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">{error[0]}</h1>
                            <p className="mt-2 text-base text-gray-500">{error[1]}</p>
                            <div className="mt-6">
                                <Link href="/">
                                    <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                                        Create a new Note<span aria-hidden="true"> &rarr;</span>
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>
            </Navigation>
        );
    }

    return (
        <Navigation pageTitle={to} isNote bgColor={colors[color].bgColor} buttonStyle={colors[color].buttonStyle}>
            <Head>
                <title>Note to {to}</title>
            </Head>
            <div>
                <ReactMarkdown components={markdownStyles}>{content}</ReactMarkdown>
                <h2 className="text-right text-2xl">Love, {from}</h2>
            </div>
        </Navigation>
    );
}
