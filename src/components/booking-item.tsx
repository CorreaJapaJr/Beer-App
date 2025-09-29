'use client';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Prisma } from '@prisma/client';
import { format, isFuture } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import Image from 'next/image';
import PhoneItem from './phone-item';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { deleteBooking } from '@/app/_actions/delete-booking';
import { toast } from 'sonner';
import { useState } from 'react';

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    service: { barbershop },
  } = booking;
  const isConfirmed = isFuture(booking.date);
  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);
      toast.success('Reserva cancelada com sucesso!');
    } catch (error) {
      console.error(error);
      toast.error('Erro ao cancelar, tente novamente');
    }
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };
  return (
    <>
      <Sheet
        open={isSheetOpen}
        onOpenChange={handleSheetOpenChange}
      >
        <SheetTrigger className='w-full min-w-[90%] min-h-[90%]'>
          <Card className='min-w-[90%] min-h-[90%] mt-6'>
            <CardContent className='flex justify-between p-0'>
              <div className='flx flex-col gap-2 p-5 pl-5'>
                <Badge
                  className='w-fit'
                  variant={isConfirmed ? 'default' : 'secondary'}
                >
                  {isConfirmed ? 'Confirmado' : 'Finalizado'}
                </Badge>
                <h3 className='font-semibold text-xl'>
                  {booking?.service.name}
                </h3>

                <div className='flex items-center gap-2 mt-2'>
                  <Avatar className='h-6 w-6'>
                    <AvatarImage src={booking?.service.barbershop.imageUrl} />
                  </Avatar>
                  <h3 className='font-semibold text-xs'>
                    {booking?.service.barbershop.name}
                  </h3>
                </div>
              </div>

              <div className='flex flex-col items-center justify-center border-l-2 border-solid px-5'>
                <p className='text-sm capitalize'>
                  {format(booking.date, 'MMMM', { locale: ptBR })}
                </p>
                <p className='text-2xl'>
                  {format(booking.date, 'dd', { locale: ptBR })}
                </p>
                <p className='text-sm'>
                  {format(booking.date, 'HH:mm', { locale: ptBR })}
                </p>
              </div>
            </CardContent>
          </Card>
        </SheetTrigger>
        <SheetContent className='W-[90%]'>
          <SheetHeader>
            <SheetTitle className='text-left'>
              Informações da Reserva
            </SheetTitle>
          </SheetHeader>
          <div className='relative h-[180px] w-full items-center flex mt-6 rounded-xl'>
            <Image
              src='/map.png'
              alt={`map barberia ${booking.service.barbershop.name}`}
              fill
              className='object-cover rounded-xl'
            />
            <Card className='z-50 mx-5 mb-3 w-full'>
              <CardContent className='w-full px-5 py-3 gap-3'>
                <Avatar>
                  <AvatarImage src={barbershop.imageUrl} />
                </Avatar>
                <div>
                  <h3>{barbershop.name}</h3>
                  <p>{barbershop.address}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='mt-6'>
            <Badge
              className='w-fit'
              variant={isConfirmed ? 'default' : 'secondary'}
            >
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>
            <Card className='mt-3 mb-6'>
              <CardContent>
                <div className='flex items-center justify-between gap-2 p-1'>
                  <h2 className='font-bold'>{booking.service.name}</h2>
                  <p className='font-bold text-sm text-primary'>
                    {Intl.NumberFormat('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(Number(booking.service.price))}
                  </p>
                </div>
                <div className='flex items-center justify-between p-1'>
                  <h2 className='font-bold text-sm text-gray-400'>Data</h2>
                  <p className='font-bold text-sm text-primary'>
                    {format(booking.date, "d 'de' MMMM", {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <div className='flex items-center justify-between p-1'>
                  <h2 className='font-bold text-sm text-gray-400'>Horário</h2>
                  <p className='font-bold text-sm text-primary'>
                    {format(booking.date, 'HH:mm', {
                      locale: ptBR,
                    })}
                  </p>
                </div>
                <div className='flex items-center justify-between p-1'>
                  <h2 className='font-bold text-sm text-gray-400'>Barbearia</h2>
                  <p className='font-bold text-sm text-primary'>
                    {barbershop.name}
                  </p>
                </div>
              </CardContent>
            </Card>
            <div className='p-5 space-y-3'>
              {barbershop.phones.map((phone, index) => (
                <PhoneItem
                  key={`${phone}-${index}`}
                  phone={phone}
                />
              ))}
            </div>
          </div>
          <SheetFooter className='mt-6'>
            <div className='flex items-center gap-3'>
              <SheetClose asChild>
                <Button
                  variant='outline'
                  className='w-full'
                >
                  Voltar
                </Button>
              </SheetClose>
              {isConfirmed && (
                <AlertDialog>
                  <AlertDialogTrigger>
                    <Button
                      variant='destructive'
                      className='w-full'
                    >
                      Cancelar reserva
                    </Button>
                  </AlertDialogTrigger>

                  <AlertDialogContent className='w-[90%]'>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Você quer cancelar a reserva?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que quer cancelar?? é irreversivel
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className=''>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancelBooking}>
                        Confirmar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default BookingItem;
