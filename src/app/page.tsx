import Header from '@/components/header';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { db } from '@/lib/prisma';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';
import BeerItem from '@/components/beer-item';
import { quickSearchOptions } from '@/components/_constants/search';
import BookingItem from '@/components/booking-item';

const Home = async () => {
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershop = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  return (
    <div>
      <Header />
      <div className='p-5'>
        <h2 className='text-xl font-bold'>Olá, Japa</h2>
        <p className='text-xs font-semibold'> Segunda feira, 10 de agosto</p>

        <div className='mt-6 flex items-center gap-2'>
          <Input placeholder='Faça sua busca....' />
          <Button
            size='icon'
            variant={'outline'}
          >
            <SearchIcon />
          </Button>
        </div>

        <div className='flex gap-3 mt-6 overflow-auto'>
          {quickSearchOptions.map(option => (
            <Button
              className='gap-2'
              variant={'secondary'}
              key={option.title}
            >
              <Image
                src={option.imageUrl}
                width={14}
                height={16}
                alt={option.title}
              />
              {option.title}
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

        {/* AGENDA   */}
        <BookingItem />

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
