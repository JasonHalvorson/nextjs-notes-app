# Nextjs-Notes-App

An app to write shareable notes to others.

Built using [Next.js](https://nextjs.org/), [TailwindCSS](https://tailwindcss.com/), and [Prisma](https://www.prisma.io/).

Notes are stored in a [PostgreSQL](https://www.postgresql.org/) database.

### [View Live Demo](https://notes.jasonhalvorson.ca)

## Deploy your own with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJasonHalvorson%2Fnextjs-notes-app&env=DATABASE_URL&envDescription=The%20URL%20to%20the%20PostgreSQL%20database.)

## Or clone the repository locally:

### Prerequisites

This project was made with [Node.js](https://nodejs.org) version 16.13.0.

### Setup

Download the code by either cloning this repository using git:

```
git clone https://github.com/JasonHalvorson/nextjs-notes-app.git
```

... or [download a zip of the source code](https://github.com/JasonHalvorson/nextjs-notes-app/archive/refs/heads/master.zip).

Once downloaded, open a terminal window in the project directory, and install dependencies with:

```
npm install
```

Then, copy .env.example to .env:

```
cp .env.example .env
```

Edit the .env file, replacing the placeholder value with the url to your database.

Finally, start the development server:

```
npm run dev
```

And view it in your browser at `http://localhost:3000`.
