import '../styles/globals.css';
import useAckee from 'use-ackee';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
    const { pathname } = useRouter();

    useAckee(pathname, {
        server: 'https://ackee.dev.jasonhalvorson.ca',
        domainId: '32b42107-f5f7-4620-a55c-1fd43e8b10e3',
    });

    return <Component {...pageProps} />;
}

export default MyApp;
