import prisma from '../lib/prisma';
import Navigation from '../components/Navigation/Navigation';

export const getServerSideProps = async ({ params }) => {
    const note = await prisma.note.findUnique({
        where: {
            slug: params.slug,
        },
        select: {
            to: true,
            from: true,
            content: true,
        },
    });
    return {
        props: note,
    };
};

export default function Slug({ to, from, content }) {
    return (
        <Navigation pageTitle={to} isNote>
            <div>
                <p>{content}</p>
                <h2 className="text-right text-2xl">Love, {from}</h2>
            </div>
        </Navigation>
    );
}
