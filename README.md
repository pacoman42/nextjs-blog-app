# Next.js Blog App

This is a simple blog application built using Next.js and TypeScript. The application allows users to list posts retrieved from a database and filter them by the user who created them. It is designed to provide a smooth user experience, even in environments with unstable internet connections.

## Project Structure

The project is organized as follows:

```
nextjs-blog-app
├── prisma
│   ├── schema.prisma      # Defines the database schema using Prisma
│   └── seed.ts            # Script to seed the database with example data
├── public                  # Directory for static files (images, fonts, etc.)
├── src
│   ├── pages
│   │   ├── index.tsx      # Main page of the application
│   │   └── posts.tsx      # Page that lists all posts
│   ├── components
│   │   ├── PostCard.tsx    # Component representing a post card
│   │   └── ConfirmModal.tsx # Modal for confirming post deletion
│   ├── lib
│   │   └── prisma.ts       # Configures and exports Prisma client instance
│   └── styles
│       └── globals.css     # Global styles for the application
├── .env                    # Environment variables (database connection details)
├── assumptions.md          # Assumptions made during development
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
├── next.config.js          # Next.js specific configuration
└── README.md               # Documentation for the project
```

## Features

- List all posts from the database.
- Filter posts by user ID.
- Delete posts with a confirmation modal.
- Error handling for API requests.

## Setup

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nextjs-blog-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up the database:
   - Update the `.env` file with your database connection details.
   - Run the seed script to populate the database:
     ```
     npx ts-node prisma/seed.ts
     ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the application.

## Assumptions

Refer to the `assumptions.md` file for details on the assumptions made during the development of this project. 

## License

This project is licensed under the MIT License.