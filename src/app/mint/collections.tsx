import Link from 'next/link';

interface Contract {
    id: string;
    name: string;
  }
  
  interface ContractLinkProps {
    contract: Contract;
  }
  
  interface ContractsListProps {
    contracts: Contract[];
  }

  const ContractLink: React.FC<ContractLinkProps> = ({ contract }) => (
    <Link href={`/mint/${contract.id}`}>
      {contract.name}
    </Link>
  );

const products = [
    {
      id: 1,
      name: 'Tubbystation',
      color: 'Natural',
      price: '$75',
      href: <ContractLink contract={{id: "0x8Dddc7710A40e138d0b6b637e84114494280d69f", name: "tubbystation"}}/>,
      imageSrc: 'tubbystation.png',
      imageAlt: 'Hand stitched, orange leather long wallet.',
    },
    {
        id:2,
        name: 'M-CULT',
        color: 'Non-Natural',
        price: '$80',
        href: '#',
        imageSrc: 'images/macci.jpg',
        imageAlt: 'SHFHSLKFJS'
    }
    // More products...
  ];



  
  export default function CollectionsDisplay() {
    return (
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Live Mints</h2>
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700">
                  {/* <a href={product.href}>
                    <span className="absolute inset-0" />
                    {product.name}
                  </a> */}
                  {product.href}
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>
              </div>
            ))}
          </div>
  
          <div className="mt-8 text-sm md:hidden">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Shop the collection
              <span aria-hidden="true"> &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    )
  }
