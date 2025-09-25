import { Button } from './ui/button';
import { CalendarIcon, HomeIcon, LogOutIcon } from 'lucide-react';
import { SheetContent, SheetHeader, SheetTitle } from './ui/sheet';
import { quickSearchOptions } from './_constants/search';
import { Avatar } from './ui/avatar';
import { AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import Image from 'next/image';
const SidebarSheet = () => {
  return (
    <SheetContent className='overflow-y-auto'>
      <SheetHeader>
        <SheetTitle className='text-left'>Menu</SheetTitle>
      </SheetHeader>

      <div className='py-5 flex items-center border-b border-solid gap-3'>
        <Avatar>
          <AvatarImage src='https://images.unsplash.com/photo-1740252117070-7aa2955b25f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGF2YXRhcmVzfGVufDB8fDB8fHww' />
        </Avatar>
        <div>
          <p className='font-semibold'>Reginaldo da Rosa</p>
          <p className='text-xs font-semibold text-gray-400'>
            reginaldo@gmail.com
          </p>
        </div>
      </div>

      <div className='py-5 flex flex-col gap-4 border-b border-solid'>
        <Button
          className='gap-2 justify-start'
          variant={'ghost'}
          asChild
        >
          <Link href='/'>
            <HomeIcon />
            Início
          </Link>
        </Button>

        <Button
          className='gap-2 justify-start'
          variant={'ghost'}
        >
          <CalendarIcon />
          Agendamentos
        </Button>
      </div>

      <div className='py-5 flex flex-col gap-4 border-b border-solid'>
        {quickSearchOptions.map(option => (
          <Button
            className='gap-2 justify-start'
            variant={'ghost'}
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
      <div className='py-5 flex flex-col gap-4 border-b border-solid'>
        <Button
          className='justify-start gap-2'
          variant='ghost'
        >
          <LogOutIcon />
          Sair da Conta
        </Button>
      </div>
    </SheetContent>
  );
};

export default SidebarSheet;
