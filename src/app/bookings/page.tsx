import BookingItem from '@/components/booking-item';
import Header from '@/components/header';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const Booking = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return notFound();
  }

  const confirmeBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });

  const concludeBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
  });

  return (
    <>
      <Header />
      <div className='p-5 space-y-6'>
        <h1 className='text-2xl font-bold'>Agendamentos</h1>

        {/* Confirmados */}
        <section>
          <h2 className='text-xl font-semibold mb-3'>Confirmados</h2>

          {confirmeBookings.length === 0 ? (
            <p className='text-sm text-gray-500'>Não há agendamentos.</p>
          ) : (
            <div className='flex overflow-x-auto gap-3'>
              {confirmeBookings.map(booking => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                />
              ))}
            </div>
          )}
        </section>

        {/* Finalizados */}
        <section>
          <h2 className='text-xl font-semibold mb-3'>Finalizados</h2>
          <div className='space-y-3'>
            {concludeBookings.map(booking => (
              <BookingItem
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Booking;
