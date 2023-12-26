import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   console.log(request);

   const { email, name, password } = await request.json();
   if (
      typeof email !== 'string' &&
      typeof name !== 'string' &&
      typeof password !== 'string'
   ) {
      return NextResponse.json({ status: 404, msg: 'invalid username' });
   }

   const hashedPassword = await bcrypt.hash(password, 10);

   let user = await prisma.user
      .findUnique({
         where: {
            email: email,
         },
      })
      .catch((err) => console.log(err));

   if (user?.id) {
      // user already exists

      return NextResponse.json({
         message: 'User already exists',
         status: 404,
      });
   }

   user = await prisma.user.create({
      data: {
         email,
         name,
         hashedPassword,
      },
   });

   return NextResponse.json({
      message: `Welcome Home, ${user.name}`,
      user,
   });
}
