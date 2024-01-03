import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

type IParams = {
   listingId?: string;
};

export async function POST(request: Request, { params }: { params: IParams }) {
   try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
         return NextResponse.error();
      }

      // axios.post(`/api/favourites/${listingId}`);
      const { listingId } = params;

      if (!listingId || typeof listingId !== 'string') {
         throw new Error('Invalid ID');
      }

      let favouriteIds = [...(currentUser.favouriteIds || [])];

      favouriteIds.push(listingId);

      const user = await prisma.user.update({
         where: {
            id: currentUser.id,
         },
         data: {
            favouriteIds,
         },
      });

      return NextResponse.json(user);
   } catch (error: any) {
      throw new Error('Something went wrong');
   }
}

export async function DELETE(
   request: Request,
   { params }: { params: IParams }
) {
   try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
         return NextResponse.error();
      }

      const { listingId } = params;

      let favouriteIds = [...(currentUser.favouriteIds || [])];

      favouriteIds = favouriteIds.filter((id) => id !== listingId);

      const user = await prisma.user.update({
         where: {
            id: currentUser.id,
         },
         data: {
            favouriteIds,
         },
      });

      return NextResponse.json(user);
   } catch (error: any) {
      throw new Error('Something went wrong');
   }
}
