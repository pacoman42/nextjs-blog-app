import { prisma } from '@prisma/prisma';
import axios from 'axios';


type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone?: string;
    website?: string;
    address?: object;
    company?: object;
};

type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

async function main() {
    // Limpia la base de datos antes de insertar
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    // Trae los datos de la API
    const usersResponse = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
    const postsResponse = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');

    const users = usersResponse.data;
    const posts = postsResponse.data;

    // Inserta usuarios
    for (const user of users) {
        await prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                username: user.username,
                email: user.email,
                phone: user.phone,
                website: user.website,
                address: user.address,
                company: user.company,
            },
        });
    }

    // Inserta posts
    for (const post of posts) {
        await prisma.post.create({
            data: {
                id: post.id,
                title: post.title,
                body: post.body,
                userId: post.userId,
            },
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });