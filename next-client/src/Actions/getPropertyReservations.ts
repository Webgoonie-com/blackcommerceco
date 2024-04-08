import orm from "@/lib/orm";
import { Listing } from "@/Types";



interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  imageSrc?: string;
}

interface PropertyReservation {
  id: number;
  uuid: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date,
  userId: number,
  listingId: number,
  listing?: Listing | null;
  propertyId: number,
}

export default async function getPropertyReservations(
  params: IParams
) {
  try {
    const { listingId, userId, authorId } = params;

    const query: any = {};
        
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }

    const reservations = await orm.reservationproperty.findMany({
      where: query,
      // include: {
      //   listing: true
      // } as { listing: true },
      select: {
            id: true,
            uuid: true,
            
            startDate: true,
            endDate: true,
            totalPrice: true,
            createdAt: true,
            updatedAt: true,
            userId: true,
            listingId: true,
            propertyId: true,
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    const safeReservations = reservations.map(
      (reservation) => ({
      ...reservation,
      createdAt: reservation.createdAt.toISOString(),
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
      property: {
        ...reservation,
        
      },
    }));

    return safeReservations;

  } catch (error: any) {
    throw new Error(error);
  }
}