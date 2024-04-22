import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function seedDatabase() {
    try {

        const passwordTeste = await bcrypt.hash('123456', 7);
        const passwordTeste2 = await bcrypt.hash('123456', 7);

        const user = await prisma.user.create({
            data: {
                email: 'teste@email.com',
                name: 'Teste',
                password: passwordTeste,
                address: 'Rua teste, 123',
                phone: '123456789',
                picture: 'https://www.google.com.br',
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        })

        const user2 = await prisma.user.create({
            data: {
                email: 'teste2@email.com',
                name: 'Teste2',
                password: passwordTeste2,
                address: 'Rua teste, 123',
                phone: '123456789',
                picture: 'https://www.google.com.br',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })
        
        const product = await prisma.product.create({
            data: {
                name: 'Produto 1',
                description: 'Descrição do produto 1',
                price: 100,
                stock: 10,
                picture: 'https://www.google.com.br',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })

        const product2 = await prisma.product.create({
            data: {
                name: 'Produto 2',
                description: 'Descrição do produto 2',
                price: 200,
                stock: 20,
                picture: 'https://www.google.com.br',
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        })


        console.log('User created:', user, user2, product, product2);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seedDatabase();
