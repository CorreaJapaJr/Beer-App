import { DialogTitle } from '@radix-ui/react-dialog';
import { DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { AtSign } from 'lucide-react';
import { signIn } from 'next-auth/react';

const SignInDialog = () => {
  const handleLoginCLick = async () => {
    await signIn('google');
  };
  return (
    <>
      <DialogHeader>
        <DialogTitle>Olá, Faça seu login... </DialogTitle>
      </DialogHeader>

      <Button
        variant='outline'
        className='gap-2'
        onClick={handleLoginCLick}
      >
        <AtSign />
        <p>Google</p>
      </Button>
    </>
  );
};

export default SignInDialog;
