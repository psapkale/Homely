import getCurrentUser from '@/app/actions/getCurrentUser';
import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';

type IParams = {
   reservationId?: string;
};

export async function DELETE(
   request: Request,
   { params }: { params: IParams }
) {
   const currentUser = await getCurrentUser();

   if (!currentUser) {
      return NextResponse.error();
   }

   const { reservationId } = params;

   if (!reservationId || typeof reservationId !== 'string') {
      throw new Error('Invalid ID');
   }

   // Only the creator of the reservation and the people who reserved the reservation are allowed to cancel the reservation
   const reservation = await prisma.reservation.deleteMany({
      where: {
         id: reservationId,
         OR: [
            { userId: currentUser.id },
            { listing: { userId: currentUser.id } },
         ],
      },
   });

   return NextResponse.json(reservation);
}
