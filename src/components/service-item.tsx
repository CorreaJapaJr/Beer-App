'use client';
import { Barbershop, BarbershopService, Booking } from '@prisma/client';
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
} from './ui/sheet';
import { Calendar } from './ui/calendar';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { format, set } from 'date-fns';
import { createBooking } from '@/app/_actions/create-booking';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { getBookings } from '@/app/_actions/get-booking';

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

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter(time => {
    const hour = Number(time.split(':')[0]);
    const minutes = Number(time.split(':')[1]);

    const hasBookingOnCurrentTime = bookings.some(
      booking =>
        booking.date.getHours() === hour &&
        booking.date.getMinutes() === minutes
    );
    if (hasBookingOnCurrentTime) {
      return false;
    }
    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined
  );

  const [dayBooking, setDayBooking] = useState<Booking[]>([]);
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;
      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });
      setDayBooking(bookings);
    };
    fetch();
  }, [selectedDay, service.id]);

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBooking([]);
    setBookingSheetIsOpen(false);
  };

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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (data?.user as any).id,
        date: newDate,
      });
      handleBookingSheetOpenChange();

      toast.success('Reserva Criada com Sucesso');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao criar Reserva');
    } finally {
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
            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}
            >
              <Button
                onClick={() => setBookingSheetIsOpen(true)}
                variant='secondary'
                size='sm'
              >
                Reservar
              </Button>

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
                    {getTimeList(dayBooking).map(time => (
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
                <SheetFooter className='px-5 mt-5'>
                  <SheetClose asChild>
                    <Button
                      onClick={handleCreateBooking}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
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
