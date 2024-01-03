import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';
import CustomErrorHandler from '@/app/components/CustomErrorHandler';

export default async function getFavouriteListings() {
   try {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
         return [];
      }

      const favourites = await prisma.listing.findMany({
         where: {
            id: {
               in: [...(currentUser.favouriteIds || [])],
            },
         },
      });

      const safeFavourites = favourites.map((favourite) => ({
         ...favourite,
         createdAt: favourite.createdAt.toISOString(),
      }));

      return safeFavourites;
   } catch (error: any) {
      throw new Error('Something went wrong');
   }
}
