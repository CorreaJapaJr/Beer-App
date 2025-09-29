import Header from '@/components/header';

import { Button } from '@/components/ui/button';

import { db } from '@/lib/prisma';

import Image from 'next/image';
import BeerItem from '@/components/beer-item';
import { quickSearchOptions } from '@/components/_constants/search';
import BookingItem from '@/components/booking-item';
import Search from '@/components/search';
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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

      <div className='p-5 space-y-6'>
        {/* Saudação */}
        <div>
          <h2 className='text-xl font-bold'>
            Olá, {session?.user ? session.user.name : 'Bem-vindo'}
          </h2>
          <p className='text-xs font-semibold text-gray-500'>
            {format(new Date(), "EEEE, dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        {/* Busca */}
        <div className='flex items-center gap-2'>
          <Search />
        </div>

        {/* Opções rápidas */}
        <div className='flex gap-3 overflow-x-auto'>
          {quickSearchOptions.map(option => (
            <Button
              key={option.title}
              variant='secondary'
              className='gap-2 whitespace-nowrap'
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
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

        {/* Banner */}
        <div className='relative h-[150px] w-full'>
          <Image
            src='/banner-01.png'
            alt='Banner'
            fill
            className='rounded-xl object-cover'
          />
        </div>

        {/* Agendamentos */}
        <section>
          <h2 className='mb-3 text-sm font-bold uppercase text-gray-400'>
            Agendamentos
          </h2>

          {confirmeBookings.length === 0 ? (
            <p className='text-sm text-gray-500'>Não há agendamentos.</p>
          ) : (
            <div className='flex gap-3 overflow-x-auto'>
              {confirmeBookings.map(booking => (
                <BookingItem
                  key={booking.id}
                  booking={booking}
                />
              ))}
            </div>
          )}
        </section>

        {/* Recomendados */}
        <section>
          <h2 className='mb-3 text-xs font-bold uppercase text-gray-400'>
            Recomendados
          </h2>
          <div className='flex gap-4 overflow-x-auto'>
            {barbershops.map(barbershop => (
              <BeerItem
                key={barbershop.id}
                barbershop={barbershop}
              />
            ))}
          </div>
        </section>

        {/* Populares */}
        <section>
          <h2 className='mb-3 text-xs font-bold uppercase text-gray-400'>
            Populares
          </h2>
          <div className='flex gap-4 overflow-x-auto'>
            {popularBarbershop.map(barbershop => (
              <BeerItem
                key={barbershop.id}
                barbershop={barbershop}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
