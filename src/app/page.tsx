import Header from '@/components/header';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SearchIcon } from 'lucide-react';
import Image from 'next/image';

const Home = () => {
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

        <div className='relative mt-6 h-[150px] w-full'>
          <Image
            src='/banner-01.png'
            alt='banner'
            fill
            className='rounded-xl object-cover'
          />
        </div>

        {/* AGENDA   */}
        <Card className='mt-6'>
          <CardContent className='flex justify-between p-0'>
            <div className='flx flex-col gap-2 py-5 pl-5'>
              <Badge>Confirmado</Badge>
              <h3 className='font-semibold text-2xl'>Corte de Cabelo</h3>

              <div className='flex items-center gap-2 mt-2'>
                <Avatar className='h-6 w-6'>
                  <AvatarImage src='https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png' />
                </Avatar>
                <p className='text-sm'>Beer App</p>
              </div>
            </div>

            <div className='flex flex-col items-center justify-center border-l-2 border-solid px-5'>
              <p className='text-sm'>Agosto</p>
              <p className='text-sm'>05</p>
              <p className='text-sm'>Agosto</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;
