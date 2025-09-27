'use client';
import { Barbershop, BarbershopService } from '@prisma/client';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Calendar } from './ui/calendar';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { format, set } from 'date-fns';
import { createBooking } from '@/app/_actions/create-booking';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface ServiceItemProps {
  service: BarbershopService;
  barbershop: Pick<Barbershop, 'name'>;
}

const TIME_LIST = [
  '08:00',

  '09:00',

  '10:00',

  '11:00',

  '12:00',

  '13:00',

  '14:00',

  '15:00',

  '16:00',

  '17:00',

  '18:00',
];

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDay(date);
  };

  const handleTimeSelected = (time: string) => {
    setSelectedTime(time);
  };

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;

      const [hour, minute] = selectedTime.split(':').map(Number);

      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      });

      await createBooking({
        serviceId: service.id,
        userId: 'cmfzsi42b0001qq10tvcchczg',
        date: newDate,
      });
      toast.success('Reserva Criada com Sucess');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar Reserva');
    }
  };

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
            <Sheet>
              <SheetTrigger>
                <Button
                  variant={'secondary'}
                  size='sm'
                >
                  Reservar
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Fazer a Reserva</SheetTitle>
                </SheetHeader>
                <div className='py-5 border-b border-solid'>
                  <Calendar
                    mode='single'
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDateSelect}
                    styles={{
                      head_cell: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      cell: {
                        width: '100%',
                      },
                      button: {
                        width: '100%',
                      },
                      nav_button_previous: {
                        width: '32px',
                        height: '32px',
                      },
                      nav_button_next: {
                        width: '32px',
                        height: '32px',
                      },
                      caption: {
                        textTransform: 'capitalize',
                      },
                    }}
                  />
                </div>
                {selectedDay && (
                  <div className='px-5 flex overflow-x-auto p-5 gap-3 border-b border-solid'>
                    {TIME_LIST.map(time => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        className='rounded-full'
                        onClick={() => handleTimeSelected(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}
                {selectedTime && selectedDay && (
                  <div className='p-5 mt-6 space-y-5 border-b border-solid'>
                    <Card>
                      <CardContent>
                        <div className='flex items-center justify-between gap-2 p-1'>
                          <h2 className='font-bold'>{service.name}</h2>
                          <p className='font-bold text-sm text-primary'>
                            {Intl.NumberFormat('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </p>
                        </div>
                        <div className='flex items-center justify-between p-1'>
                          <h2 className='font-bold text-sm text-gray-400'>
                            Data
                          </h2>
                          <p className='font-bold text-sm text-primary'>
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>
                        <div className='flex items-center justify-between p-1'>
                          <h2 className='font-bold text-sm text-gray-400'>
                            Horário
                          </h2>
                          <p className='font-bold text-sm text-primary'>
                            {selectedTime}
                          </p>
                        </div>
                        <div className='flex items-center justify-between p-1'>
                          <h2 className='font-bold text-sm text-gray-400'>
                            Barbearia
                          </h2>
                          <p className='font-bold text-sm text-primary'>
                            {barbershop.name}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                <SheetFooter className='p-5 mb-2'>
                  <SheetClose asChild>
                    <Button onClick={handleCreateBooking}>Confirmar </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
