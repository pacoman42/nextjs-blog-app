# Next.js Blog App

This is a simple blog application built with Next.js and TypeScript. It allows users to list posts from a database, filter them by user, and delete posts with confirmation. The app is designed for a smooth user experience, even with unstable internet connections.

## Project Structure

```
nextjs-blog-app
├── prisma/
│   ├── migrations/           # Database migrations
│   ├── schema.prisma         # Prisma database schema
│   ├── seed.mts              # Script to seed the database
│   └── dev.db                # SQLite database (local)
├── public/                   # Static files (images, favicon, etc.)
├── src/
│   ├── components/
│   │   ├── ConfirmModal.tsx  # Modal for confirming post deletion
│   │   └── PostCard.tsx      # Post card component
│   ├── pages/
│   │   ├── _app.tsx          # Custom App component
│   │   ├── index.tsx         # Main page
│   │   ├── posts.tsx         # Posts listing page
│   │   └── api/
│   │       ├── posts.ts      # API route for posts
│   │       └── [id].ts       # API route for single post actions
│   └── styles/
│       └── globals.css       # Global styles
├── lib/
│   └── prisma.ts             # Prisma client instance
├── .env                      # Environment variables (DB connection)
├── assumptions.md            # Development assumptions
├── package.json              # npm configuration
├── tsconfig.json             # TypeScript configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
└── README.md                 # Project documentation
```

## Features

- List all posts from the database
- Filter posts by user
- Show users info
- Delete posts with a confirmation modal
- Error handling for API requests

## Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd nextjs-blog-app
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the database:
   - Update the `.env` file with your database connection details.
   - Run the migrations and seed script:
     ```bash
     npx prisma migrate dev
     npx ts-node prisma/seed.mts
     ```
4. **To reseed the database at any time, run:**
   ```bash
   npx tsx prisma/seed.mts
   ```
   - This will drop all tables, recreate, and reseed your SQLite database.

5. Start the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and go to `http://localhost:3000` to view the app.



## License

This project is licensed under the MIT License.