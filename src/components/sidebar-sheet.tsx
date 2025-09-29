'use client';
import { Button } from './ui/button';
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from 'lucide-react';
import { SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { quickSearchOptions } from './_constants/search';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

import { signOut, useSession } from 'next-auth/react';
import SignInDialog from './sign-in-dialog';

const SidebarSheet = () => {
  const { data } = useSession();

  const handleLogoutLick = async () => {
    await signOut();
  };

  return (
    <SheetContent className='overflow-y-auto'>
      <SheetHeader>
        <SheetTitle className='text-left'>Menu</SheetTitle>
      </SheetHeader>

      {/* Header com usuário ou login */}
      <div className='py-5 flex items-center justify-between border-b border-solid gap-3'>
        {data?.user ? (
          <div className='flex items-center gap-2'>
            <Avatar>
              <AvatarImage src={data?.user?.image ?? ''} />
            </Avatar>

            <div>
              <p className='font-bold'>{data.user.name}</p>
              <p className='text-xs'>{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <h2 className='font-semibold'>Olá, faça seu Login</h2>

            <Dialog>
              <DialogTrigger asChild>
                <Button size='icon'>
                  <LogInIcon />
                </Button>
              </DialogTrigger>
              <DialogContent className='w-[90%]'>
                <SignInDialog />
              </DialogContent>
            </Dialog>
          </>
        )}
      </div>

      {/* Menu principal */}
      <div className='py-5 flex flex-col gap-4 border-b border-solid'>
        <Button
          className='gap-2 justify-start'
          variant='ghost'
          asChild
        >
          <Link href='/'>
            <HomeIcon />
            Início
          </Link>
        </Button>

        <Button
          className='gap-2 justify-start'
          variant='ghost'
          asChild
        >
          <Link href='/bookings'>
            <CalendarIcon />
            Agendamentos
          </Link>
        </Button>
      </div>

      {/* Quick search */}
      <div className='py-5 flex flex-col gap-4 border-b border-solid'>
        {quickSearchOptions.map(option => (
          <Button
            key={option.title}
            className='gap-2 justify-start'
            variant='ghost'
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

      {/* Logout */}
      {data?.user && (
        <div className='py-5 flex flex-col gap-4 border-b border-solid'>
          <Button
            className='justify-start gap-2'
            variant='ghost'
            onClick={handleLogoutLick}
          >
            <LogOutIcon />
            Sair da Conta
          </Button>
        </div>
      )}
    </SheetContent>
  );
};

export default SidebarSheet;
