import BeerItem from '@/components/beer-item';
import Header from '@/components/header';
import Search from '@/components/search';
import { db } from '@/lib/prisma';

interface BarbershopsPagesProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopPage = async ({ searchParams }: BarbershopsPagesProps) => {
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: searchParams?.search,
        mode: 'insensitive',
      },
    },
  });
  return (
    <div className=''>
      <Header />
      <div className='my-6 px-5'>
        <Search />
      </div>
      <div className='px-5'>
        <h2 className='mb-3 mt-6 text-xs font-bold uppercase text-gray-400'>
          Resultados para &quot;{searchParams.search}&quot;
        </h2>
        <div className='grid grid-cols-2 gap-4'>
          {barbershops.map(barbershop => (
            <BeerItem
              key={barbershop.id}
              barbershop={barbershop}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopPage;
