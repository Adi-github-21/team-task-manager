import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();
    async function main() {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = await prisma.user.upsert({
        where: { email: 'admin@test.com' },  
        update: {},      
        create: {
          name: 'Admin User',      
          email: 'admin@test.com',     
          password: hashedPassword,               
          role: 'ADMIN',     
        }, 
      });
      console.log('Success! Admin user created:', user.email);
    }
    main()
      .catch((e) => console.error(e))
      .finally(async () => await prisma.$disconnect());