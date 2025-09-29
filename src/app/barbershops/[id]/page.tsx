import Image from 'next/image';
import { db } from './../../../lib/prisma';
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ServiceItem from '@/components/service-item';
import PhoneItem from '@/components/phone-item';

import SidebarSheet from '@/components/sidebar-sheet';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';

interface BarbershopPageProps {
  params: {
    id: string;
  };
}

const BarbershopPage = async ({ params }: BarbershopPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <div className='relative w-full h-[250px]'>
        <Image
          src={barbershop?.imageUrl}
          fill
          className='object-cover'
          alt={barbershop.name}
        />

        <Button
          size='icon'
          variant={'secondary'}
          className='absolute top-4 left-4'
          asChild
        >
          <Link href='/'>
            <ChevronLeftIcon />
          </Link>
        </Button>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              size='icon'
              variant={'outline'}
              className='absolute right-4 top-4'
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>
      <div className='p-5 border-b border-solid'>
        <h1 className='font-bold text-xl mb-3 '>{barbershop?.name}</h1>
        <div className='flex items-center gap-2 mb-2'>
          <MapPinIcon className='text-primary' />
          <p className='text-sm'>{barbershop?.address}</p>
        </div>
        <div className='flex items-center gap-2'>
          <StarIcon className='text-primary' />
          <p className='text-sm'>5,0 (200 avaliações)</p>
        </div>
      </div>

      <div className='p-5 border-b border-solid'>
        <h2 className='uppercase text-xs font-bold text-gray-400'>Sobre nós</h2>
        <p className='text-sm text-justify'>{barbershop?.description}</p>
      </div>

      <div className='p-5 border-b border-solid'>
        <h2 className='uppercase text-xs font-bold text-gray-400 mb-3'>
          Serviços
        </h2>
        <div className='space-y-3'>
          {barbershop.services.map(service => (
            <ServiceItem
              key={service.id}
              service={JSON.parse(JSON.stringify(service))}
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          ))}
        </div>
      </div>

      <div className='p-5 space-y-3'>
        {barbershop.phones.map((phone, index) => (
          <PhoneItem
            key={`${phone}-${index}`}
            phone={phone}
          />
        ))}
      </div>
    </div>
  );
};

export default BarbershopPage;
