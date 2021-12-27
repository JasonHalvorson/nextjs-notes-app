import prisma from '../../lib/prisma';
import randomstring from 'randomstring';

export default async function createNote(req, res) {
    const { to, from, content, expiry } = req.body;

    const slug = randomstring.generate(16);

    try {
        const result = await prisma.note.create({
            data: {
                to,
                from,
                content,
                slug,
                expiry,
            },
        });
        res.status(201).json({ slug });
    } catch (error) {
        res.status(500).json({ error: 'Error creating note' });
    }
}
