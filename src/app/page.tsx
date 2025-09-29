import Header from '@/components/header';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import { db } from '@/lib/prisma';

import Image from 'next/image';
import BeerItem from '@/components/beer-item';
import { quickSearchOptions } from '@/components/_constants/search';
import BookingItem from '@/components/booking-item';
import Search from '@/components/search';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershop = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  const confirmeBookings = session?.user
    ? await db.booking.findMany({
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
      })
    : [];

  return (
    <div>
      <Header />
      <div className='p-5'>
        <h2 className='text-xl font-bold'>Olá, Japa</h2>
        <p className='text-xs font-semibold'> Segunda feira, 10 de agosto</p>

        <div className='mt-6 flex items-center gap-2'>
          <Search />
        </div>

        <div className='flex gap-3 mt-6 overflow-auto'>
          {quickSearchOptions.map(option => (
            <Button
              className='gap-2'
              variant={'secondary'}
              key={option.title}
              asChild
            >
              <Link href={`barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={14}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          ))}
        </div>

        <div className='relative mt-6 h-[150px] w-full'>
          <Image
            src='/banner-01.png'
            alt='banner'
            fill
            className='rounded-xl object-cover'
          />
        </div>

        <h2 className='mb-3 mt-4 text-xs font-bold uppercase text-gray-400'>
          AGENDAMENTOS
        </h2>

        {/* AGENDA */}
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

        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400'>
          RECOMENDADOS
        </h2>
        <div className='flex gap-4 overflow-auto'>
          {barbershops.map(barbershop => (
            <BeerItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400'>
          Populares
        </h2>
        <div className='flex gap-4 overflow-auto'>
          {popularBarbershop.map(barbershop => (
            <BeerItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>
      <footer>
        <Card>
          <CardContent className='px-5 py-6'>
            <p className='text-sm text-gray-400'>
              2025 Copyright <span>JAPA </span>
            </p>
          </CardContent>
        </Card>
      </footer>
      :
    </div>
  );
};

export default Home;
