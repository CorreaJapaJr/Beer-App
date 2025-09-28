import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
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
        <DialogTitle>Faça seu login</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </DialogDescription>
      </DialogHeader>

      <Button
        variant='outline'
        className='gap-2'
        onClick={handleLoginCLick}
      >
        <AtSign />
        <p>Acesse pelo gmail</p>
      </Button>
    </>
  );
};

export default SignInDialog;
