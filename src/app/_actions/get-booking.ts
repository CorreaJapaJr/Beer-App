'use server';

import { db } from '@/lib/prisma';
import { endOfDay, startOfDay } from 'date-fns';

interface GetBookingsProps {
  serviceId: string;
  date: Date;
}

export const getBookings = async ({ date }: GetBookingsProps) => {
  return await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
};
