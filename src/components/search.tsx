'use client';

import { Button } from './ui/button';
import { Input } from './ui/input';

import { useRouter } from 'next/navigation';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form';
import { SearchIcon } from 'lucide-react';

const formSchema = z.object({
  title: z.string().trim().min(1, {
    message: 'Digite algo pra buscar....',
  }),
});

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });
  const router = useRouter();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    console.log('enviou', data);
    router.push(`/barbershops?search=${data.title}`);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex w-full gap-2'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormControl>
                <Input
                  placeholder='Faça sua Busca'
                  {...field}
                  className='w-full'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>
          <SearchIcon />
        </Button>
      </form>
    </Form>
  );
};

export default Search;
