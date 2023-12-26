import { Listing, Reservation, User } from '@prisma/client';

// Excluding the date objects because next client doesn't support them

export type SafeListing = Omit<Listing, 'createdAt'> & { createdAt: string };

export type SafeReservation = Omit<
   Reservation,
   'createdAt' | 'startDate' | 'endDate' | 'listing'
> & {
   createdAt: string;
   startDate: string;
   endDate: string;
   listing: SafeListing;
};

export type SafeUser = Omit<
   User,
   'emailVerified' | 'createdAt' | 'updatedAt'
> & {
   emailVerified: string | null;
   createdAt: string;
   updatedAt: string;
};
