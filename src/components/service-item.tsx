import { BarbershopService } from '@prisma/client';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

interface ServiceItemProps {
  service: BarbershopService;
}

const ServiceItem = ({ service }: ServiceItemProps) => {
  return (
    <Card>
      <CardContent className='flex item-center gap-3 p-3'>
        <div className='relative max-h-[110px] max-w-[110px] min-w-[110px] min-h-[110px]'>
          <Image
            src={service.imageUrl}
            alt={service.name}
            fill
            className='object-cover rounded-xl'
          />
        </div>
        <div className='space-y-2'>
          <h3 className='font-semibold text-sm'>{service.name}</h3>
          <p className='text-sm text-gray-400'>{service.description}</p>

          <div className='flex items-center justify-between'>
            <p className='font-bold text-sm text-primary'>
              {Intl.NumberFormat('pt-br', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </p>

            <Button variant={'secondary'}>Reservar</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
