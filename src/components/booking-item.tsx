import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';

const BookingItem = () => {
  return (
    <>
      <h2 className='text-xs font-bold uppercase text-gray-400'>
        AGENDAMENTOS
      </h2>

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
    </>
  );
};

export default BookingItem;
