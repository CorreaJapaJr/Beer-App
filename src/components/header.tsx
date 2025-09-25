import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { MenuIcon } from 'lucide-react';

const Header = () => {
  return (
    <div>
      <Card>
        <CardContent className='flex flex-row items-center justify-between p-5'>
          <Image
            src='/logo.png'
            alt='logo '
            height={18}
            width={120}
          />
          <Button
            size='icon'
            variant={'outline'}
          >
            <MenuIcon />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Header;
